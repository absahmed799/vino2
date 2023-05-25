<?php

namespace App\Http\Controllers;
use App\Models\Pays;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pays = Pays::all();
        return response()->json($pays);
    }

    public function store(Request $request)
    {
        $pays = Pays::create($request->all());
        return response()->json($pays, 201);
    }

    public function show($id)
    {
        $pays = Pays::findOrFail($id);
        return response()->json($pays);
    }

    public function update(Request $request, $id)
    {
        $pays = Pays::findOrFail($id);
        $pays->update($request->all());
        return response()->json($pays);
    }

    public function destroy($id)
    {
        $pays = Pays::findOrFail($id);
        $pays->delete();
        return response()->json(null, 204);
    }
}
