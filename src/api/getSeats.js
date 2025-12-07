export const getSeats = async (id, filters = {}) => {
  const baseUrl = 'https://students.netoservices.ru/fe-diplom/routes';
  const routeId = id;

  const rawFilters = {
    have_first_class: filters.have_first_class,
    have_second_class: filters.have_second_class,
    have_third_class: filters.have_third_class,
    have_fourth_class: filters.have_fourth_class,
    have_wifi: filters.have_wifi,
    have_air_conditioning: filters.have_air_conditioning,
    have_express: filters.is_express,
  };

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rawFilters)) {
    if (typeof value === 'boolean') {
      params.append(key, value);
    }
  }

  try {
    const response = await fetch(`${baseUrl}/${routeId}/seats?${params.toString()}`);
    if (!response.ok) throw new Error('Ошибка запроса мест');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении мест:', error);
    throw error;
  }
};
