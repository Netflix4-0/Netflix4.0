import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header role='header'>
      <Link className='' to={'/'}>
        <img
          className='headerLogo'
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/4c41d512-ea91-4829-909f-5d0d4dfa52a3'
          alt='logo'
        />
      </Link>
      <Link className='link' to={'/categories'}>
        Categories
      </Link>
      <Link className='link' to={'/bookmarks'}>
        Bookmarks
      </Link>
    </header>
  );
};
