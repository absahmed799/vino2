<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CellierController extends Controller
{
    /**
     * Afficher une liste de la ressource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Récupérer l'ID de l'utilisateur à partir de la requête
        $utilisateurId = $request->input('utilisateur_id');

        try {
            // Rechercher l'utilisateur
            $utilisateur = Utilisateur::findOrFail($utilisateurId);

            // Récupérer les celliers de l'utilisateur
            $celliers = $utilisateur->celliers;

            return response()->json($celliers);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
    }

    /**
     * Stocker une ressource nouvellement créé dans le stockage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nom' => ['required', 'string'],
            'utilisateur_id' => ['required', 'exists:utilisateurs,id'],
        ]);

        $cellier = Cellier::create([
            'nom' => $request->input('nom'),
            'utilisateur_id' => $request->input('utilisateur_id'),
        ]);

        return response()->json($cellier, 201);
    }


    /**
     * Affiche la ressource spécifiée.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        // Récupérer l'ID de l'utilisateur à partir de la requête
        $utilisateurId = $request->input('utilisateur_id');

        try {
            // Rechercher le cellier en utilisant à la fois l'ID du cellier et l'ID de l'utilisateur
            $cellier = Cellier::where('id', $id)
                ->where('utilisateur_id', $utilisateurId)
                ->firstOrFail();

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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $cellier = Cellier::where('id', $id)
                ->where('utilisateur_id', $request->input('utilisateur_id'))
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
        }

        $this->validate($request, [
            'nom' => ['required', 'string'],
            'utilisateur_id' => ['required', 'exists:utilisateurs,id'],
        ]);

        $cellier->update($request->all());

        return response()->json($cellier);
    }


    /**
     * Supprime la ressource spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        try {
            $cellier = Cellier::where('id', $id)
                ->where('utilisateur_id', $request->input('utilisateur_id'))
                ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json(false, 404);
        }

        $cellier->forceDelete();

        return response()->json(true, 204);
    }
}
