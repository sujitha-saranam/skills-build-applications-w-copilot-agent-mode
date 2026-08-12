import { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson('/activities')
      .then((data) => setActivities(normalizeListResponse(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="container py-5">
      <h1>Activities</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {activities.map((a) => (
          <li className="list-group-item" key={a._id || a.id}>
            <strong>{a.type}</strong> — {a.durationMinutes} min — {a.caloriesBurned} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
