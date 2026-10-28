
const API_URL = "http://flt1.local/bibliothique-api";

export async function getBooks() {
  const response = await fetch(`${API_URL}/API_Books.php`);

  if (!response.ok) {
    throw new Error("Impossible de charger les livres.");
  }

  const data = await response.json();

  return data.map((book) => ({
    id: Number(book.idBook),
    title: book.title,
    author: book.Auteur,
    price: Number(book.prix),
    categoryId: Number(book.idCategory),
    image: book.image,
    details: book.details,
    stock: Number(book.stock),
  }));
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/API_Category.php`);

  if (!response.ok) {
    throw new Error("Impossible de charger les catégories.");
  }

  return response.json();
}
