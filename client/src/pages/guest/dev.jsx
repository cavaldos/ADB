import React from 'react';
import  { useEffect } from 'react';
const DevPage = () => {

  const handleClick = () => {
    alert('khanhs');
  }

  return (
    <div className="">
      <h1>instructor</h1>
      <button
        onClick={handleClick}
      >khanhs</button>
    </div>
  );
};

export default DevPage;
