import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;