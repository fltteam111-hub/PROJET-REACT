
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // MODIFIÉ : navigation vers le catalogue filtré

import Err from "../alerts/error";
import War from "../alerts/warning";
import "../redux/AppM.css";

export default function Category({
    onCategoryChange,
    selectedCategory, // MODIFIÉ : catégorie sélectionnée dans Books
}) {
    const [Category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState(null);

    useEffect(() => {
        fetch("http://flt1.local/bibliothique-api/API_Category.php")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors du chargement des catégories");
                }
                return res.json();
            })
            .then((data) => setCategory(data))
            .catch((err) => setErr(err.message))
            .finally(() => setLoading(false));
    }, []);

    // MODIFIÉ : affichage du chargement pendant la récupération des catégories
    if (loading) {
        return (
            <section className="cards-container">
                <div className="spinner"></div>
            </section>
        );
    }

    if (error) {
        return <Err message={error} />;
    }

    // MODIFIÉ : conservation du menu déroulant dans la page Catalogue
    if (onCategoryChange) {
        return (
            <div className="select-wrap">
                <select
                    value={selectedCategory || "all"}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="all">All Categories</option>

                    {Category.map((c) => (
                        <option
                            key={c.idCategory}
                            value={c.idCategory}
                        >
                            {c.nom}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // MODIFIÉ : affichage d'un message si aucune catégorie n'est disponible
    if (Category.length === 0) {
        return <War message="Aucune catégorie disponible" />;
    }

    // MODIFIÉ : page indépendante affichant toutes les catégories
    return (
        <main>
            <section className="cards-container">
                {Category.map((c) => (
                    <div className="card" key={c.idCategory}>
                        <h2>{c.nom}</h2>

                        <Link
                            to={`/catalogue?category=${c.idCategory}`}
                            className="card-btn"
                        >
                            Voir les livres
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    );
}
