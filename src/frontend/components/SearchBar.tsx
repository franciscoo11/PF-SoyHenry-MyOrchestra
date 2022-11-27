import React, { ReactEventHandler } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const searchlogo =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1667940299/clipart4618545_kd7rwh.png";

const SearchStyles = styled.div`
  form {
    border-radius: 25px;
    background-color: #f7f5f5;
    padding: 10px;
  }
  input {
    background: transparent;
    flex: 1;
    border: 0;
    outline: none;
  }
  button {
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`;
const SearchBar = ({
  setLoading,
  setOrchestras,
  axios,
  search,
  setSearch,
}: any) => {
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const res = await axios.get(`api/orchestra?name=${search}`);
    setOrchestras(res.data);
    setSearch("");
    setLoading(false);
  };

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  return (
    <SearchStyles>
      <form onSubmit={onSubmitHandler}>
        <button>
          <FiSearch />
        </button>
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={onChangeHandler}
        />
      </form>
    </SearchStyles>
  );
};

export default SearchBar;
