<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use App\Models\ListeAchat;
use App\Models\Utilisateur;
use App\Models\BouteilleCellier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ListeAchatController extends Controller
{
    /**
     * Afficher une liste de la ressource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $utilisateurId = auth()->user()->id;

        $listesAchat = ListeAchat::where('utilisateur_id', $utilisateurId)->get();

        foreach ($listesAchat as $listeAchat) {
            $bouteille = Bouteille::find($listeAchat->bouteille_id);
            $listeAchat->bouteille = $bouteille;
        }

        return response()->json($listesAchat);
    }

    /**
     * Stocker une ressource nouvellement créé dans le stockage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $listeAchat = ListeAchat::create([
            'quantite' => $request->quantite,
            'bouteille_id' => $request->bouteille_id,
            'utilisateur_id' =>  Auth::user()->id,
        ]);

        return response()->json('Ajout avec succes');
    }

    /**
     * Affiche la ressource spécifiée.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show()
    {
        try {
            $utilisateurId = auth()->user()->id;

            $listesAchat = ListeAchat::where('utilisateur_id', $utilisateurId)->get();

            foreach ($listesAchat as $listeAchat) {
                $bouteille = Bouteille::find($listeAchat->bouteille_id);
                $listeAchat->bouteille = $bouteille;
            }

            return response()->json($listesAchat);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'La liste d\'achat n\'existe pas pour l\'utilisateur connecté.'], 404);
        }
    }

    
    public function clean()
    {
        ListeAchat::where('utilisateur_id', Auth::user()->id)->delete();
        return response()->json(['message' => 'Bouteilles deleted successfully']);
    }

    

    /**
     * Supprime la ressource spécifiée du stockage.
     *
     * @param int $id
     * @return JsonResponse
     */

    public function destroyBouteille($bouteilleId)
    {
        try {
            $utilisateurId = auth()->user()->id;

            $listeAchat = ListeAchat::where('utilisateur_id', $utilisateurId)
                ->where('bouteille_id', $bouteilleId)
                ->firstOrFail();

            $listeAchat->delete();

            return response()->json(['message' => 'La bouteille a été supprimée de la liste d\'achat']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'La bouteille n\'appartient pas à la liste d\'achat spécifiée ou la liste d\'achat n\'a pas été trouvée'], 404);
        }
    }

    // upDateQuantité bouteille listeAchat
    public function updateQuantity(Request $request, $bouteilleId)
{
    $utilisateurId = auth()->user()->id;

    $listeAchat = ListeAchat::where('utilisateur_id', $utilisateurId)
        ->where('bouteille_id', $bouteilleId)
        ->firstOrFail();

    // Mise à jour de la quantité dans le modèle ListeAchat
    $listeAchat->quantite = $request->input('quantite');
    $listeAchat->save();

    return response()->json($listeAchat);
}


public function quantite($bouteilleId, Request $request)
{
    $utilisateurId = auth()->user()->id;

    $listeAchat = ListeAchat::where('utilisateur_id', $utilisateurId)
        ->where('bouteille_id', $bouteilleId)
        ->firstOrFail();

    // Mise à jour de la quantité dans le modèle ListeAchat
    $listeAchat->quantite = $request->input('quantite');
    $listeAchat->save();

    return response()->json($listeAchat->quantite);
}


 
}
