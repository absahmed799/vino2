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

        return response()->json('hey');
    }

    /**
     * Affiche la ressource spécifiée.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            // Rechercher le cellier en utilisant à la fois l'ID du cellier et l'ID de l'utilisateur
            $cellier = Cellier::findOrFail($id);

            return response()->json($cellier);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
        }
    }

    /**
     * Mettre à jour la ressource spécifiée dans le stockage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'nom' => ['required', 'string'],
        ]);

        try {
            $cellier = Cellier::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
        }

        $cellier->update($request->all());

        return response()->json($cellier);
    }


    /**
     * Supprime la ressource spécifiée du stockage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id)
    {
        try {
            $cellier = Cellier::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(false, 404);
        }

        $cellier->forceDelete();

        return response()->json(true, 204);
    }
}
