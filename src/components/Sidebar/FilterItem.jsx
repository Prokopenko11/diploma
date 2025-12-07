import ToggleSwitch from './ToggleSwitch';

const FilterItem = ({ title, icon, enabled, onToggle }) => (
  <li className="filters__item">
    <div className="filters__item-content">
      {icon}
      <h3 className="filters__item-title">{title}</h3>
    </div>
    <ToggleSwitch enabled={enabled} onToggle={onToggle} />
  </li>
);

export default FilterItem;
