// Accepts 0-1 ratios or 0-100 percentages and returns 0-100.
export function toPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return n <= 1 ? n * 100 : n;
}

export function toRatio(value) {
  return toPercent(value) / 100;
}

export function formatPercent(value, digits = 1) {
  return `${toPercent(value).toFixed(digits)}%`;
}

// Accepts data:/http(s):/blob: URLs or a bare base64 string.
export function imageSrc(src) {
  if (!src) return null;
  if (/^(data:|https?:|blob:)/.test(src)) return src;
  return `data:image/png;base64,${src}`;
}

export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}