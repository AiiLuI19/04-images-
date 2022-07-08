import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div role="alert" className={s.loader}>
      <BallTriangle color="#000000" height={60} width={60} />
      Loading...
    </div>
  );
}
export default Loader;
