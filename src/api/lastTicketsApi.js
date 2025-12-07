export const getLastTickets = async () => {
  const response = await fetch('https://students.netoservices.ru/fe-diplom/routes/last');
  if (!response.ok) throw new Error('Не удалось получить последние билеты');
  return response.json();
};
