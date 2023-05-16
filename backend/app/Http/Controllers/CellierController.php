<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CellierController extends Controller
{
    /**
     * Afficher une liste de la ressource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $celliers = Cellier::all();
        return response()->json($celliers);
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
    public function show($id)
    {
        try {
            $cellier = Cellier::query()->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant!'], 404);
        }

        return response()->json($cellier);
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
            $cellier = Cellier::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant!'], 404);
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
    public function destroy($id)
    {
        try {
            $cellier = Cellier::query()->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ce cellier est inexistant!'], 404);
        }

        $cellier->forceDelete();

        return response()->json(null, 204);
    }
}
