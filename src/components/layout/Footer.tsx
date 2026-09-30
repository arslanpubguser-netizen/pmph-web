import { Link } from 'react-router-dom';
import { Crosshair, Youtube, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = {
  Platform: [
    { label: 'Teams', path: '/teams' },
    { label: 'Players', path: '/players' },
    { label: 'Tournaments', path: '/tournaments' },
    { label: 'Rankings', path: '/rankings' },
    { label: 'News', path: '/news' },
    { label: 'Marketplace', path: '/marketplace' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
    { label: 'Partners', path: '/partners' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Code of Conduct', path: '/conduct' },
  ],
};

const socials = [
  { icon: MessageCircle, label: 'Discord', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative bg-bg-surface border-t border-border mt-20">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="container-esports relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-text-muted max-w-xs">
              Pakistan's leading PUBG Mobile esports platform. Find teams, recruit players, join tournaments, and stay ahead of the game.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-semibold text-sm text-white mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2026 PUBG Mobile Pakistan Hub. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            Built with <Crosshair className="w-3 h-3 text-primary" /> for Pakistani Gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
