import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import SearchSummary from "../components/SearchSummary";
import FiltersPanel from "../components/FiltersPanel";
import ResultsGrid from "../components/ResultsGrid";
import Pagination from "../components/Pagination";
import { tokenize } from "../utils/SearchHelper";
import { sortProducts } from "../utils/dropdownhelper";
import "../assets/styles/searchPage.css";

type SearchPageProps = {
  sortOption: string;
};

const PAGE_SIZE = 10;

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
export default function SearchPage({ sortOption }: SearchPageProps) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Number(params.get("page") ?? "1");

  const searchedResults = searchProducts(products.products, query);
  const sortedResults = sortProducts(searchedResults, sortOption);

  const hasResults = sortedResults.length > 0;
  const totalPages = Math.ceil(sortedResults.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const paginatedResults = sortedResults.slice(start, start + PAGE_SIZE);

  function goToPage(newPage: number) {
    const next = new URLSearchParams(params);
    next.set("page", String(newPage));
    setParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="srp">
      <SearchSummary query={query} count={sortedResults.length} />

      <div className="srp__content">
        <FiltersPanel />

        {hasResults ? (
          <ResultsGrid products={paginatedResults} />
        ) : (
          <EmptyState query={query} />
        )}
      </div>

      {hasResults && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      )}
    </main>
  );
}
