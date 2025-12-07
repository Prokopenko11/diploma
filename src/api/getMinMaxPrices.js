export const extractPricesFromRoute = (item) => {
  const prices = [];

  const info = item.departure.price_info || {};

  if (info.first) {
    if (info.first.price) prices.push(info.first.price);
    if (info.first.top_price) prices.push(info.first.top_price);
    if (info.first.bottom_price) prices.push(info.first.bottom_price);
  }

  if (info.second) {
    if (info.second.top_price) prices.push(info.second.top_price);
    if (info.second.bottom_price) prices.push(info.second.bottom_price);
  }

  if (info.third) {
    if (info.third.top_price) prices.push(info.third.top_price);
    if (info.third.bottom_price) prices.push(info.third.bottom_price);
    if (info.third.side_price) prices.push(info.third.side_price);
  }

  if (info.fourth) {
    if (info.fourth.top_price) prices.push(info.fourth.top_price);
    if (info.fourth.bottom_price) prices.push(info.fourth.bottom_price);
  }

  return prices.filter(price => typeof price === 'number' && !isNaN(price));
};

export const getMinMaxPrices = (items) => {
  const allPrices = items.flatMap(extractPricesFromRoute);

  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);

  return { min, max };
};

export const getMinPricesByClass = (departure) => {
  const result = {};
  const priceInfo = departure.price_info;

  if (!priceInfo) return result;

  const classKeys = ['first', 'second', 'third', 'fourth'];

  classKeys.forEach((classKey) => {
    const classPrices = priceInfo[classKey];
    if (classPrices) {
      const prices = Object.values(classPrices).filter(
        (p) => typeof p === 'number' && !isNaN(p)
      );
      if (prices.length > 0) {
        result[classKey] = Math.min(...prices);
      }
    }
  });

  return result;
};

