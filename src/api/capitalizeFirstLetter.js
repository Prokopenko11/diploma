export const capitalizeFirstLetter = (str) => {
  return str
    .split(/(-|\s+)/)
    .map(part => {
      if (part === '-' || part.trim() === '') {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
}