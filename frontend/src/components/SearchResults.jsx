import ResultCard from "./ResultCard";
import { Search } from "lucide-react";

function SearchResults({ results, query }) {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-60 gap-3 text-center">
        <Search size={20} className="text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No results found</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try rephrasing your query for "{query}".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {results.map((result, index) => (
        <ResultCard key={result.rank ?? index} result={result} index={index} />
      ))}

      <div className="pt-2 pb-4 text-center">
        <p className="text-[11px] font-mono text-muted-foreground/60">
          End of results · {results.length} passages retrieved
        </p>
      </div>
    </div>
  );
}

export default SearchResults;
