<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email|exists:utilisateurs,courriel',
                'password' => 'required'
            ], [
                'email.exists' => 'Email ou mot de passe incorrect !'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Email ou mot de passe incorrect !'], 422);
        }

        $utilisateur = Utilisateur::where('courriel', $request->post('email'))->first();

        if(\Hash::check($request->password, $utilisateur->mot_de_passe)) {
            Auth::login($utilisateur);

            $token = $utilisateur->createToken('access_token')->plainTextToken;

            return response()->json([
                'utilisateur' => $utilisateur,
                'access_token' => $token,
            ]);
        }

        // Authentication failed
        return response()->json(['message' => 'Email ou mot de passe incorrect !'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Vous avez réussi à vous déconnecter']);
    }

    public function utilisateur(Request $request)
    {
        return response()->json($request->user());
    }
}
