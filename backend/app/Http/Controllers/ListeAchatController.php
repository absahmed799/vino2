<?php

namespace App\Http\Controllers;

use App\Models\ListeAchat;
use Illuminate\Http\Request;
use App\Http\Controllers\ModelNotFoundException;

class ListeAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Vu qu'il est dans un middleware Auth on peut récupérer l'utilisateur connecté directement via la facade Auth
//        // Récupérer l'ID de l'utilisateur à partir de la requête
//        $utilisateurId = $request->input('utilisateur_id');

        try {
            // Rechercher l'utilisateur
            $utilisateur = Auth::user();

            // Récupérer les listeachants de l'utilisateur
            $listeachants = $utilisateur->listeachants()->withCount('bouteilles')->get();
            foreach ($listeachants as $listeachant) {
                $sumQuantite = BouteilleListeAchat::where('listeachant_id', $listeachant->id)->sum('quantite');
                $listeachant->sumQuantite = $sumQuantite;
            }
            return response()->json($listeachants);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
    }

    /**
     * Stocker une ressource nouvellement créé dans le stockage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nom' => ['required', 'string'],
        ]);

        $listeachant = Auth::user()->listeachants()->create([
            'nom' => $request->input('nom'),
        ]);

        return response()->json($listeachant, 201);
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
            // Rechercher le listeachant en utilisant à la fois l'ID du listeachant et l'ID de l'utilisateur
            $listeachant = ListeAchat::findOrFail($id);

            return response()->json($listeachant);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce listeachant est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
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
            $listeachant = ListeAchat::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce listeachant est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
        }

        $listeachant->update($request->all());

        return response()->json($listeachant);
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
            $listeachant = ListeAchat::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(false, 404);
        }

        $listeachant->forceDelete();

        return response()->json(true, 204);
    }
}
