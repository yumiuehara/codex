export async function getLogs(year?: string, type?: number) {
  let path = 'https://codex-api.yumi.dev.br/api/logs?year=' + year

  if (type) {
    path += '&type=' + type
  }

  const res = await fetch(path);
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function getMediaById(id: string) {
  const res = await fetch('https://codex-api.yumi.dev.br/api/media/' + id);
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function getTotals(year: string) {
  const res = await fetch('https://codex-api.yumi.dev.br/api/totals?year=' + year);
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function getYears() {
  const res = await fetch('https://codex-api.yumi.dev.br/api/years');
  if (!res.ok) throw new Error('Error');
  return res.json();
}