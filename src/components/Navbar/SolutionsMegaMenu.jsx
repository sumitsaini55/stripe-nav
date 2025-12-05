import { ExternalLink } from 'lucide-react';
import { iconMap } from '../../data/navbarData';

function SolutionsMegaMenu({ isOpen, sections }) {
  return (
    <div
      className={`mega-menu ${isOpen ? 'mega-menu--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="mega-menu-panel" role="menu" aria-label="Solutions menu">
        {sections.map((section) => (
          <section className="mega-section" key={section.title}>
            <h3 className="mega-section-title">{section.title}</h3>
            <ul className="mega-section-list">
              {section.items.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.label} className="mega-item">
                    <a
                      href={item.url}
                      className="mega-item-link"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                    >
                      <span className="mega-item-icon-wrapper">
                        {Icon && <Icon className="mega-item-icon" />}
                      </span>
                      <span className="mega-item-text">
                        <span className="mega-item-label">{item.label}</span>
                        <span className="mega-item-sub">
                          {/* placeholder description */}
                          Explore how Stripe supports {item.label.toLowerCase()}.
                        </span>
                      </span>
                      {item.external && (
                        <ExternalLink className="mega-item-external" size={14} />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SolutionsMegaMenu;
