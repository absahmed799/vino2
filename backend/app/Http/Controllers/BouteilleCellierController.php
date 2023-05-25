<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\BouteilleCellier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class BouteilleCellierController extends Controller
{
    public function index($cellier)
    {
        
            $bouteillesCellier = BouteilleCellier::where('cellier_id', $cellier)->get();
            $vin=$bouteillesCellier;
            foreach ($bouteillesCellier as $bouteilleCellier) {
                $bouteille = Bouteille::find($bouteilleCellier->bouteille_id);
                $bouteilleCellier->bouteille = $bouteille;
            }

            return response()->json($bouteillesCellier);
        
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
    public function updateQuantity(Request $request,  $cellier, $bouteilleId)
    {
        // Find the associated BouteilleCellier for the Cellier and bouteille_id
        $bouteilleCellier = BouteilleCellier::where('cellier_id', $cellier)
            ->where('bouteille_id', $bouteilleId)
            ->first();
    
     
    
        // Access the Bouteille from the BouteilleCellier
        $bouteille = $bouteilleCellier->bouteille;
    
        // Validate the request data
        $validatedData = $request->validate([
  
            'quantite' => ['required'],

        ]);
    
        // Update the BouteilleCellier attributes
        $bouteilleCellier->update($validatedData);
    
        return response()->json($bouteilleCellier);
    }
    public function update(Request $request,  $cellier, $bouteilleId)
    {
        // Find the associated BouteilleCellier for the Cellier and bouteille_id
        $bouteilleCellier = BouteilleCellier::where('cellier_id', $cellier)
            ->where('bouteille_id', $bouteilleId)
            ->first();
    
        // Check if the BouteilleCellier exists
        if (!$bouteilleCellier) {
            return response()->json(['error' => 'BouteilleCellier not found'], 404);
        }
    
        // Access the Bouteille from the BouteilleCellier
        $bouteille = $bouteilleCellier->bouteille;
    
        // Validate the request data
        $validatedData = $request->validate([
            'millesime' => ['required'],
            'quantite' => ['required'],
            'date_achat' => ['required'],
            'garde_jusqua' => ['required'],
            'note' => ['required'],
            'bouteille_id' => ['required'],
        ]);
    
        // Update the BouteilleCellier attributes
        $bouteilleCellier->update($validatedData);
    
        return response()->json($bouteilleCellier);
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
