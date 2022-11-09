import styled from "styled-components";

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
const SearchBar = () => {
  return (
    <SearchStyles>
      <form>
        <button>
          <img src={searchlogo} width="15px" height="15px" />
        </button>
        <input type="text" placeholder="Buscar" />
      </form>
    </SearchStyles>
  );
};

export default SearchBar;
