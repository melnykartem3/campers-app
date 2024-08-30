import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../../images/homePage/logo.svg';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.activeLink);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <a href="/" className={css.logoLink}>
          <img src={logo} alt="travelTrucksLogo" width={136} height={16} />
        </a>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={buildLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
