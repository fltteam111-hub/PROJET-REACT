
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();

  const items = useSelector((state) => state.cart.items);

  const cartCount = items.reduce(
    (total, livre) => total + livre.quantite,
    0
  );

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        MBF
      </Link>

      <nav className="main-nav">
        <span className="nav-link "><Link to="/">Accueil</Link></span>

        <span className="nav-link "><Link to="/catalogue">Catalogue</Link></span>
        
        <span className="nav-link "><Link to="/categories">Catégories</Link></span>

        <a className="nav-link" href="#apropos">
          À propos
        </a>
      </nav>

      <div className="header-actions">
        <Link
          to="/panier"
          state={{ backgroundLocation: location }}
          className="cart-button"
        >
          🛒 Panier ({cartCount})
        </Link>
      </div>
    </header>
  );
}
