import React from 'react';

function CategorySection({ setCategory }) {
  return (
    <div className="categories">
      {["All", "Men", "Women", "Trending"].map(cat => (
        <button key={cat} onClick={() => setCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategorySection;
