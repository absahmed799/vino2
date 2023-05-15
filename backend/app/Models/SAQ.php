<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class SAQ extends Model
{
    const DUPLICATION = 'duplication';
    const ERREURDB = 'erreurdb';
    const INSERE = 'Nouvelle bouteille insérée';

    protected $fillable = ['nom', 'type', 'image', 'code_saq', 'pays', 'description', 'prix_saq', 'url_saq', 'url_img', 'format'];

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
		echo self::$_status;
		//curl_close($s);

		$doc = new DOMDocument();
		$doc -> recover = true;
		$doc -> strictErrorChecking = false;
		@$doc -> loadHTML(self::$_webpage);
		$elements = $doc -> getElementsByTagName("li");
		$i = 0;
		foreach ($elements as $key => $noeud) {
			//var_dump($noeud -> getAttribute('class')) ;
			//if ("resultats_product" == str$noeud -> getAttribute('class')) {
			if (strpos($noeud -> getAttribute('class'), "product-item") !== false) {
				var_dump(strpos($noeud -> getAttribute('class'), "product-item"));
				//echo $this->get_inner_html($noeud);
				$info = self::recupereInfo($noeud);
				echo "<p>".$info->nom;
				$retour = $this -> ajouteProduit($info);
				echo "<br>Code de retour : " . $retour -> raison . "<br>";
				if ($retour -> succes == false) {
					echo "<pre>";
					var_dump($info);
					echo "</pre>";
					echo "<br>";
				} else {
					$i++;
				}
				echo "</p>";
			}
		}

		return $i;
    }
    private function get_inner_html($node) {
		$innerHTML = '';
		$children = $node -> childNodes;
		foreach ($children as $child) {
			$innerHTML .= $child -> ownerDocument -> saveXML($child);
		}

		return $innerHTML;
	}
	private function nettoyerEspace($chaine)
	{
		return preg_replace('/\s+/', ' ',$chaine);
	}
    private function recupereInfo($noeud)
    {
        $info = new stdClass();
		//if (strpos($noeud -> getAttribute('class'), "product-image-photo") !== false) {
			
			var_dump($noeud-> getElementsByTagName("img"));
			$images= $noeud ;

			foreach ($noeud-> getElementsByTagName("img") as $key => $image) {
				var_dump($image);
				if (strpos($image -> getAttribute('class'), "product-image-photo") !== false) {
					var_dump(strpos($image -> getAttribute('class'), "product-image-photo") !== false);
					$info -> img = $image-> getAttribute('src');
				}
			
			
			}

		;
		$a_titre = $noeud -> getElementsByTagName("a") -> item(0);
		$info -> url = $a_titre->getAttribute('href');
		
        //var_dump($noeud -> getElementsByTagName("a")->item(1)->textContent);
        $nom = $noeud -> getElementsByTagName("a")->item(1)->textContent;
        //var_dump($a_titre);
		$info -> nom = self::nettoyerEspace(trim($nom));
		//var_dump($info -> nom);
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
			//$info->prix = number_format($info->prix, 2, '.', ''); // formate la chaîne en un nombre avec deux décimales
			$info->prix = floatval($info->prix); // convertit le nombre en chaîne de caractères
			}
			}
		}
		var_dump($info);
		return $info;
    }

    
        private function ajouteProduit($bte)
        {
            $retour = (object) [
                'succes' => false,
                'raison' => '',
            ];
        
            $type = Type::where('type', $bte->desc->type)->first();
        
            if ($type) {
                $existingBottle = Bouteille::where('code_saq', $bte->desc->code_SAQ)->exists();
                if (!$existingBottle) {
                    $bouteille = new Bouteille();
                    $bouteille->nom = $bte->nom;
                    $bouteille->type = $type->id;
                    $bouteille->image = $bte->img;
                    $bouteille->code_saq = $bte->desc->code_SAQ;
                    $bouteille->pays = $bte->desc->pays;
                    $bouteille->description = $bte->desc->texte;
                    $bouteille->prix_saq = $bte->prix;
                    $bouteille->url_saq = $bte->url;
                    $bouteille->url_img = $bte->img;
                    $bouteille->format = $bte->desc->format;
        
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