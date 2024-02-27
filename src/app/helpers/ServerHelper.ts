export const fetchSettings = async (name: string) => {
  return fetch("/api/settings", { headers: { 'Content-type': 'application/json' }, method: 'POST', body: JSON.stringify({ name }) });
}

export const ParseJson = async (res: Response) => {
  return await res.json();
}