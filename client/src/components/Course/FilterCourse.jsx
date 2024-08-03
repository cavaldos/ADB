import React, { useState } from "react";

function FilterComponent() {
  const subjects = [
    { id: 1, name: "Data Science", count: 1726 },
    { id: 2, name: "Computer Science", count: 938 },
    // more subjects...
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Giả sử 1000 là giá trị tối đa ban đầu

  // Function to handle toggle
  const toggleFilter = (id) => {
    setSelectedFilters((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // Handle changes in price range
  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value);
    if (newMinPrice <= maxPrice) {
      setMinPrice(newMinPrice);
    } else {
      setMinPrice(maxPrice);
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    if (newMaxPrice >= minPrice) {
      setMaxPrice(newMaxPrice);
    } else {
      setMaxPrice(minPrice);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md xl:w-1/6 lg:w-1/7 md:w-1/5 w-full">
      <h2 className="font-semibold text-xl mb-8">Filter by</h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <label className="block">Min Price: ${minPrice}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer  "
        />
        <label className="block">Max Price: ${maxPrice}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Subject</h3>
        {subjects.map((subject) => (
          <div key={subject.id} className="flex items-center mt-1">
            <input
              type="checkbox"
              id={`filter-${subject.id}`}
              checked={selectedFilters.includes(subject.id)}
              onChange={() => toggleFilter(subject.id)}
              className="mr-2"
            />
            <label htmlFor={`filter-${subject.id}`}>
              {subject.name} ({subject.count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterComponent;
