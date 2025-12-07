export const convertDuration = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    hours -= days * 24;

    return (
      <>
        <span>{`${days} дн.`}</span>
        <br />
        <span>{`${hours} ч. ${minutes.toString().padStart(2, '0')} м.`}</span>
      </>
    );
  }

  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const convertDateTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  return time
};

export const convertDate = (seconds) => {
  const date = new Date(seconds * 1000);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });

  return formattedDate;
};
