import ReactSlider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/slices/filterSlice';

const PriceFilter = () => {
  const dispatch = useDispatch();
  const { priceFrom, priceTo } = useSelector(state => state.filters.filters);
  const { min, max } = useSelector(state => state.filters.availablePriceRange);

  const handleAfterChange = (value) => {
    dispatch(updateFilter({ key: 'priceFrom', value: value[0] }));
    dispatch(updateFilter({ key: 'priceTo', value: value[1] }));
  };

  const shouldHideMax = (priceTo / (max || 1)) > 0.9;

  const range = max - min;
  const shouldHideMin = range > 0 ? (priceFrom - min) / range < 0.05 : false;

  return (
    <div className="price-filter">
      <div className="price-filter__boarders">
        <span className="price-filter__boarder">от</span>
        <span className="price-filter__boarder">до</span>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        min={min ?? 0}
        max={max ?? 10000}
        value={[priceFrom, priceTo]}
        onChange={() => { }}
        onAfterChange={handleAfterChange}
        minDistance={100}
        pearling
        renderTrack={(props, state) => {
          const { key, ...restProps } = props;
          const classNames = ['track-before', 'track-active', 'track-after'];
          return <div key={key} {...restProps} className={classNames[state.index]} />;
        }}
        renderThumb={(props, state) => {
          const { key, ...restProps } = props;
          return (
            <div key={key} {...restProps} className="thumb">
              <div className="thumb-label">{state.valueNow}</div>
            </div>
          );
        }}
      />
      <div className="filter__labels">
        {!shouldHideMin && <span className="filter__label filter__label-min">{min}</span>}
        {!shouldHideMax && <span className="filter__label">{max}</span>}
      </div>
    </div>
  );
};

export default PriceFilter;
