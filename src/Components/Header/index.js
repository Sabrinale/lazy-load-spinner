import React from "react";

import Input from "../Input";
import Button from "../Button";

const Header = ({ handleSort, handleInput, resetIndex }) => {
  return (
    <div className="buttons">
      <Input handleInput={handleInput} resetIndex={resetIndex} />
      <div className="sort-buttons">
        <Button id="last name" handleSort={handleSort} resetIndex={resetIndex} />
        <Button id="first name" handleSort={handleSort} resetIndex={resetIndex} />
        <Button id="id" handleSort={handleSort} resetIndex={resetIndex} />
      </div>
    </div>
  );
};

export default Header;
