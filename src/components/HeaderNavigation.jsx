import { useLocation } from 'react-router-dom';

const HeaderNavigation = () => {
  const { pathname } = useLocation();
  const isNotMainPage = pathname !== '/';

  return (
    <>
      <h1 className={`header__logo logo ${isNotMainPage ? 'logo__tickets-page' : ''}`}>Лого</h1>
      <nav className={`header__nav ${isNotMainPage ? 'tickets-page__nav' : ''}`}>
        <ul className="header__nav-list">
          <li className="header__nav-item"><a href="#about" className="nav-item__link">О нас</a></li>
          <li className="header__nav-item"><a href="#how" className="nav-item__link">Как это работает</a></li>
          <li className="header__nav-item"><a href="#reviews" className="nav-item__link">Отзывы</a></li>
          <li className="header__nav-item"><a href="#footer" className="nav-item__link">Контакты</a></li>
        </ul>
      </nav>
    </>
  )
}

export default HeaderNavigation;