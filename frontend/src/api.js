import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function generateTarget(payload) {
  const resp = await axios.post(`${API_BASE}/api/generate-target`, payload);
  return resp.data;
}
