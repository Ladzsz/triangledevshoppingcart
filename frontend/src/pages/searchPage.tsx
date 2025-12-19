import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import SearchSummary from "../components/SearchSummary";
import FiltersPanel from "../components/FiltersPanel";
import ResultsGrid from "../components/ResultsGrid";
import Pagination from "../components/Pagination";

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

//helper function to Normalizes text for search comparison.
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

//helper function to Converts simple English plurals to their singular form.
function singularize(word: string) {
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("ses")) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);
  return word;
}

//function to Tokenize text into normalized, singularized search terms.
function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .map(singularize);
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
        ...(product.keywords ?? []),
        ...(product.tags ?? [])
      ].join(" ")
    );

    return queryTokens.every((token) =>
      haystackTokens.some((h) => h.includes(token))
    );
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
