import React from 'react';
import { Router, Link } from '@reach/router';
import LineChart from './LineChart';
import BarChart from './BarChart';
import NavWrapper from '../styles/NavWrapper';

const pages = [
  {
    component: <LineChart path="/" />,
    path: '/',
    title: 'Line chart',
  },
  {
    component: <BarChart path="BarChart" />,
    path: 'BarChart',
    title: 'Bar chart',
  },
];

const Navbar = () => {
  return (
    <NavWrapper>
      <nav>
        {pages.map(page => (
          <Link to={page.path}>{page.title}</Link>
        ))}
      </nav>
      <Router>{pages.map(page => page.component)}</Router>
    </NavWrapper>
  );
};

export default Navbar;
