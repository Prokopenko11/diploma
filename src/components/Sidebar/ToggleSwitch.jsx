const ToggleSwitch = ({ enabled, onToggle }) => {

  return (
    <div
      className={`toggle-switch ${enabled ? 'enabled' : ''}`}
      onClick={() => onToggle(!enabled)}
    >
      <div className="toggle-knob"></div>
    </div>
  );
};

export default ToggleSwitch;
