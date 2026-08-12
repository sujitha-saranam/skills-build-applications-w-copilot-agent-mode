import { useEffect, useState } from 'react';
import { fetchJson, normalizeListResponse } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson('/users')
      .then((data) => setUsers(normalizeListResponse(data)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="container py-5">
      <h1>Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {users.map((u) => (
          <li className="list-group-item" key={u._id || u.id}>
            <strong>{u.username}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
