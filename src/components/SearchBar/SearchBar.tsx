import scss from './SearchBar.module.css';
import { BsSearchHeart } from "react-icons/bs";
import React from 'react';

interface SearchBarProps {
  getRequestPhrase: (query: string) => void;
}

export default function SearchBar({ getRequestPhrase }: SearchBarProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchField = (form.elements.namedItem('searchField') as HTMLInputElement);
    const searchphrase = searchField.value;

    if (searchphrase.trim() !== "") {
      getRequestPhrase(searchphrase);
    }

    form.reset();
  };

  return (
    <header className={scss.container}>
      <form onSubmit={handleSubmit} className={scss.searchForm}>
        <input
          className={scss.searchField}
          name='searchField'
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button
          type="submit"
          className={scss.SearchBtn}
          title="Search"
          aria-label="Search"
        >
          <BsSearchHeart className={scss.findIcon} />
        </button>
      </form>
    </header>
  );
}