import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    // console.log("U--", user._isAuth)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (<>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <NavLink to={SHOP_ROUTE}>BuyDevice</NavLink>
                    {user._isAuth
                        ? <Nav className="ml-auto">
                            <Button
                                variant={"outline-dark"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                            >Admin Panel</Button>
                            <Button
                                className="ml-3"
                                variant={"outline-dark"}
                                // onClick={() => history.push(LOGIN_ROUTE)}
                                onClick={() => logOut()}
                            >Sign out</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto ">
                            <Button
                                className="mr-2"
                                variant={"outline-dark"}
                                onClick={history.push(LOGIN_ROUTE)}
                            >Sign in</Button>
                        </Nav>
                    }

                </Container>
            </Navbar>
        </>

    );
});

export default NavBar;
