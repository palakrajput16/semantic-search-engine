import { useState } from "react";
import "./styles/App.css";

import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

import { searchDocuments } from "./services/api";
import { Layers, Moon, Sun, AlertCircle, Loader2, Search } from "lucide-react";

import UploadBox from "./components/UploadBox";

function App() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // "idle" | "loading" | "results" | "error" — derived, not stored separately
  const hasSearched = loading || error || query;

  const handleSearch = async (q) => {
    setQuery(q);
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await searchDocuments(q);
      setResults(data.results);
    } catch (err) {
      setError("Unable to connect to the search server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-5 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shrink-0">
                <Layers size={12} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Semantic Search
              </span>
            </div>

            <button
              onClick={() => setDark(!dark)}
              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </header>

        {/* Search bar */}
        <div className="border-b border-border bg-background">
          <div className="max-w-5xl mx-auto px-5 py-5">
            <SearchBar onSearch={handleSearch} loading={loading} />

            {!loading && !error && results.length > 0 && (
              <div className="mt-2.5">
                <p className="text-[11px] font-mono text-muted-foreground">
                  <span className="text-foreground font-medium">{results.length}</span>{" "}
                  results for <span className="text-foreground">"{query}"</span>
                  <span className="text-muted-foreground/60 ml-2">
                    · ranked by semantic similarity
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-5 pt-4">
            <UploadBox />
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-5 py-6">
          {/* Idle / empty state */}
          {!hasSearched && (
            <div className="flex flex-col items-center justify-center min-h-60 text-center px-4">
              <div className="w-11 h-11 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Search across your documents
              </p>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Ask anything in natural language. Results are ranked by
                conceptual similarity, not keyword overlap.
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-60 gap-3">
              <Loader2 size={32} className="text-primary animate-spin" />
              <p className="text-xs text-muted-foreground font-mono">
                Computing semantic similarity…
              </p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center min-h-60 gap-4 text-center px-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle size={18} className="text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">Search failed</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">{error}</p>
              </div>
              <button
                onClick={() => handleSearch(query)}
                className="text-xs px-4 py-2 rounded-md border border-border hover:bg-accent transition-colors font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && !error && query && (
            <SearchResults results={results} query={query} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
