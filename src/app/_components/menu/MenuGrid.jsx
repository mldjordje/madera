"use client";

import MenuItem from "@components/menu/MenuItem";

const MenuGrid = ({ items, columns }) => {
  var columnsClass = '';
  
  switch (columns) {
    case 3:
      columnsClass = 'col-lg-4';
      break;
    case 2:
      columnsClass = 'col-lg-6';
      break;
    default:
      columnsClass = 'col-lg-3';
  }

  return (
    <>
      <div className="row">
        {items.map((item, key) => (
        <div className={columnsClass} key={`menu-grid-item-${key}`}>
          <MenuItem item={item} index={key} marginBottom={30} />
        </div>
        ))}
      </div>
    </>
  );
};
export default MenuGrid;
  