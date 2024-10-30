import React from 'react';

const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <input type="text" placeholder="Поиск товара" />
    <label>
      <input type="checkbox" />
      Только товары в наличии
    </label>
    <select>
      <option value="">Категория</option>
      <option value="electronics">Электроника</option>
      <option value="furniture">Мебель</option>
      <option value="clothing">Одежда</option>
    </select>
  </aside>
);

export default Sidebar;
