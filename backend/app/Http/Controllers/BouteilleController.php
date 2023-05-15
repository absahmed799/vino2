<?php

namespace App\Http\Controllers;
use App\Models\Bouteille;
use Illuminate\Http\Request;

class BouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bouteilles = Bouteille::all();
        return response()->json($bouteilles);
    }

    public function store(Request $request)
    {
        $bouteille = Bouteille::create($request->all());
        return response()->json($bouteille, 201);
    }

    public function show($id)
    {
        $bouteille = Bouteille::findOrFail($id);
        return response()->json($bouteille);
    }

    public function update(Request $request, $id)
    {
        $bouteille = Bouteille::findOrFail($id);
        $bouteille->update($request->all());
        return response()->json($bouteille);
    }

    public function destroy($id)
    {
        $bouteille = Bouteille::findOrFail($id);
        $bouteille->delete();
        return response()->json(null, 204);
    }
}
