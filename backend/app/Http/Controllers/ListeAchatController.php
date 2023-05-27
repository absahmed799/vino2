<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListeAchat;
use Illuminate\Support\Facades\Auth;


class ListeAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    // gestion de la quantité de bouteille pour chaque utilisateur

    public function gestionQuantite($utilisateurId, $bouteilleId, $action)
    {
        $listeAchat = ListeAchat::firstOrNew([
            'utilisateur_id' => $utilisateurId,
            'bouteille_id' => $bouteilleId
        ]);

        // Vérifier l'action et ajuster la quantité en conséquence
        if ($action === 'ajouter') {
            $listeAchat->quantite += 1;
        } elseif ($action === 'soustraire') {
            $listeAchat->quantite -= 1;
            if ($listeAchat->quantite < 0) {
                $listeAchat->quantite = 0;
            }
        }

        $listeAchat->save();

        // Autres opérations ou retours de réponse selon vos besoins
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        // Récupérer l'utilisateur authentifié
        $utilisateur = auth()->user();

        // Vérifier si l'utilisateur est authentifié
        if ($utilisateur) {
            // Récupérer le panier de l'utilisateur en fonction de son ID
            $panier = $utilisateur->panier;

            // Retourner le panier en tant que réponse JSON
            return response()->json($panier);
        } else {
            // Retourner une erreur ou une réponse appropriée si l'utilisateur n'est pas authentifié
            // ...
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $bouteilleId, $quantite)
    {
        $utilisateurId = Auth::id();

        // Appel de la fonction ajouterQuantite en passant l'ID de l'utilisateur
        $this->gestionQuantite($utilisateurId, $bouteilleId, $quantite);

        // Autres opérations ou retours de réponse selon vos besoins
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
