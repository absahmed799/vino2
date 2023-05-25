<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Utilisateur;
use App\Models\BouteilleCellier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CellierController extends Controller
{
    /**
     * Afficher une liste de la ressource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        // Vu qu'il est dans un middleware Auth on peut récupérer l'utilisateur connecté directement via la facade Auth
//        // Récupérer l'ID de l'utilisateur à partir de la requête
//        $utilisateurId = $request->input('utilisateur_id');

        try {
            // Rechercher l'utilisateur
            $utilisateur = Auth::user();

            // Récupérer les celliers de l'utilisateur
            $celliers = $utilisateur->celliers()->withCount('bouteilles')->get();
            foreach ($celliers as $cellier) {
                $sumQuantite = BouteilleCellier::where('cellier_id', $cellier->id)->sum('quantite');
                $cellier->sumQuantite = $sumQuantite;
            }
            return response()->json($celliers);
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

        $cellier = Auth::user()->celliers()->create([
            'nom' => $request->input('nom'),
        ]);

        return response()->json($cellier, 201);
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
