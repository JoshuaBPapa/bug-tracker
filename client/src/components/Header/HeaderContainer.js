import React, { useState, useLayoutEffect, useCallback, useContext } from 'react';

import HamburgerButton from './HamburgerButton';
import DarkOverlay from '../DarkOverlay/DarkOverlay';
import Nav from './Nav';

import { AuthContext } from '../../AuthContext';

const HeaderContainer = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const authContext = useContext(AuthContext);

  const toggleMobileNav = () => {
    if (!isMobileNavOpen && isMobileWidth) {
      setIsMobileNavOpen(true);

      document.body.style.top = (window.scrollY * -1) + 'px';
      document.body.classList.add('mobile-nav-scroll-lock');

    } else if (isMobileNavOpen && isMobileWidth) {
      const scrollYPosition = document.body.style.top;

      setIsMobileNavOpen(false);

      document.body.style.top = "";
      document.body.classList.remove('mobile-nav-scroll-lock');

      window.scrollTo(0, parseInt(scrollYPosition || '0') * -1);
    }
  };

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth >= 1200) {
      setIsMobileWidth(false);
      setIsMobileNavOpen(false);

      document.body.classList.remove('mobile-nav-scroll-lock');
    } else {
      setIsMobileWidth(true);
    }
  }, []);

  useLayoutEffect(() => {
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  }, [handleWindowResize]);

  return (
    <>
      {isMobileNavOpen ? (
        <DarkOverlay 
          clicked={toggleMobileNav} 
          overlayClass="mobile-nav-menu" />
      ) : null}
      <header className={`Header-Container${isMobileNavOpen ? ' open' : ''}`}>
        <HamburgerButton clicked={toggleMobileNav} />
        <div className="header-content">
          <Nav clicked={toggleMobileNav} />
          <button onClick={authContext.handleLogout}>
            logout
          </button>
        </div>
      </header>
    </>
  );
};

export default HeaderContainer;