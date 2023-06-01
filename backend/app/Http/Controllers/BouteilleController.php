<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\BouteilleCellier;
use Illuminate\Support\Carbon;

class BouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $bouteilles = Bouteille::with(['type', 'pays'])
        ->get();
        return response()->json($bouteilles);
    }

    public function store(Request $request)
{
    /*
     $this->validate($request, [
        'nom' => ['required', 'string'],
        'description' => ['required', 'string'],
        'prix' => ['required', 'numeric'],
        'type' => ['required'],
        'pays' => ['required' ],
        'millesime' => ['required'],
        'garde_jusqua' => ['required'],
        'date_achat' => ['required'],
        'quantite' => ['required'],
        'note' => ['required'],
    ]);
*/
    $bouteille = Bouteille::create([
        'bouteille_nom' => $request->nom,
        'description' => $request->description,
        'prix_saq' => $request->prix,
        'type_id' => $request->type,
        'pays_id' => $request->pays,
        'utilisateur_id' => Auth::user()->id, // Replace with the actual user ID
        'image_url' => 'https://www.saq.com/media/wysiwyg/placeholder/category/06.png',
        'code_SAQ'=>'000',
        'format'=>$request->format,
    ]);

    $bouteilleCellier = BouteilleCellier::create([
        'millesime' => $request->millesime,
        'quantite' => $request->quantite,
        'date_achat' => Carbon::createFromTimestampMs($request->date_achat),
        'garde_jusqua' => $request->garde_jusqua,
        'note' => $request->note,
        'cellier_id' => $request->cellier_id,
        'bouteille_id' => $bouteille->id,
    ]); // Attach the bouteille to the cellier with additional data

    return response()->json('hello', 200);
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
