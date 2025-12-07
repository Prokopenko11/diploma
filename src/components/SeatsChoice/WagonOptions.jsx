import { airConditioningIcon, wifiIcon, linensIcon, coffeeIcon } from './icons';

const WagonOptions = ({ coach, selectedOptions = {}, onToggleOption = () => { } }) => {
  const getClassName = (isAvailable, isIncluded, isSelected) => {
    if (!isAvailable) {
      return 'option option__disabled'
    }

    if (isIncluded) {
      return 'option option__included'
    }

    if (isSelected) {
      return 'option option__selected'
    }

    return 'option option__unselected';
  };

  const handleClick = (key, isAvailable, isIncluded) => {
    if (!isAvailable || isIncluded) return;
    onToggleOption(key);
  };

  return (
    <div className="wagon-options">
      {coach.have_air_conditioning && (
        <div className="wagon-option">
          <div
            className={getClassName(true, false, selectedOptions.ac)}
            onClick={() => handleClick('ac', true, false)}
          >
            {airConditioningIcon}
          </div>
          <div className="wagon-option__tooltip">кондиционер</div>
        </div>
      )}
      {coach.have_wifi && (
        <div className="wagon-option">
          <div
            className={getClassName(true, coach.wifi_price === 0, selectedOptions.wifi)}
            onClick={() => handleClick('wifi', true, coach.wifi_price === 0)}
          >
            {wifiIcon}
          </div>
          <div className="wagon-option__tooltip">WI-FI</div>
        </div>
      )}
      {coach.is_linens_included || coach.linens_price > 0 ? (
        <div className="wagon-option">
          <div
            className={getClassName(
              true,
              coach.linens_price === 0 || coach.is_linens_included,
              selectedOptions.linens
            )}
            onClick={() =>
              handleClick(
                'linens',
                true,
                coach.linens_price === 0 || coach.is_linens_included
              )
            }
          >
            {linensIcon}
          </div>
          <div className="wagon-option__tooltip">белье</div>
        </div>
      ) : null}
      <div className="wagon-option">
        <div className="option option__included">{coffeeIcon}</div>
        <div className="wagon-option__tooltip">питание</div>
      </div>
    </div>
  );
};

export default WagonOptions;