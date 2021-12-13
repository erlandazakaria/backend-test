export const generateRandom4 = () => {
  let minm = 1000;
  let maxm = 9999;
  return String(Math.floor(Math.random() * (maxm - minm + 1)) + minm);
}
