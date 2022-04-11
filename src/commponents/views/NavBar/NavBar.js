import { Container, Navbar, Nav, NavbarBrand } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="mt-4 mb-4 rounded space-beetwen">
      <Container>
        <NavbarBrand>Waiter.app</NavbarBrand>
        <Nav>
          <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;