<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use App\Models\Pays;
use App\Models\Types;
use DOMDocument;
use stdClass;

class SAQController extends Controller
{
    const DUPLICATION = 'duplication';
    const ERREURDB = 'erreurdb';
    const INSERE = 'Nouvelle bouteille insérée';

    private static $_webpage;
    private static $_status;

    public function importProducts()
    {
        $page = 1;
        $nombreProduit = 48; //48 ou 96

        for ($i = 0; $i < 5; $i++)
        {
            $nombre = $this->getProduits($nombreProduit, $page + $i);
        }

        return redirect()->back();
    }

    public function getProduits($nombre = 24, $page = 1)
    {
        $s = curl_init();
        $url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=" . $page . "&product_list_limit=" . $nombre . "&product_list_order=name_asc";

        curl_setopt_array($s, array(
            CURLOPT_URL => $url,
            //CURLOPT_CUSTOMREQUEST => 'GET', // Fixed syntax error
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYHOST => false, // Added to disable SSL host verification
            CURLOPT_SSL_VERIFYPEER => false, // Added to disable SSL
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_POST => false, // Changed to false for a GET request
            CURLOPT_ENCODING => 'gzip, deflate',
            CURLOPT_HTTPHEADER => array(
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,* /*;q=0.8',
                'Accept-Language: en-US,en;q=0.5',
                'Accept-Encoding: gzip, deflate',
                'Connection: keep-alive',
                'Upgrade-Insecure-Requests: 1',
            ),
            CURLOPT_FOLLOWLOCATION => true, // Added option to follow redirects
        ));

        self::$_webpage = curl_exec($s);
        self::$_status = curl_getinfo($s, CURLINFO_HTTP_CODE);

        $doc = new DOMDocument();
        $doc -> recover = true;
        $doc -> strictErrorChecking = false;
        @$doc -> loadHTML(self::$_webpage);
        $elements = $doc -> getElementsByTagName("li");
        $i = 0;
        foreach ($elements as $key => $noeud) {
            if (str_contains($noeud->getAttribute('class'), "product-item")) {
                $info = self::recupereInfo($noeud);
                $retour = $this -> ajouteProduit($info);
                if (!$retour->succes) {

                } else {
                    $i++;
                }
            }
        }

        return $i;
    }

    private function nettoyerEspace($chaine)
    {
        return preg_replace('/\s+/', ' ',$chaine);
    }
    private function recupereInfo($noeud)
    {
        $info = new stdClass();

        $images= $noeud ;

        foreach ($noeud-> getElementsByTagName("img") as $key => $image) {
            if (str_contains($image->getAttribute('class'), "product-image-photo")) {
                $info -> img = $image-> getAttribute('src');
            }
        }

        ;
        $a_titre = $noeud -> getElementsByTagName("a") -> item(0);
        $info -> url = $a_titre->getAttribute('href');

        $nom = $noeud -> getElementsByTagName("a")->item(1)->textContent;
        $info -> nom = self::nettoyerEspace(trim($nom));
        // Type, format et pays
        $aElements = $noeud -> getElementsByTagName("strong");
        foreach ($aElements as $node) {
            if ($node -> getAttribute('class') == 'product product-item-identity-format') {
                $info -> desc = new stdClass();
                $info -> desc -> texte = $node -> textContent;
                $info->desc->texte = self::nettoyerEspace($info->desc->texte);
                $aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
                if (count ($aDesc) == 3) {

                    $info -> desc -> type = trim($aDesc[0]);
                    $info -> desc -> format = trim($aDesc[1]);
                    $info -> desc -> pays = trim($aDesc[2]);
                }

                $info -> desc -> texte = trim($info -> desc -> texte);
            }
        }

        //Code SAQ
        $aElements = $noeud -> getElementsByTagName("div");
        foreach ($aElements as $node) {
            if ($node -> getAttribute('class') == 'saq-code') {
                if(preg_match("/\d+/", $node -> textContent, $aRes))
                {
                    $info -> desc -> code_SAQ = trim($aRes[0]);
                }
            }
        }

        $aElements = $noeud -> getElementsByTagName("span");
        foreach ($aElements as $node) {
            $aElements = $noeud->getElementsByTagName("span");
            foreach ($aElements as $node) {
                if ($node->getAttribute('class') == 'price') {
                    $info->prix = trim($node->textContent);
                    $info->prix = str_replace(" ", "", $info->prix);
                    $info->prix = str_replace("$", "", $info->prix);
                    $info->prix = str_replace(",", ".", $info->prix); // remplace "," par "." pour la valeur décimale correcte
                    $info->prix = floatval($info->prix); // convertit le nombre en chaîne de caractères
                }
            }
        }
        return $info;
    }

    private function ajouteProduit($bte)
    {
        $retour = (object) [
            'succes' => false,
            'raison' => '',
        ];

        $type = Types::where('nom', $bte->desc->type)->first();

        if ($type) {
            $existingBottle = Bouteille::where('code_SAQ', $bte->desc->code_SAQ)->exists();
            if (!$existingBottle) {
                $pays = Pays::where('nom', $bte->desc->pays)->first();
                if (is_null($pays)) {
                    $pays = Pays::create(['nom' => $bte->desc->pays]);
                }

                $bouteille = new Bouteille();
                $bouteille->bouteille_nom = $bte->nom;
                $bouteille->image_url = $bte->img;
                $bouteille->code_SAQ = $bte->desc->code_SAQ;
                $bouteille->description = $bte->desc->texte;
                $bouteille->prix_saq = $bte->prix;
                $bouteille->saq_url = $bte->url;
                $bouteille->format = $bte->desc->format;
                $bouteille->type_id = $type->id;
                $bouteille->pays_id = $pays->id;

                if ($bouteille->save()) {
                    $retour->succes = true;
                    $retour->raison = self::INSERE;
                }
            } else {
                $retour->raison = self::DUPLICATION;
            }
        } else {
            $retour->raison = self::ERREURDB;
        }

        return $retour;
    }
}
