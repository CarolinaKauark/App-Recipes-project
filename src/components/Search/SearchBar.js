import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Context from '../../context/Context';
import SearchOptions from './SearchOptions';

const SearchBar = () => {
  const { handleSearch, search } = useContext(Context);

  const [searchValue, setSearchValue] = useState(search.value);
  const [searchRadio, setSearchRadio] = useState(search.option);

  const handleChange = (evt) => {
    const { target } = evt;

    if (target.type === 'radio') setSearchRadio(target.value);
    if (target.type === 'text') setSearchValue(target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (searchValue.length > 1 && searchRadio === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const searchObj = {
        option: searchRadio,
        value: searchValue,
      };
      handleSearch(searchObj);
    }
  };

  return (
    <Container className="mt-3 flex-column">
      <Form className="d-flex">
        <Form.Control
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Search"
          value={ searchValue }
          onChange={ handleChange }
          data-testid="search-input"
        />
        <Button
          variant="outline-success"
          id="exec-search-btn"
          name="exec-search-btn"
          className="ml-2"
          onClick={ handleSubmit }
          data-testid="exec-search-btn"
        >
          Search
        </Button>
      </Form>
      <SearchOptions option={ searchRadio } handleChange={ handleChange } />
    </Container>
  );
};

export default SearchBar;
