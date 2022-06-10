export const billers = ['Netflix', 'Hulu', 'Spotify', 'Apple Music', 'Amazon Prime', 'Birchbox', 'Disney+']
export const daysOrdinal = Array.from(Array(31).keys()).map(n => {
  let s = ["th", "st", "nd", "rd"];
  let v = (n + 1) % 100;
  let ordinal = (n + 1) + (s[(v - 20) % 10] || s[v] || s[0]);

  return `${ordinal} of the month`;
})