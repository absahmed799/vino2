<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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

        $bouteille = Bouteille::create($request->all());

        return response()->json($bouteille, 201);
    }


    public function show($id)
    {
        try {
            $bouteille = Bouteille::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Cette bouteille est inexistante!'], 404);
        }

        return response()->json($bouteille);
    }


    public function update(Request $request, $id)
    {
        try {
            $bouteille = Bouteille::findOrFail($id);

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

            $bouteille->update($request->all());

            return response()->json($bouteille);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Cette bouteille est inexistante!'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $bouteille = Bouteille::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Cette bouteille est inexistante!'], 404);
        }

        $bouteille->delete();

        return response()->json(['message' => 'La bouteille a été supprimée avec succès.']);
    }
}
