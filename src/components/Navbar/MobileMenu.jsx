import { ChevronRight } from 'lucide-react';
import { navbarItems, iconMap } from '../../data/navbarData';

function MobileMenu({
  isOpen,
  view,
  onClose,
  onChangeView,
  solutionSections,
}) {
  if (!isOpen) return null;

  const rootItems = navbarItems.filter((item) => item.menu !== 'Solutions');
  const solutionsItem = navbarItems.find(
    (item) => item.menu === 'Solutions' && item.sections
  );

  return (
    <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
      <div className="mobile-menu">
        {view === 'root' && (
          <>
            <header className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                className="mobile-menu-close"
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            </header>

            <nav className="mobile-menu-body">
              <ul className="mobile-menu-list">
                <li>
                  <button
                    className="mobile-menu-link mobile-menu-link--chevron"
                    onClick={() => onChangeView('solutions')}
                  >
                    <span>Solutions</span>
                    <ChevronRight size={18} />
                  </button>
                </li>

                {rootItems.map((item) => (
                  <li key={item.menu}>
                    <a
                      href={item.url || '#'}
                      className="mobile-menu-link"
                    >
                      {item.menu}
                    </a>
                  </li>
                ))}

                <li>
                  <button className="mobile-menu-link mobile-menu-link--muted">
                    Sign in
                  </button>
                </li>
              </ul>
            </nav>

            <footer className="mobile-menu-footer">
              <button className="btn-outline-full">Contact sales</button>
              <button className="btn-primary-full">Start now</button>
            </footer>
          </>
        )}

        {view === 'solutions' && solutionsItem && (
          <>
            <header className="mobile-menu-header">
              <button
                className="mobile-back-button"
                onClick={() => onChangeView('root')}
              >
                <ChevronRight size={18} className="mobile-back-icon" />
                <span>Back</span>
              </button>
            </header>

            <nav className="mobile-menu-body mobile-solutions-body">
              {solutionSections.map((section) => (
                <section className="mobile-solutions-section" key={section.title}>
                  <h3 className="mobile-solutions-title">{section.title}</h3>
                  <ul className="mobile-solutions-list">
                    {section.items.map((item) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <li key={item.label} className="mobile-solutions-item">
                          <a
                            href={item.url}
                            className="mobile-solutions-link"
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer' : undefined}
                          >
                            {Icon && (
                              <Icon
                                className="mobile-solutions-icon"
                                size={18}
                              />
                            )}
                            <span>{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </nav>

            <footer className="mobile-menu-footer">
              <button className="btn-outline-full">Contact sales</button>
              <button className="btn-primary-full">Start now</button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
