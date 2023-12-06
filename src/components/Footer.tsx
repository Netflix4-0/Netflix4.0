import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <div className='footer'>
      <Link className='footerLogoContainer' to={'/'}>
        <img
          className='footerLogo'
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/4c41d512-ea91-4829-909f-5d0d4dfa52a3'
          alt='logo'
        />
      </Link>
      <div className='footerLinksContainer'></div>
      <div className='footerLinks'>
        <h4>We Offer</h4>
        <p>Top Notch Streaming</p>
        <p>4k Quality</p>
      </div>

      <div className='footerLinks'>
        <h4>Contact</h4>
        <p>Head Office</p>
        <p>Sales Offices</p>
        <p>Support</p>
      </div>
      <div className='footerLinks'>
        <h4>Terms of use</h4>
        <p>Agreement</p>
        <p>Devices</p>
      </div>
      <div className='footerLinks'>
        <h4>Privacy</h4>
        <p>Your data</p>
        <p>Cookies</p>
        <p>Third party</p>
      </div>
      <div className='footerLinks'>
        <h4>FAQ</h4>
        <p>Kids mode</p>
        <p>Payment</p>
        <p>Countries</p>
      </div>

      <div className='socialMediaContainer'>
        <img
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/545b062a-0848-44d5-9164-c828f9928037'
          alt='youtube logo'
        />
        <img
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/a46cca47-8fe9-4c34-af0c-80bbacf4e943'
          alt='X logo'
        />
        <img
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/f743365d-b16f-4459-ae85-093f889f5a57'
          alt='Facebook Logo'
        />
        <img
          src='https://github.com/Netflix4-0/Netflix4.0/assets/117076586/a6f681cb-06d8-4fe8-b5d2-8c5c119f42a1'
          alt='Instagram Logo'
        />
      </div>
    </div>
  );
};
