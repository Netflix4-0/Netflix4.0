import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <Link className='footerLogoContainer' to={'/'}>
        <img
          className='footerLogo'
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/4c41d512-ea91-4829-909f-5d0d4dfa52a3'
          alt='logo'
        />
      </Link>
      <div className='linksContainer'>
        <div className='footerLinks'>
          <h4>We Offer</h4>
          <Link className='link' to={''}>
            Top Notch Streaming
          </Link>
          <Link className='link' to={''}>
            4k Quality
          </Link>
        </div>
        <div className='footerLinks'>
          <h4>Contact</h4>
          <Link className='link' to={''}>
            Head Office
          </Link>
          <Link className='link' to={''}>
            Sales Offices
          </Link>
          <Link className='link' to={''}>
            Support
          </Link>
        </div>
        <div className='footerLinks'>
          <h4>Terms of use</h4>
          <Link className='link' to={''}>
            Agreement
          </Link>
          <Link className='link' to={''}>
            Devices
          </Link>
        </div>
        <div className='footerLinks'>
          <h4>Privacy</h4>
          <Link className='link' to={''}>
            Your data
          </Link>
          <Link className='link' to={''}>
            Cookies
          </Link>
          <Link className='link' to={''}>
            Third party
          </Link>
        </div>
        <div className='footerLinks'>
          <h4>FAQ</h4>
          <Link className='link' to={''}>
            Kids mode
          </Link>
          <Link className='link' to={''}>
            Payment
          </Link>
          <Link className='link' to={''}>
            Countries
          </Link>
        </div>
      </div>

      <div className='socialMediaContainer'>
        <i className='fa-brands fa-youtube footerLogo'></i>
        <i className='fa-brands fa-x-twitter footerLogo'></i>
        <i className='fa-brands fa-facebook-f footerLogo'></i>
        <i className='fa-brands fa-instagram footerLogo'></i>
      </div>
    </footer>
  );
};
