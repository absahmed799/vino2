<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class UtilisateurController extends Controller
{

    public function index()
    {
        $utilisateur = Utilisateur::all();
        return response()->json($utilisateur);
    }

    public function create(Request $request)
    {
        //return view('utilisateur.create');
    }

    public function store(Request $request)
    {
        \Log::debug('request', $request->all());
        try {
            $this->validate($request, [
                'nom' => 'required',
                'courriel' => 'required|unique:utilisateurs,courriel',
                'mot_de_passe' => 'required',
                'role_id' => 'required|exists:roles,id'
            ], [
                'courriel.unique' => 'Ce courriel est déjà existant !'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }


        $nom = $request->input('nom');
        $courriel = $request->input('courriel');
        $motDePasse = $request->input('mot_de_passe');
        $role_id = $request->input('role_id');

        $utilisateur = new Utilisateur();
        $utilisateur->nom = $nom;
        $utilisateur->courriel = $courriel;
        $utilisateur->mot_de_passe = Hash::make($motDePasse);
        $utilisateur->role_id = $role_id;

        $utilisateur->save();

        return response()->json([
            'message' => '✅ Utilisateur créé avec succès',
            'utilisateur' => $utilisateur
        ]);
    }


    public function show($id)
    {
        try {
            $utilisateur = Utilisateur::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => '⛔ Cette utilisateur est inexistante!'], 404);
        }

        return response()->json([
            'message' => '👤 Utilisateur id: ' . $id . '.',
            'utilisateur' => $utilisateur
        ]);
    }

    public function edit(Utilisateur $utilisateur)
    {
        //return view('utilisateur.edit', compact('utilisateur'));
    }

    public function update(Request $request, $id)
    {
        try {
            $utilisateur = Utilisateur::findOrFail($id);

            $this->validate($request, [
                'nom' => ['required', 'string'],
                'courriel' => ['required', 'email'],
                'mot_de_passe' => ['nullable'],
            ]);

            $utilisateur->update($request->all());

            return response()->json([
                'message' => '✅ Utilisateur modifié avec succès.',
                'utilisateur' => $utilisateur
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => '⛔ Cette utilisateur est inexistante!'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $utilisateur = Utilisateur::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => '⛔ Cette utilisateur est inexistante!'], 404);
        }

        $utilisateur->delete();

        return response()->json(['message' => '✅ Utilisateur a été supprimée avec succès.']);
    }
}
