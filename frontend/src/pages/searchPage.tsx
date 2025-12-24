import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import SearchSummary from "../components/SearchSummary";
import FiltersPanel from "../components/FiltersPanel";
import ResultsGrid from "../components/ResultsGrid";
import Pagination from "../components/Pagination";
import { tokenize } from "../utils/SearchHelper";
import { sortProducts } from "../utils/dropdownhelper";
import "../assets/styles/searchPage.css";
import { useState } from "react";
import {
  filterByBrands,
  filterByPrice,
  filterBySizes,
  filterByColors,
  filterByRating,
} from "../utils/productFilters"


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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Number(params.get("page") ?? "1");

  let results = searchProducts(products.products, query);

  results = filterByBrands(results, selectedBrands);
  results = filterByPrice(results, price.min, price.max);
  results = filterBySizes(results, selectedSizes);
  results = filterByColors(results, selectedColors);
  results = filterByRating(results, selectedRating);

  results = sortProducts(results, sortOption);

    const hasResults = results.length > 0;
    const totalPages = Math.ceil(results.length / PAGE_SIZE);

    const start = (page - 1) * PAGE_SIZE;
    const paginatedResults = results.slice(start, start + PAGE_SIZE);

    function goToPage(newPage: number) {
      const next = new URLSearchParams(params);
      next.set("page", String(newPage));
      setParams(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleBrandChange(brandId: string) {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
    resetPage();
  }

  function handlePriceChange(type: "min" | "max", value: string) {
    setPrice((prev) => ({
      ...prev,
      [type]: value === "" ? null : Number(value),
    }));
    resetPage();
  }

  function handleSizeToggle(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
    resetPage();
  }

  function handleColorToggle(color: string) {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
    resetPage();
  }

  function resetPage() {
    const next = new URLSearchParams(params);
    next.set("page", "1");
    setParams(next);
  }

  return (
    <main className="srp">
      <SearchSummary query={query} count={results.length} />

      <div className="srp__content">
        <FiltersPanel
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}

          price={price}
          onPriceChange={handlePriceChange}

          selectedSizes={selectedSizes}
          onSizeToggle={handleSizeToggle}

          selectedColors={selectedColors}
          onColorToggle={handleColorToggle}

          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}

          products={products.products}/>

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
