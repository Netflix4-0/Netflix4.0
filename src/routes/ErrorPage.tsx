import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className='error-container'>
      <img src='https://github.com/Netflix4-0/Netflix4.0/assets/116897452/c7020dbf-eea9-4fa3-aedb-38a6238f5da9' />
      <h2>Page not found!</h2>
      <Link to={'/'}>
        <button className='error-page-button'>To Homepage</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
