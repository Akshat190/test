'use client';

import Link from 'next/link';

import Icon from '@/components/Icon';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { CAMPUS_LINKS, DEVELOPMENT_LINKS } from '@/lib/nav';

export default function Header() {
  // Plain <a> links: every page's scripts expect a full page load, like Django.
  const path = usePathname() ?? '/';
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!openMenu) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown')) setOpenMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('click', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [drawerOpen]);

  const active = (href: string) => (path === href ? 'active' : '');
  const groupActive = (hrefs: string[]) => (hrefs.includes(path) ? 'active' : '');

  const menuButton = (key: string, label: string, links: { label: string; href: string }[]) => (
    <li className={`nav-item dropdown ${openMenu === key ? 'show' : ''}`}>
      <a
        href="#"
        className={`nav-link dropdown-toggle ${groupActive(links.map((link) => link.href))}`}
        id={`${key}Dropdown`}
        role="button"
        aria-expanded={openMenu === key}
        onClick={(event) => {
          event.preventDefault();
          setOpenMenu(openMenu === key ? null : key);
        }}
      >
        {label}
      </a>
      <ul className={`dropdown-menu ${openMenu === key ? 'show' : ''}`} aria-labelledby={`${key}Dropdown`}>
        {links.map((link) => (
          <li key={link.href}>
            <a className="dropdown-item" href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <>
      <header className="site-header sticky-top">
        <nav className="navbar navbar-expand-lg" aria-label="Primary navigation">
          <div className="container">
            <Link className="navbar-brand logo-container" aria-label="Kapadia High School home page" href="/">
              <img src="/static/image/khes.svg" alt="Kapadia High School" className="header-logo" fetchPriority="high" />
            </Link>

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              aria-controls="siteNav"
              aria-expanded={drawerOpen}
              aria-label="Open navigation"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-none d-lg-flex" id="desktopNav">
              <ul className="navbar-nav ms-auto align-items-lg-center">
                <li className="nav-item">
                  <Link className={`nav-link ${active('/')}`} href="/">Home</Link>
                </li>
                {menuButton('school', 'Our Premises', CAMPUS_LINKS)}
                {menuButton('develop', 'Development', DEVELOPMENT_LINKS)}
                <li className="nav-item">
                  <Link className={`nav-link ${active('/gallery/')}`} href="/gallery/">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${active('/contact/')}`} href="/contact/">Contact</Link>
                </li>
              </ul>
              <a href="https://forms.gle/sDftg7osPaxvGKAD8" className="btn admission-btn ms-lg-3" target="_blank" rel="noopener">
                <Icon name="graduation-cap" className="me-2" />Admissions open
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`offcanvas offcanvas-end site-drawer ${drawerOpen ? 'show' : ''}`}
        tabIndex={-1}
        id="siteNav"
        aria-labelledby="siteNavLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="siteNavLabel">Kapadia High School</h5>
          <button type="button" className="btn-close btn-close-white" aria-label="Close navigation" onClick={() => setDrawerOpen(false)}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav drawer-nav">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="drawer-group">Our Premises</li>
            {CAMPUS_LINKS.map((link) => (
              <li key={link.href} className="nav-item"><a className="drawer-link" href={link.href}>{link.label}</a></li>
            ))}
            <li className="drawer-group">More</li>
            {DEVELOPMENT_LINKS.map((link) => (
              <li key={link.href} className="nav-item"><a className="drawer-link" href={link.href}>{link.label}</a></li>
            ))}
            <li className="nav-item"><Link className="drawer-link" href="/gallery/">Gallery</Link></li>
            <li className="nav-item"><Link className="drawer-link" href="/contact/">Contact</Link></li>
          </ul>
          <a href="https://forms.gle/sDftg7osPaxvGKAD8" className="btn admission-btn w-100 mt-3" target="_blank" rel="noopener">
            <Icon name="graduation-cap" className="me-2" />Admissions open
          </a>
          <p className="drawer-contact">+91 6354368335<br />info@kapadiahighschool.com</p>
        </div>
      </div>
      {drawerOpen && <div className="offcanvas-backdrop fade show" onClick={() => setDrawerOpen(false)} />}
    </>
  );
}
