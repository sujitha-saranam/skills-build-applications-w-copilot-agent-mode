import { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson('/teams')
      .then((data) => setTeams(normalizeListResponse(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="container py-5">
      <h1>Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {teams.map((t) => (
          <li className="list-group-item" key={t._id || t.id}>
            <strong>{t.name}</strong> — {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
