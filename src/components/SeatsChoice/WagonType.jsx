import { seatIcon, thirdIcon, secondIcon, firstIcon } from './icons';

const WagonType = ({ coaches, activeType, onSelect }) => {
  const typeMap = {
    fourth: { title: 'Сидячий', icon: seatIcon },
    third: { title: 'Плацкарт', icon: thirdIcon },
    second: { title: 'Купе', icon: secondIcon },
    first: { title: 'Люкс', icon: firstIcon },
  };

  const availableTypes = [...new Set(coaches.map(item => item.coach.class_type))];
  const typeOrder = ['fourth', 'third', 'second', 'first'];

  return (
    <div className="wagon-types">
      <h2 className="wagon-types__title">Тип вагона</h2>
      <div className="wagon-types__wrapper">
        {typeOrder
          .filter(type => availableTypes.includes(type))
          .map(type => {
            const { title, icon } = typeMap[type];
            return (
              <button
                key={type}
                className={`wagon-type ${type === activeType ? 'active' : ''}`}
                onClick={() => onSelect(type)}
              >
                {icon}
                <span className="wagon-type__title">{title}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default WagonType;
