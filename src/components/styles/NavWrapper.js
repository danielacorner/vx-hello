import styled from 'styled-components';

const NavWrapper = styled.div`
  nav {
    margin: 40px auto;
    padding-bottom: 15px;
    font-size: 22px;
    width: 90%;
    border-bottom: 2px solid black;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    a {
      text-decoration: none;
      &:hover,
      &[aria-current='page'] {
        text-decoration: underline;
        color: steelblue;
      }
    }
  }
`;

export default NavWrapper;
