import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    const threshold = 50;
    let lastScrollTop = 0;

    const onScroll = () => {
      const currentScrollTop = window.scrollY;
      setPastThreshold(currentScrollTop > threshold);
      setIsVisible(
        currentScrollTop < lastScrollTop || currentScrollTop <= threshold
      );

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const headerClass = isVisible && pastThreshold ? 'visible' : '';
  const headerTransform = isVisible ? 'translateY(0)' : 'translateY(-100%)';

  return (
    <header
      className={headerClass}
      style={{ transform: headerTransform }}
      role='header'
    >
      <NavLink className='' to={'/'}>
        <img
          className='headerLogo'
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/4c41d512-ea91-4829-909f-5d0d4dfa52a3'
          alt='logo'
        />
      </NavLink>
      <NavLink className='link' to={'/categories'}>
        Categories
      </NavLink>
      <NavLink className='link' to={'/bookmarks'}>
        Bookmarks
      </NavLink>
    </header>
  );
};
