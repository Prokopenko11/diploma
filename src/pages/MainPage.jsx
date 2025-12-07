import TripSearch from '../components/TripSearch';
import HeaderNavigation from '../components/HeaderNavigation';
import Footer from '../components/Footer';
import LoadingBar from '../components/Loading/LoadingBar';
import ReviewsSlider from '../components/ReviewsSlider';

import monitor from '../images/monitor.png';
import building from '../images/building.png';
import globus from '../images/globus.png';
import reviewPhoto1 from '../images/review-photo_1.png';
import reviewPhoto2 from '../images/review-photo_2.png';

const MainPage = () => {
  const reviews = [
    {
      photo: reviewPhoto1,
      name: 'Екатерина Вальнова',
      text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
    },
    {
      photo: reviewPhoto2,
      name: 'Евгений Стрыкало',
      text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
    },
    {
      photo: reviewPhoto2,
      name: 'Евгений Стрыкало',
      text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
    },
    {
      photo: reviewPhoto1,
      name: 'Екатерина Вальнова',
      text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
    },
    {
      photo: reviewPhoto1,
      name: 'Екатерина Вальнова',
      text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
    },
    {
      photo: reviewPhoto2,
      name: 'Евгений Стрыкало',
      text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
    },
    {
      photo: reviewPhoto2,
      name: 'Евгений Стрыкало',
      text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
    },
    {
      photo: reviewPhoto1,
      name: 'Екатерина Вальнова',
      text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
    },
    {
      photo: reviewPhoto1,
      name: 'Екатерина Вальнова',
      text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
    },
    {
      photo: reviewPhoto2,
      name: 'Евгений Стрыкало',
      text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
    },
  ];

  const repeat = Math.ceil(reviews.length / 2);

  return (
    <>
      <header id="header" className="header">
        <div className="header__content">
          <HeaderNavigation />
          <div className="header__search-container">
            <h1 className="header__slogan">
              Вся жизнь - <br />
              <span className="header__slogan-highlight">путешествие!</span>
            </h1>
            <TripSearch />
          </div>
        </div>
        <LoadingBar />
      </header>
      <main className="content">
        <section id="about" className="about">
          <h1 className="about__title">о нас</h1>
          <div className="about__content">
            <p className="about__text">
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.
            </p>
            <p className="about__text">
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.
            </p>
            <p className="about__text about__text-highlight">
              Покупать жд билеты дешево можно за 90 суток до отправления поезда.
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
            </p>
          </div>
        </section>
        <section id="how" className="how">
          <div className="how__header">
            <h1 className="how__title">Как это работает</h1>
            <button className="how__button">Узнать больше</button>
          </div>
          <div className="how__advantages">
            <div className="advantage">
              <img src={monitor} alt="monitor" className="advantage__img" />
              <p className="advantage__text">Удобный заказ на сайте</p>
            </div>
            <div className="advantage">
              <img src={building} alt="building" className="advantage__img" />
              <p className="advantage__text">Нет необходимости ехать в офис</p>
            </div>
            <div className="advantage">
              <img src={globus} alt="globus" className="advantage__img" />
              <p className="advantage__text">Огромный выбор направлений</p>
            </div>
          </div>
        </section>
        <section id="reviews" className="reviews">
          <h1 className="reviews__title">Отзывы</h1>
          <ReviewsSlider reviews={reviews} repeat={repeat}/>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
