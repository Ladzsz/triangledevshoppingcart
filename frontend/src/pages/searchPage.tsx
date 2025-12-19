import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import SearchSummary from "../components/SearchSummary";
import FiltersPanel from "../components/FiltersPanel";
import ResultsGrid from "../components/ResultsGrid";
import Pagination from "../components/Pagination";
import { tokenize } from "../utils/SearchHelper";

//function to display no results
export function EmptyState({ query }: { query?: string }) {
  return (
    <section className="srp-empty">
      <h2>No results found</h2>
      {query ? (
        <p>
          We couldn’t find anything matching <strong>“{query}”</strong>.
        </p>
      ) : (
        <p>No products available.</p>
      )}
    </section>
  );
}

//function to return search results
export function searchProducts(products: any[], query: string) {
  if (!query) return products;

  const queryTokens = tokenize(query);

  return products.filter((product) => {
    const haystackTokens = tokenize(
      [
        product.name,
        product.description,
        product.categoryId,
        product.brandId,
        product.gender,
        ...(product.keywords ?? []),
        ...(product.tags ?? []),
      ].join(" ")
    );

    return queryTokens.some((token) => haystackTokens.includes(token));
  });
}

//function to render the search page
export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const results = searchProducts(products.products, query);
  const hasResults = results.length > 0;

  return (
    <main className="srp">
      <SearchSummary query={query} count={results.length} />

      <div className="srp__content">
        <FiltersPanel />

        {hasResults ? (
          <ResultsGrid products={results} />
        ) : (
          <EmptyState query={query} />
        )}
      </div>

      {hasResults && <Pagination />}
    </main>
  );
}
