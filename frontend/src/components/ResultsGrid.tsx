import EmptyState from "../pages/searchPage";

type Product = {
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
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
