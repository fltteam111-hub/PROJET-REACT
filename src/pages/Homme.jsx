
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Homme.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "VOTRE LIBRAIRIE, VOTRE UNIVERS",
    title: "Un livre,",
    accent: "mille mondes.",
    description:
      "Explorez des histoires fascinantes et laissez-vous emporter par la magie des mots.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "L'INSPIRATION À CHAQUE PAGE",
    title: "Ouvrez un livre,",
    accent: "ouvrez l'esprit.",
    description:
      "Des idées inspirantes, des histoires passionnantes et des découvertes infinies.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "LE PLAISIR DE LIRE AUTREMENT",
    title: "Trouvez votre",
    accent: "prochaine histoire.",
    description:
      "Romans, nouveautés et pépites littéraires : votre prochaine lecture vous attend.",
  },
];

const categories = [
  { icon: "✦", name: "Romans" },
  { icon: "✧", name: "Science-fiction" },
  { icon: "❋", name: "Développement personnel" },
  { icon: "⌘", name: "Histoire" },
];

const books = [
  {
    id: 1,
    title: "L'art de la simplicité",
    author: "Dominique Loreau",
    price: 89,
    category: "Développement personnel",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    title: "Les mots du bonheur",
    author: "Sélection littéraire",
    price: 75,
    category: "Romans",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    title: "Au-delà des étoiles",
    author: "Collection Imaginaire",
    price: 110,
    category: "Science-fiction",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=700&q=85",
  },
];

function BookCard({ book, onAdd }) {
  return (
    <article className="book-card">
      <a
        className="book-image"
        href="#apropos"
        aria-label={`Découvrir ${book.title}`}
      >
        <img src={book.image} alt={book.title} loading="lazy" />
        <span className="book-tag">{book.category}</span>
      </a>

      <div className="book-info">
        <span className="book-author">{book.author}</span>
        <span className="book-title">{book.title}</span>

        <div className="book-bottom">
          <strong>{book.price} DH</strong>
          <button
            type="button"
            className="book-view"
            onClick={() => onAdd(book)}
            aria-label={`Ajouter ${book.title} au panier`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Homme() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Toutes" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function addToCart(book) {
    setCart((current) => {
      const existing = current.find((item) => item.id === book.id);

      if (existing) {
        return current.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...book, quantity: 1 }];
    });

    setMessage(`« ${book.title} » ajouté au panier !`);

    window.setTimeout(() => setMessage(""), 2500);
  }

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="home-page">
      <main>
        <section className="hero" id="accueil">
          {slides.map((item, index) => (
            <div
              key={item.image}
              className={`hero-background ${
                activeSlide === index ? "visible" : ""
              }`}
              style={{ backgroundImage: `url("${item.image}")` }}
              aria-hidden="true"
            />
          ))}

          <div className="hero-overlay" />

          <div className="hero-content" key={activeSlide}>
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              {slide.eyebrow}
            </div>

            <h1>
              {slide.title}
              <br />
              <span>{slide.accent}</span>
            </h1>

            <p className="hero-description">
              {slide.description}
            </p>

            <div className="hero-buttons">
              <Link to="/catalogue" className="button-primary">
                Explorer le catalogue <span>↗</span>
              </Link>

              <a href="#selection" className="button-secondary">
                Nos coups de cœur <span>↓</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-star">✳</span>
              Des livres choisis avec passion, pour vous.
            </div>
          </div>

          <div className="slider-controls">
            <div className="slide-count">
              <span>0{activeSlide + 1}</span>
              <span className="count-divider">/</span>
              <span className="count-total">
                0{slides.length}
              </span>
            </div>

            <div className="slider-progress">
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  className={`progress-item ${
                    activeSlide === index ? "selected" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Afficher la diapositive ${index + 1}`}
                >
                  <span />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="next-slide"
              onClick={() =>
                setActiveSlide(
                  (current) => (current + 1) % slides.length
                )
              }
              aria-label="Image suivante"
            >
              →
            </button>
          </div>

          <div className="hero-side-label">
            L'ART DE LIRE AUTREMENT
          </div>
        </section>
      </main>
    </div>
  );
}
