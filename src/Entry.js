import { Outlet } from "react-router-dom";
import {Nav, Navbar, Container} from 'react-bootstrap'
function Entry(){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Demos</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="add_users_functional">Add User (F)</Nav.Link>
                    <Nav.Link href="all_users_functional">All Users (F)</Nav.Link>
                    <Nav.Link href="add_users_class">Add User (C)</Nav.Link>
                    <Nav.Link href="all_users_class">All Users (C)</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}

export default Entry;