import { useSelector } from 'react-redux';

const LoadingBar = () => {
  const progress = useSelector((state) => state.loading.loadingProgress);

  return (
    <div className="header__loading">
      <div
        className="header__loading-progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingBar;
