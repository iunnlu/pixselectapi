import React, { useEffect } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import { createStreamAction } from '../actions';
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import jwt from 'jwt-decode';

class Channel extends React.Component {
    state = { channelUrl: this.props.location.state.channelUrl, time: 0, channelTitle: this.props.location.state.channelTitle };
    componentDidMount() {
        this.player = new JSMpeg.VideoElement(
            ".video-wrapper",
            this.state.channelUrl
        );
        this.startTimer();
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            event.returnValue = '';
            this.destroyComponent();
        })
    }
    startTimer() {
        this.timer = setInterval(() => {
            this.setState({ time: this.state.time + 1 })
        }, 1000);
    }
    stopTimer() {
        clearInterval(this.timer);
    }
    destroyComponent() {
        this.props.createStreamAction({
            userId: jwt(localStorage.getItem('token'))._id,
            channelTitle: this.state.channelTitle,
            duration: this.state.time
        });
        this.player.destroy();
    }
    componentWillUnmount() {
        this.destroyComponent();
    }
    render() {
        return (
            <Container>
                <Row style={{height:"80vh"}}>
                    <Col style={{top:"100px", display:"flex", alignItems:"center", flexDirection:"column"}}>
                            <div
                                className="video-wrapper"
                                style={{ width: "800px", height: "500px" }}
                            >
                            </div>
                            <div>
                            <i
                                onClick={() => {
                                    this.player.play();
                                    this.startTimer();
                                }}
                                style={{margin:"5px", cursor:"pointer"}} className="fa fa-3x fa-play-circle"
                            ></i>
                            <i 
                                onClick={() => {
                                    this.player.pause();
                                    this.stopTimer();
                                }}
                                style={{margin:"5px", cursor:"pointer"}} className="fa fa-3x fa-stop-circle"
                            ></i>
                            </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(null, { createStreamAction })(Channel);