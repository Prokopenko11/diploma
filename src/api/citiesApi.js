export const getCitiesByName = async (query = '') => {
  try {
    const res = await fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${query}`);
    if (!res.ok) throw new Error('Ошибка при получении городов');
    return await res.json();
  } catch (err) {
    console.error('Ошибка API getCitiesByName:', err);
    return [];
  }
};
