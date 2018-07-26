import React from "react";

const Input = ({ resetIndex, handleInput }) => {
  return (
    <div className="input">
      <input
        type="text"
        onInput={event => {
          resetIndex();
          handleInput(event);
        }}
      />
    </div>
  );
};

export default Input;
