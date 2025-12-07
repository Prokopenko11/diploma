const SidebarDirection = ({ title, icon, isOpen, onToggle, children, date }) => {
  const panelId = `panel-${title}`;

  return (
    <div className="sidebar__direction-full">
      <div className="sidebar__direction">
        <div className="direction__wrapper">
          {icon}
          <h2 className="direction__title">{title}</h2>
          {date && <p className="directiom-content__date white">{date}</p>}
        </div>
        <button
          className={`direction__add-button ${isOpen ? "active" : ""}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          {isOpen ? (
            <svg className="add-button__icon add-button__icon-minus" width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.61523" y1="1.76929" x2="10.3845" y2="1.76929" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="add-button__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.22204 1.20293L6.22204 6.18841L1.23656 6.18841C0.772797 6.18841 0.424973 6.53623 0.424973 7C0.424973 7.46377 0.772797 7.81159 1.23656 7.81159L6.22204 7.81159L6.22204 12.7971C6.22204 13.2608 6.56987 13.6087 6.97566 13.5507L7.0916 13.5507C7.55537 13.5507 7.90319 13.2029 7.84522 12.7971V7.81159H12.7148C13.1785 7.81159 13.5264 7.46377 13.5264 7C13.5264 6.53623 13.1785 6.18841 12.7148 6.18841H7.84522V1.20293C7.84522 0.739165 7.4974 0.391341 7.0916 0.449311L6.97566 0.449311C6.5119 0.449311 6.16407 0.797136 6.22204 1.20293Z" />
            </svg>
          )}
        </button>
      </div>
      <div
        id={panelId}
        className={`direction-full__wrapper ${
          isOpen ? "direction-full__wrapper-visible" : "direction-full__wrapper-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarDirection;
