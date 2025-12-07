import { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options, value, onChange, style, placeholder = "Выберите значение" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const items = (options || []).map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );

  const selected = items.find(o => o.value === value);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={ref} className="custom-select" style={style}>
      <div
        className="custom-select__selected"
        onClick={() => setOpen(o => !o)}
      >
        {selected ? selected.label : placeholder}
      </div>
      {open && (
        <div className="custom-select__options">
          {items.map(opt => (
            <div
              key={opt.value}
              className={`custom-select__option ${opt.value === selected?.value ? "is-selected" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
