export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function predict(file, signal) {
  const body = new FormData();
  body.append("file", file);

  let res;
  try {
    res = await fetch(`${API_URL}/predict`, { method: "POST", body, signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error(
      `Cannot reach the AI server at ${API_URL}. Check that the backend is running and allows CORS.`
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // response was not JSON; handled below
  }

  if (!res.ok || !data?.success) {
    throw new Error(data?.error || data?.detail || `Server returned status ${res.status}.`);
  }
  if (!data.predicted_class || !Number.isFinite(Number(data.confidence))) {
    throw new Error("Unexpected response from the AI server (missing class or confidence).");
  }
  return data;
}

// "Reachable" means the server answered at all (any status).
export async function checkServer(signal) {
  try {
    await fetch(API_URL, { signal });
    return true;
  } catch {
    return false;
  }
}