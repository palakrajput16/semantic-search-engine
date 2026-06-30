import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k: 5 })
    });
    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '60px auto', fontFamily: 'Arial' }}>
      <h1>Semantic Search</h1>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search by meaning, not just keywords...'
        style={{ width: '100%', padding: 10, fontSize: 14 }}
      />
      <button onClick={search} disabled={loading} style={{ marginTop: 10, padding: '8px 20px' }}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {results.map(r => (
        <div key={r.rank} style={{ marginTop: 20, padding: 15, border: '1px solid #ddd' }}>
          <strong>{r.title}</strong> — similarity: {r.similarity}
          <p style={{ color: '#555', fontSize: 13 }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}
