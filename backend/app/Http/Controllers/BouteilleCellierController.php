<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\BouteilleCellier;
use Illuminate\Http\Request;

class BouteilleCellierController extends Controller
{
    public function index(Cellier $cellier)
    {
        $bouteillesCellier = $cellier->bouteillesCellier;
        return response()->json($bouteillesCellier);
    }

    public function store(Request $request, Cellier $cellier)
    {
        $bouteilleCellier = new BouteilleCellier($request->all());
        $cellier->bouteillesCellier()->save($bouteilleCellier);
        return response()->json($bouteilleCellier, 201);
    }

    public function show(Cellier $cellier, BouteilleCellier $bouteilleCellier)
    {
        $this->authorize('view', $bouteilleCellier);

        return response()->json($bouteilleCellier);
    }

    public function update(Request $request, Cellier $cellier, BouteilleCellier $bouteilleCellier)
    {
        $this->authorize('update', $bouteilleCellier);

        $bouteilleCellier->update($request->all());
        return response()->json($bouteilleCellier);
    }

    public function destroy(Cellier $cellier, BouteilleCellier $bouteilleCellier)
    {
        $this->authorize('delete', $bouteilleCellier);

        $bouteilleCellier->delete();
        return response()->json(null, 204);
    }
}
