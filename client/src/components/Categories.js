import React from "react";

const CategoryButton = ({ category, onClick }) => (
  <button
    type="button"
    className="hover:text-white  border-2 focus:border-blue-600 bg-white hover:bg-blue-700 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3"
    onClick={() => onClick(category)}
  >
    {category.toUpperCase()}
  </button>
);

const Categories = (props) => {
  const categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap mt-11">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={props.item}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
