import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          <h1>THE END</h1> 
        </p>
        <p className='footer-subscription-text'>
          We are POPTIME.
        </p>
        <p className='footer-subscription-text'>
        Discover new movies and make your own lists with us!
        </p>
        
        <div className='input-areas'>
          <img src=''></img>
        </div>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/home' className='social-logo'>
              POPTIME
            </Link>
          </div>
          
          <small class='website-rights'> Created by: Antonella Armoa & Nicole Zieman - POPTIME © 2024</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='https://www.facebook.com/?locale=es_LA'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='https://www.instagram.com/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='https://twitter.com/?lang=es'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='https://ar.linkedin.com/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;