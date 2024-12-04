import React from 'react';

interface NavIconProps {
  icon: string;
  title: string;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, title }) => {
  return (
    <a href="#" className="nav-icon" title={title}>
      <i>{icon}</i>
      <span>{title}</span>
    </a>
  );
};

export default NavIcon;