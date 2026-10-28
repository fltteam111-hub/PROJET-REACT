import { useNavigate } from "react-router-dom";


import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  supprimerDuPanier,
  modifierQuantite,
} from "../redux/cartSlice";

import Paiement from "./Paiement";

// Composant principal du panier
function Panier({ isOpen = true, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fermerPanier = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/catalogue");
    }
  };

  

  // Récupérer les livres du panier
  const items = useSelector((state) => state.cart.items);

  // Gérer l'affichage du formulaire de paiement
  const [afficherPaiement, setAfficherPaiement] = useState(false);

  // Calculer le nombre total de livres
  const nombreArticles = items.reduce(
    (total, livre) => total + livre.quantite,
    0
  );

  // Calculer le prix total
  const total = items.reduce(
    (somme, livre) => somme + livre.prix * livre.quantite,
    0
  );

  // Ne rien afficher si le panier est fermé
  if (!isOpen) return null;

  // Confirmer la commande
  const confirmerCommande = (commande) => {
    console.log("Commande confirmée :", {
      ...commande,
      livres: items,
      total,
    });

    alert("Commande enregistrée ! Le paiement réel reste à configurer.");

    setAfficherPaiement(false);
    fermerPanier();
  };

  return (
    // Fermer le panier en cliquant à l'extérieur
    <div className="cart-overlay" onClick={fermerPanier}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mon panier"
      >
        {/* En-tête du panier */}
        <div className="drawer-header">
          <div>
            <p className="drawer-eyebrow">VOTRE SÉLECTION</p>
            <h2>
              {afficherPaiement
                ? "Finaliser ma commande"
                : `Mon panier (${nombreArticles})`}
            </h2>
          </div>

          {/* Bouton de fermeture */}
          <button
            className="close-drawer"
            onClick={() => {
              setAfficherPaiement(false);
              fermerPanier();
            }}
            aria-label="Fermer le panier"
          >
            ×
          </button>
        </div>

        {/* Afficher le paiement*/}
        {afficherPaiement ? (
          <Paiement
            total={total}
            onConfirmer={confirmerCommande}
            onRetour={() => setAfficherPaiement(false)}
          />
        ) : items.length === 0 ? (
          // Message si le panier est vide
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h3>Votre panier est vide</h3>
            <p>Découvrez nos livres et ajoutez vos favoris.</p>

            <button className="continue-button" onClick={fermerPanier}>
              Continuer mes achats
            </button>
          </div>
        ) : (
          <>
            {/* Liste des livres */}
            <div className="cart-items">
              {items.map((livre) => (
                <div className="cart-item" key={livre.id}>
                  <img
                    className="cart-item-image"
                    src={livre.image}
                    alt={livre.titre}
                  />

                  <div className="cart-item-info">
                    <h3>{livre.titre}</h3>
                    <p>{livre.prix.toFixed(2)} DH / unité</p>

                    {/* Modifier la quantité */}
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          dispatch(
                            modifierQuantite({
                              id: livre.id,
                              quantite: livre.quantite - 1,
                            })
                          )
                        }
                        disabled={livre.quantite <= 1}
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>

                      <span>{livre.quantite}</span>

                      <button
                        onClick={() =>
                          dispatch(
                            modifierQuantite({
                              id: livre.id,
                              quantite: livre.quantite + 1,
                            })
                          )
                        }
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    {/* Prix selon la quantité */}
                    <strong>
                      {(livre.prix * livre.quantite).toFixed(2)} DH
                    </strong>

                    {/* Supprimer le livre */}
                    <button
                      className="remove-button"
                      onClick={() =>
                        dispatch(supprimerDuPanier(livre.id))
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pied du panier */}
            <div className="cart-footer">
              <div className="total-line">
                <span>Total</span>
                <strong>{total.toFixed(2)} DH</strong>
              </div>

              {/* Ouvrir le formulaire de paiement */}
              <button
                className="add-button full-button"
                onClick={() => setAfficherPaiement(true)}
              >
                Passer à la caisse
              </button>

              <button
                className="continue-button full-button"
                onClick={fermerPanier}
              >
                Continuer mes achats
              </button>

              <p className="cart-note">
                Le montant total se met à jour automatiquement.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Panier;


