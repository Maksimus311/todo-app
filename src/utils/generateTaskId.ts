export const generateTaskId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const xx = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
  const numbers = Math.floor(Math.random() * 9) + 1; // 1-9
  return `${xx}-${numbers}`;
};
