import EmptyState from "../pages/searchPage";

type Product = {
  images: string[];
  id: number;
  name: string;
  description: string;
};

type ResultsGridProps = {
  products: Product[];
};

export default function ResultsGrid({ products }: ResultsGridProps) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="srp-results">
      <ul className="results-grid">
        {products.map((product) => (
          <li key={product.id} className="results-card">
            <img src={product.images?.[0]} alt={product.name} loading="lazy" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
