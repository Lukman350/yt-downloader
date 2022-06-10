import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";

function MainNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">YT Downloader</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link href="#">Home</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link href="#">About</Nav.Link>
            </Link>
          </Nav>

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;