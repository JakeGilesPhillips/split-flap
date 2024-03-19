export const fetchSettings = async (name: string) => {
  return fetch("/api/settings", { headers: { 'Content-type': 'application/json' }, method: 'POST', body: JSON.stringify({ name }) });
}

export const fetchSettingsNew = async (name: string) => {
  return fetch("/api/settingsNew", { headers: { 'Content-type': 'application/json' }, method: 'POST', body: JSON.stringify({ name }) });
}

export const fetchAPIData = async (params?: any) => {
  return fetch("/api/schedule", { headers: { 'Content-type': 'application/json' }, method: 'POST', body: JSON.stringify({ params }) });
}

export const ParseJson = async (res: Response) => {
  return await res.json();
}