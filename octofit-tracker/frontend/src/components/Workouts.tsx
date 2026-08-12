import { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson('/workouts')
      .then((data) => setWorkouts(normalizeListResponse(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="container py-5">
      <h1>Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {workouts.map((w) => (
          <li className="list-group-item" key={w._id || w.id}>
            <strong>{w.name}</strong> — {w.difficulty} — {w.durationMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}
