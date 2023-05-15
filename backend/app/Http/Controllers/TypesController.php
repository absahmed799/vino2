<?php

namespace App\Http\Controllers;

use App\Models\Types;
use Illuminate\Http\Request;

class TypesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = Types::all();
        return response()->json($types);
    }

    public function store(Request $request)
    {
        $types = Types::create($request->all());
        return response()->json($types, 201);
    }

    public function show($id)
    {
        $types = Types::findOrFail($id);
        return response()->json($types);
    }

    public function update(Request $request, $id)
    {
        $types = Types::findOrFail($id);
        $types->update($request->all());
        return response()->json($types);
    }

    public function destroy($id)
    {
        $types = Types::findOrFail($id);
        $types->delete();
        return response()->json(null, 204);
    }
}
