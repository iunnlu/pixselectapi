import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { authUser } from '../auth';
import history from '../history';
import streams from '../api/streams';

class UserHome extends React.Component {
    state = {
        data: [
            { channelUrl: "ws://localhost:9998", channelTitle: "Stream1" },
            { channelUrl: "ws://localhost:9999", channelTitle: "Stream2" }
        ]
    }
    renderHome = () => {
        return this.state.data.map((item) => {
            return (
                <Row>
                    <Col>
                        <Card
                            style={{ cursor: "pointer", margin:"20px 0px" }}
                            onClick={() => {
                                history.push({
                                    pathname: "/channel",
                                    state: item
                                })
                            }}
                        >
                            <Card.Img variant="top" src="https://www.search3w.com/wp-content/uploads/2016/10/default-img.gif" />
                            <Card.Body>
                                <Card.Text>
                                    {item.channelTitle}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        })
    }
    render() {
        return (
            <Container style={{padding:"0px 200px"}}>
                {this.renderHome()}
            </Container>
        );
    };
}

export default authUser(UserHome);