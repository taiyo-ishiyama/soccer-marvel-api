import React from "react";

export default function Header() {
  return (
    <header className='header'>
      <div className='header-container'>
        <a href='#' className='page-name'>
          <span>Marvel Soccer</span>
        </a>
        <nav className='navbar'>
          <a href='#home' className='link'>
            Home
          </a>
          <a href='#search' className='link'>
            Search
          </a>
          <a href='#field' className='link'>
            Field
          </a>
        </nav>
      </div>
    </header>
  );
}
