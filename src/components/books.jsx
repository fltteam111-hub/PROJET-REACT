import Success from "../alerts/seccess";

import { useDispatch } from "react-redux";
import { ajouterAuPanier } from "../redux/cartSlice";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // MODIFIÉ : lecture de la catégorie depuis l'URL

import "../redux/AppM.css";
import Err from "../alerts/error";
import Category from "./categories";
// import SaveButton from "../content/saveBtn";
import Info from "../alerts/info";

export default function Books() {
    const dispatch = useDispatch();
    
    const [successKey, setSuccessKey] = useState(0);

    const [Books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // MODIFIÉ : récupération de l'identifiant de catégorie depuis l'URL
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    // MODIFIÉ : initialisation du filtre avec la catégorie de l'URL
    const [catSelected, setCatSelected] = useState(
        categoryFromUrl || "all"
    );

    const [showInfo, setShowInfo] = useState(false);
    // ####################
    const [successMessage, setSuccessMessage] = useState("");

    // MODIFIÉ : mise à jour du filtre lorsque la catégorie de l'URL change
    useEffect(() => {
        setCatSelected(categoryFromUrl || "all");
    }, [categoryFromUrl]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("http://flt1.local/bibliothique-api/API_Books.php")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Erreur lors du chargement des livres");
                    }
                    return res.json();
                })
                .then((data) => setBooks(data))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(true));
        }, 3000);

        // MODIFIÉ : nettoyage du minuteur si le composant est démonté
        return () => clearTimeout(timer);
    }, []);

    const ajouterLivre = (livre) => {
        dispatch(
            ajouterAuPanier({
                id: livre.idBook,
                titre: livre.title,
                auteur: livre.Auteur,
                prix: Number(livre.prix),
                image: livre.image,
                quantite: 1,
            })
        );

        setSuccessMessage(
            `Le livre "${livre.title}" a été ajouté au panier avec succès !`
        );

        setSuccessKey((prev) => prev + 1);
    };

    // MODIFIÉ : filtrage des livres selon la catégorie sélectionnée
    const filteredBooks = Books.filter((c) => {
        return (
            catSelected === "all" ||
            String(c.idCategory) === String(catSelected)
        );
    });

    if (!loading) {
        return (
            <section className="cards-container">
                <div className="spinner"></div>
            </section>
        );
    }

    if (error) {
        return <Err message={error} />;
    }

    return (
        <>
            {/* MODIFIÉ : transmission de la catégorie sélectionnée au composant Category */}
            <Category
                selectedCategory={catSelected}
                onCategoryChange={setCatSelected}
            />

            {showInfo && <Info message="Coming soon..." />}
            {successMessage && <Success message={successMessage} key={successKey} />}

            <section className="cards-container">
                {filteredBooks.length === 0 ? (
                    <p>Aucun livre dans cette catégorie.</p>
                ) : (
                    filteredBooks.map((c) => (
                        <div className="card" key={c.idBook}>
                            {/* <SaveButton onToggle={(saved) => console.log(c.idBook, saved)} /> */}

                            <img src={c.image} alt={c.title} />

                            <h2>{c.title}</h2>
                            <h3>Auteur : {c.Auteur}</h3>
                            <p>{c.details}</p>
                            <span>{c.prix} dhs</span>

                            <button
                                onClick={() => ajouterLivre(c)}
                                className="card-btn"
                            >
                                Ajouter au panier
                            </button>
                            <br />
                        </div>
                    ))
                )}
            </section>
        </>
    );
}
