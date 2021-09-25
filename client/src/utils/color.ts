export const generateColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = [];
  for (let i = 0; i < 6; i++) {
    color.push(letters[Math.floor(Math.random() * 16)]);
  }
  return "#" + color.join("");
};

export const validateColor = (color: string): boolean => {
  if (color[0] !== "#" || color.length !== 7) return false;
  const letters = new Set("0123456789ABCDEF".split(""));
  for (let i = 1; i < 7; i++) {
    if (!letters.has(color[i].toUpperCase())) return false;
  }
  return true;
};

export const getColorName = (hsl: number[]): string => {
  const [h, s, l] = hsl;
  if (s <= 10 && l >= 90) {
    return "white";
  } else if ((s <= 10 && l <= 70) || s === 0) {
    return "gray";
  } else if (l <= 13) {
    return "black";
  } else if ((h >= 0 && h <= 13) || h >= 341) {
    return "red";
  } else if (h >= 14 && h <= 35) {
    return "orange";
  } else if (h >= 36 && h <= 64) {
    return "yellow";
  } else if (h >= 65 && h <= 169) {
    return "green";
  } else if (h >= 170 && h <= 254) {
    return "blue";
  } else if (h >= 255 && h <= 290) {
    return "purple";
  } else if (h >= 291 && h <= 340) {
    return "pink";
  }
};
