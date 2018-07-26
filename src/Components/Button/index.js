import React from 'react';

const Button = ({ id, handleSort, resetIndex }) => {
  return (
    <button
      className="sort"
      id={id}
      onClick={event => {
        handleSort(event);
        resetIndex();
      }}
    >
      Sort by {id}
    </button>
  );
};

export default Button;
