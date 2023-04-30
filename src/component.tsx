import React from 'react';

function Greeting() {
  const handleClick = () => {
    alert();
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <p>Isnt server-side rendering remarkable?</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Greeting;
