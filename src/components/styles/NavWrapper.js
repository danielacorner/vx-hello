import styled from 'styled-components';

const NavWrapper = styled.div`
  nav {
    margin: 40px auto;
    padding-bottom: 15px;
    font-size: 22px;
    width: 90%;
    border-bottom: 2px solid black;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    a {
      text-decoration: none;
    }
  }
`;

export default NavWrapper;
