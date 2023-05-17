<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication successful
            $utilisateur = Auth::Utilisateur();
            $token = $utilisateur->createToken('access_token')->plainTextToken;

            return response()->json([
                'utilisateur' => $utilisateur,
                'access_token' => $token,
            ]);
        }

        // Authentication failed
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->Utilisateur()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function utilisateur(Request $request)
    {
        return response()->json($request->Utilisateur());
    }
}
