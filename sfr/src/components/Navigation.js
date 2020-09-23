import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AuthContext from '../context/AuthContext';

const Navigation = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const authContext = useContext(AuthContext);
    const { loadUser, isAuthenticated, logout } = authContext;

    return (
        <div>
            <Navbar color="warning" light>
                <NavbarBrand href="/user" className="mr-auto">Secret Family Recipe</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/addRecipePage">Add Recipe</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/sign-up" >Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/login'   onClick={logout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;