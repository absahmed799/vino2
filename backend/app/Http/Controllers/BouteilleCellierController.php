<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\BouteilleCellier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class BouteilleCellierController extends Controller
{
    public function index(int $id)
    {
        try {
            // Rechercher le cellier en utilisant à la fois l'ID du cellier
            $cellier = Cellier::with(['bouteilles', 'bouteilles.type', 'bouteilles.pays'])
                ->withCount('bouteilles')
                ->findOrFail($id);
            return response()->json($cellier);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant ou n\'appartient pas à l\'utilisateur!'], 404);
        }
    }

    public function store(Request $request, Cellier $cellier)
    {
        $bouteilleCellier = BouteilleCellier::create([
            'millesime' => $request->input('millesime'),
            'quantite' => $request->input('quantite'),
            'date_achat' => $request->input('date_achat'),
            'garde_jusqua' => $request->input('garde_jusqua'),
            'note' => $request->input('note'),
            'cellier_id' => $cellier->id,
            'bouteille_id' => $request->input('bouteille_id'),
        ]);

        return response()->json($bouteilleCellier, 201);
    }

    public function show(Cellier $cellier, $id_bouteille)
    {
        $bouteilleCellier = BouteilleCellier::where('cellier_id', $cellier->id)
            ->where('bouteille_id', $id_bouteille)
            ->first();

        if (!$bouteilleCellier) {
            return response()->json(['error' => 'Bouteille not found'], 404);
        }

        return response()->json($bouteilleCellier);
    }

    public function update(Request $request, Cellier $cellier, $bouteille_id)
    {
        // Trouver le bouteilleCellier associé au cellier et à l'ID de la bouteille
        $bouteilleCellier = BouteilleCellier::where('cellier_id', $cellier->id)
            ->where('bouteille_id', $bouteille_id)
            ->first();

        // Vérifier si le bouteilleCellier existe
        if (!$bouteilleCellier) {
            return response()->json(['error' => 'Bouteille not found'], 404);
        }

        // Accéder à la bouteille à partir du bouteilleCellier
        $bouteille = $bouteilleCellier->bouteille;

        // Valider les données de la requête
        $this->validate($request, [
            'bouteille_nom' => ['required', 'string'],
            'image_url' => ['required', 'string'],
            'code_SAQ' => ['required', 'integer'],
            'description' => ['required', 'string'],
            'prix_saq' => ['required', 'numeric'],
            'saq_url' => ['required', 'string'],
            'format' => ['required', 'string'],
            'type_id' => ['required', 'integer'],
            'pays_id' => ['required', 'integer'],
        ]);

        // Mettre à jour les attributs de la bouteille
        $bouteille->update($request->all());

        return response()->json($bouteille);
    }

    public function destroy(Cellier $cellier, $bouteille_id)
    {
        // Trouver le bouteilleCellier associé au cellier et à l'ID de la bouteille
        $bouteilleCellier = BouteilleCellier::where('cellier_id', $cellier->id)
            ->where('bouteille_id', $bouteille_id)
            ->first();

        if (!$bouteilleCellier) {
            return response()->json(['error' => 'Bouteille not found'], 404);
        }

        // Supprimer le bouteilleCellier
        $bouteilleCellier->delete();

        return response()->json(['message' => 'Bouteille deleted']);
    }
}
