import { useState, useEffect } from 'react';

const ReviewsSlider = ({
  reviews, reviewsPerSlide = 2, minSlides = 5, intervalTime = 5000 }) => {
  const slides = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide));
  }

  const repeatCount = Math.ceil(minSlides / slides.length);
  const repeatedSlides = Array(repeatCount).fill(slides).flat();

  const [current, setCurrent] = useState(0);
  const total = repeatedSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [total, intervalTime]);

  return (
    <div className="slider">
      <div className="slider__reviews">
        {repeatedSlides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === current ? 'slide--active' : ''}`}
          >
            {slide.map((review, idx) => (
              <div key={idx} className="review">
                <img src={review.photo} alt={review.name} className="review__img" />
                <div className="review__content">
                  <h3 className="review__title">{review.name}</h3>
                  <p className="review__text">“{review.text}”</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="slider__dots">
        {repeatedSlides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === current ? 'dot__active' : ''}`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSlider;
