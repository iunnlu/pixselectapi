import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import history from '../history';

const CustomCard = ({ componentName, submitForm, errorMessage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Container style={{ height: "100vh" }}>
            <Card style={{ top: "30%", margin: "0px 100px" }}>
                <Card.Header><b>{componentName}</b></Card.Header>
                <Card.Body>
                    <Container>
                        <Row style={{ margin: "5px 0px" }}>
                            <Col>
                                <label><b>Username</b></label>
                                <input style={{ width: "100%" }} value={username} type="text" onChange={(event) => setUsername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ margin: "5px 0px" }}>
                            <Col>
                                <label style={{ color: "red" }}><b>{errorMessage}</b></label>
                            </Col>
                        </Row>
                        <Row style={{ margin: "5px 0px" }}>
                            <Col>
                                <label><b>Password</b></label>
                                <input style={{ width: "100%" }} value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>
                        {componentName === "Login"
                            ? <Row style={{ textAlign: "center" }}>
                                <Col>
                                    <p onClick={() => history.push('/signup')} style={{ margin: "0px", cursor: "pointer", color: "#2d8da9" }}><b>Create New Account</b></p>
                                </Col>
                            </Row>
                            : <React.Fragment></React.Fragment>
                        }
                        <Row style={{ textAlign: "right", margin: "10px 0px" }}>
                            <Col>
                                <button className="btn btn-info" onClick={() => submitForm(username, password)}>{componentName === "Login" ? "Login" : "Sign Up"}</button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.user.message
    }
}

export default connect(mapStateToProps)(CustomCard);