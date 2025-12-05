import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navbarItems } from "../../data/navbarData";
import SolutionsMegaMenu from "./SolutionsMegaMenu.jsx";
import MobileMenu from "./MobileMenu.jsx";

function Navbar() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState("root"); // 'root' | 'solutions'
  const hoverTimeout = useRef(null);

  const solutionsItem = navbarItems.find(
    (item) => item.menu === "Solutions" && item.sections
  );

  const handleSolutionsEnter = () => {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
    }
    setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = window.setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 120);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setMobileView("root");
  };

  const onSolutionsKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsSolutionsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsSolutionsOpen(false);
    }
  };

  return (
    <header className="site-header">
      <nav
        className="navbar"
        aria-label="Main navigation"
        onMouseLeave={handleSolutionsLeave}
      >
        <div className="navbar-inner">
          {/* LEFT: logo */}
          <a href="/" className="navbar-logo">
            <span className="navbar-logo-text">stripe</span>
          </a>

          {/* CENTER: products / solutions / ... */}
          <ul className="navbar-links" role="menubar">
            {navbarItems.map((item) => {
              if (item.sections) {
                return (
                  <li
                    key={item.menu}
                    role="none"
                    className="navbar-link-item"
                    onMouseEnter={handleSolutionsEnter}
                  >
                    <button
                      className="navbar-link-button"
                      aria-haspopup="true"
                      aria-expanded={isSolutionsOpen}
                      onKeyDown={onSolutionsKeyDown}
                    >
                      <span>{item.menu}</span>
                      <ChevronDown
                        className={`navbar-link-chevron ${
                          isSolutionsOpen ? "navbar-link-chevron--open" : ""
                        }`}
                        size={14}
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.menu} role="none" className="navbar-link-item">
                  <a
                    href={item.url}
                    className="navbar-link"
                    role="menuitem"
                    tabIndex={0}
                  >
                    {item.menu}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* RIGHT: Support ▾ | Sign in | Contact sales button + hamburger */}
          <div className="navbar-cta-group">
            <button className="cta-link cta-link--dropdown">
              <span>Support</span>
              <ChevronDown className="cta-link-chevron" size={13} />
            </button>

            <button className="cta-link">Sign in</button>

            <button className="btn-primary">Contact sales</button>

            {/* mobile hamburger */}
            <button
              className="navbar-mobile-toggle"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Solutions mega menu */}
        {solutionsItem && (
          <div
            onMouseEnter={handleSolutionsEnter}
            onMouseLeave={handleSolutionsLeave}
          >
            <SolutionsMegaMenu
              isOpen={isSolutionsOpen}
              sections={solutionsItem.sections}
            />
          </div>
        )}
      </nav>

      {/* Mobile full-screen menu */}
      {solutionsItem && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          view={mobileView}
          onClose={() => setIsMobileMenuOpen(false)}
          onChangeView={setMobileView}
          solutionSections={solutionsItem.sections}
        />
      )}
    </header>
  );
}

export default Navbar;
