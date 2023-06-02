<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Signaler;


class SignalerController extends Controller
{

    public function index()
    {
        $signalers = Signaler::all();
        return response()->json($signalers);
    }
    public function create(Request $request)
    {
        $signaler = new Signaler();
        $signaler->titre_erreur = $request->titre_erreur;
        $signaler->description_erreur = $request->description_erreur;
        $signaler->utilisateur_id = Auth::user()->id;
        $signaler->save();

        return response()->json(['message' => 'Signaler created successfully'], 200);
    }

    public function update(Request $request, $id)
    {
        $signaler = Signaler::find($id);
        if (!$signaler) {
            return response()->json(['message' => 'Signaler not found'], 404);
        }

        $signaler->titre_erreur = $request->input('titre_erreur');
        $signaler->description_erreur = $request->input('description_erreur');
        $signaler->utilisateur_id = $request->input('utilisateur_id');
        $signaler->save();

        return response()->json(['message' => 'Signaler updated successfully']);
    }

    public function delete($id)
    {
        $signaler = Signaler::find($id);
        if (!$signaler) {
            return response()->json(['message' => 'Signaler not found'], 404);
        }

        $signaler->delete();

        return response()->json(['message' => 'Signaler deleted successfully']);
    }

    public function show($id)
    {
        $signaler = Signaler::find($id);
        if (!$signaler) {
            return response()->json(['message' => 'Signaler not found'], 404);
        }

        return response()->json($signaler);
    }
}
