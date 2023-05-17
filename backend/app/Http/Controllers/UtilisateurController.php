<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
  
        public function index()
        {
            $utilisateur = Utilisateur::all();
            return view('utilisateur.index', compact('utilisateur'));
        }
    
        public function create()
        {
            return view('utilisateur.create');
        }
    
        public function store(Request $request)
        {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:utilisateur',
                'password' => 'required|min:6',
            ]);
    
            Utilisateur::create($request->all());
    
            return redirect()->route('utilisateur.index')
                ->with('success', 'Utilisateur created successfully.');
        }
    
        public function show(Utilisateur $utilisateur)
        {
            return view('utilisateur.show', compact('utilisateur'));
        }
    
        public function edit(Utilisateur $utilisateur)
        {
            return view('utilisateur.edit', compact('utilisateur'));
        }
    
        public function update(Request $request, Utilisateur $utilisateur)
        {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:utilisateur,email,' . $utilisateur->id,
                'password' => 'nullable|min:6',
            ]);
    
            $utilisateur->update($request->all());
    
            return redirect()->route('utilisateur.index')
                ->with('success', 'Utilisateur updated successfully.');
        }
    
        public function destroy(Utilisateur $utilisateur)
        {
            $utilisateur->delete();
    
            return redirect()->route('utilisateur.index')
                ->with('success', 'Utilisateur deleted successfully.');
        }
    }