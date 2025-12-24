import EmptyState from "../pages/searchPage";
import StarRating from "../components/starRating";
import type { Product } from "../types/Product";
import LibraryWishlistButton from "./wishlist";
import "../assets/styles/results.css";

type ResultsGridProps = {
  products: Product[];
};

export default function ResultsGrid({ products }: ResultsGridProps) {
  if (products.length === 0) {
    return <EmptyState sortOption={""} />;
  }

  return (
    <section className="srp-results">
      <ul className="results-grid">
        {products.map((product) => (
          <li key={product.id} className="results-card">
            <img src={product.images?.[0]} alt={product.name} loading="lazy" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <span>
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </span>
            <p style={{ fontSize: 8 }}>
              Wishlist {<LibraryWishlistButton product={product} />}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
