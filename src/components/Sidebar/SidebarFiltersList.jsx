import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/slices/filterSlice';
import FilterItem from './FilterItem';
import { coupeIcon, platzkartIcon, sittingIcon, luxIcon, wifiIcon, expressIcon } from './icons';

const SidebarFiltersList = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters.filters);

  const handleToggle = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const items = [
    { key: 'haveSecondClass', title: 'Купе', icon: coupeIcon },
    { key: 'haveThirdClass', title: 'Плацкарт', icon: platzkartIcon },
    { key: 'haveFourthClass', title: 'Сидячий', icon: sittingIcon },
    { key: 'haveFirstClass', title: 'Люкс', icon: luxIcon },
    { key: 'haveWifi', title: 'Wi-Fi', icon: wifiIcon },
    { key: 'haveExpress', title: 'Экспресс', icon: expressIcon },
  ];

  return (
    <div className="sidebar__filters">
      <ul className="filters__list">
        {items.map(({ key, title, icon }) => (
          <FilterItem
            key={key}
            title={title}
            icon={icon}
            enabled={filters[key]}
            onToggle={(val) => handleToggle(key, val)}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarFiltersList;
