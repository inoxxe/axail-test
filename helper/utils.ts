export function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  for (let stopI = 0; stopI <= k; stopI++) {
    const currPrices = Array.from(prices);
    for (const [flightFrom, flightTo, flightPrice] of flights) {
      const newPrice = prices[flightFrom] + flightPrice;
      if (newPrice < currPrices[flightTo]) {
        currPrices[flightTo] = newPrice;
      }
    }
    prices = currPrices;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}
