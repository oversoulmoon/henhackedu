import React from 'react';

interface MenuItem {
  title: string;
  link: string;
}

interface MenuBarProps {
  items: MenuItem[];
}

const MenuBar: React.FC<MenuBarProps> = ({ items }) => {
  return (
    <header>
      <nav>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MenuBar;