import React, { useRef } from "react";

import Button from "./Button";

export default function SearchBar({ handleClick, setChars, setError }) {
  let input = useRef();
  return (
    <form>
      <input type="text" placeholder="Search characters..." ref={input} />
      <Button
        text={"Search"}
        handleClick={(e) => {
          handleClick(e, input.current.value)
            .then((data) => setChars(data.data.results))
            .catch((err) => setError(err));
        }}
      />
    </form>
  );
}
