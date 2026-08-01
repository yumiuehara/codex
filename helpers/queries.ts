export async function getLogs(year?: string, type?: number, mediaStatus?: string) {
  const url = new URL('https://codex-api.yumi.dev.br/api/logs');

  if (year) url.searchParams.set('year', year);
  if (type) url.searchParams.set('type', String(type));
  if (mediaStatus) url.searchParams.set('mediaStatus', mediaStatus);

  const res = await fetch(url);
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