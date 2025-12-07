import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeFilter } from '../../redux/slices/filterSlice';
import ReactSlider from 'react-slider';

const TimeFilter = ({ type }) => {
  const dispatch = useDispatch();
  const timeValue = useSelector(state => state.filters.filters.time[type]);
  const minutesInDay = 1440;

  const [localValue, setLocalValue] = useState([timeValue.from, timeValue.to]);

  useEffect(() => {
    setLocalValue([timeValue.from, timeValue.to]);
  }, [timeValue.from, timeValue.to]);

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="time-slider">
      <ReactSlider
        className="horizontal-slider timefilter-slider"
        thumbClassName="thumb timefilter-thumb"
        min={0}
        max={minutesInDay}
        value={localValue}
        onChange={setLocalValue}
        onAfterChange={(value) => {
          dispatch(updateTimeFilter({ key: type, value: { from: value[0], to: value[1] } }));
        }}
        minDistance={30}
        pearling
        step={15}
        renderTrack={(props, state) => {
          const { key, ...rest } = props;
          const classNames = ['track-before', 'track-active', 'track-after'];
          return <div key={key} {...rest} className={classNames[state.index]} />;
        }}
        renderThumb={(props, state) => {
          const { key, ...rest } = props;
          const value = state.valueNow;
          return (
            <div key={key} {...rest} className="thumb timefilter-thumb">
              <div className="thumb-label timefilter-thumb-label">{formatTime(value)}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default TimeFilter;
