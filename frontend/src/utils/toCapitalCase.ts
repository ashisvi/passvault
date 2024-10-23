export const toCapitalCase = (str: string | undefined) => {
  if (!str) return;

  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
