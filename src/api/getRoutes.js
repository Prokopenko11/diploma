export const getRoutes = async ({
  fromCity,
  toCity,
  departureDate,
  returnDate,
  filters = {},
  limit = 5,
}) => {
  try {
    const getCityId = async (name) => {
      const res = await fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${name}`);
      const cities = await res.json();
      return cities?.[0]?._id || null;
    };

    const fromCityId = await getCityId(fromCity);
    const toCityId = await getCityId(toCity);

    if (!fromCityId || !toCityId) throw new Error("Город(а) не найдены");

    const FILTER_KEY_MAP = {
      haveExpress: 'is_express',
      haveFirstClass: 'have_first_class',
      haveSecondClass: 'have_second_class',
      haveThirdClass: 'have_third_class',
      haveFourthClass: 'have_fourth_class',
      haveWifi: 'have_wifi',
      haveAirConditioning: 'have_air_conditioning',
      priceFrom: 'price_from',
      priceTo: 'price_to',
    };

    const transformedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      const mappedKey = FILTER_KEY_MAP[key];
      if (!mappedKey) return acc;
      if (
        value === true ||
        typeof value === 'number' ||
        (typeof value === 'string' && value.trim() !== '')
      ) {
        acc[mappedKey] = value;
      }
      return acc;
    }, {});

    const timeFilters = filters.time || {};
    const timeFilterMap = {
      departure: ['start_departure_hour_from', 'start_departure_hour_to'],
      arrival: ['start_arrival_hour_from', 'start_arrival_hour_to'],
      returnDeparture: ['end_departure_hour_from', 'end_departure_hour_to'],
      returnArrival: ['end_arrival_hour_from', 'end_arrival_hour_to'],
    };

    Object.entries(timeFilterMap).forEach(([key, [fromKey, toKey]]) => {
      const timeRange = timeFilters[key];
      if (timeRange) {
        const fromHour = Math.floor(timeRange.from / 60);
        const toHour = Math.ceil(timeRange.to / 60);
        transformedFilters[fromKey] = fromHour;
        transformedFilters[toKey] = toHour;
      }
    });

    const params = new URLSearchParams({
      from_city_id: fromCityId,
      to_city_id: toCityId,
      ...(departureDate && { date_start: departureDate }),
      ...(returnDate && { date_end: returnDate }),
      limit: limit.toString(),
      ...transformedFilters,
    });

    const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes?${params.toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении маршрутов:", error);
    return [];
  }
};
