import { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson('/leaderboard')
      .then((data) => setEntries(normalizeListResponse(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="container py-5">
      <h1>Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((e) => (
          <li className="list-group-item" key={e._id || e.id}>
            <strong>{e.title}</strong> — {e.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
