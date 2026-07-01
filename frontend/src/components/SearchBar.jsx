import { useState } from "react";
import { Search, X, CornerDownLeft } from "lucide-react";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  const clearSearch = () => setQuery("");

  return (
    <form onSubmit={handleSubmit} className="relative group max-w-2xl">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search your documents with natural language…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 pl-10 pr-28 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
      />
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Clear"
          >
            <X size={12} />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 hover:text-foreground hover:border-foreground/20 disabled:opacity-30 transition-colors select-none"
        >
          <CornerDownLeft size={10} />
          enter
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
