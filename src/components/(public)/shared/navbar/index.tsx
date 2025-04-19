import React from "react";
import navMenu from "./content";
import DesktopNav from "./desktop/desktop-nav";
import Logo from "./logo";
import MobileNav from "./mobile/mobile-nav";
import NavSearchBar from "./search";
import LanguageSwitcher from "./switch-lang";
import Theme from "./theme";
import NavMobileToggle from "./mobile/mob-nav-toggle";

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        {/* Top bar with search, theme toggle and language switcher */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {/* search Bar */}
            <NavSearchBar />

            {/* theme it's for used dark mode */}
            <Theme />
          </div>

          <LanguageSwitcher />
        </div>

        {/* Main navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />
          {/* Desktop  nav menu */}
          <DesktopNav items={navMenu} />

          {/* Mobile menu button */}
          <NavMobileToggle />
        </div>

        {/* Mobile  Nav    */}
        <MobileNav items={navMenu} />
      </div>
    </header>
  );
};

export default Navbar;
