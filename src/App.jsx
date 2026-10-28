
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Homme from "./pages/Homme";
import Header from "./components/Header";
import Books from "./components/books";
import Category from "./components/categories";
import Panier from "./components/Panier";

import "./redux/App.css";

function AppContent() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className="librairie">
      <Header />

      {/* Afficher la page précédente en arrière-plan */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Homme />} />
        <Route path="/catalogue" element={<Books />} />
        <Route path="/categories" element={<Category />} />
      </Routes>

      {/* Afficher le panier par-dessus la page actuelle */}
      {backgroundLocation && (
        <Routes>
          <Route path="/panier" element={<Panier />} />
        </Routes>
      )}

      {/* Permettre aussi l'accès direct à /panier */}
      {!backgroundLocation && location.pathname === "/panier" && (
        <Panier />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
