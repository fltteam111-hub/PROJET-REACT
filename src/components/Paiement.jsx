
import { useState } from "react";

// Composant responsable du paiement
function Paiement({ total, onConfirmer, onRetour }) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [methode, setMethode] = useState("livraison");

  // Valider le formulaire et transmettre la commande
  const confirmerCommande = (e) => {
    e.preventDefault();

    onConfirmer({
      nom,
      telephone,
      adresse,
      methode,
    });
  };

  return (
    <div className="paiement">
      <div className="paiement-header">
        <button
          type="button"
          className="btn-retour"
          onClick={onRetour}
        >
          ← Retour au panier
        </button>

        <h3>Finaliser la commande</h3>
        <p>Complétez vos informations pour continuer.</p>
      </div>

      <form onSubmit={confirmerCommande}>
        <label htmlFor="nom">Nom complet</label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Votre nom complet"
          required
        />

        <label htmlFor="telephone">Téléphone</label>
        <input
          id="telephone"
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="06XXXXXXXX"
          pattern="0[5-7][0-9]{8}"
          title="Entrez un numéro marocain valide à 10 chiffres."
          required
        />

        <label htmlFor="adresse">Adresse de livraison</label>
        <textarea
          id="adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Ville, quartier, rue..."
          required
        />

        <h4>Mode de paiement</h4>

        <label className="mode-paiement">
          <input
            type="radio"
            name="methode"
            value="livraison"
            checked={methode === "livraison"}
            onChange={(e) => setMethode(e.target.value)}
          />
          <span>💵 Paiement à la livraison</span>
        </label>

        <label className="mode-paiement">
          <input
            type="radio"
            name="methode"
            value="carte"
            checked={methode === "carte"}
            onChange={(e) => setMethode(e.target.value)}
          />
          <span>💳 Carte bancaire</span>
        </label>

        {methode === "carte" && (
          <p className="paiement-note">
            orta st sgadagh !!!!!!!!!!!
          </p>
        )}

        <div className="paiement-total">
          <span>Total à payer</span>
          <strong>{total.toFixed(2)} DH</strong>
        </div>

        <button type="submit" className="btn-confirmer">
          Confirmer la commande
        </button>
      </form>
    </div>
  );
}

export default Paiement;
