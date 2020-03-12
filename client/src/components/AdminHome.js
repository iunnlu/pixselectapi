import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { authAdmin } from '../auth';
import axios from 'axios';
import "./adminHomeStyle.scss";

class AdminHome extends React.Component {
    state = { users: [], actions: [] }
    componentDidMount() {
        axios.all([
            axios.get("http://localhost:3001/api/users"),
            axios.get("http://localhost:3001/api/actions")
        ])
            .then(axios.spread((responseUsers, responseActions) => {
                this.setState({
                    users: responseUsers.data.items,
                    actions: responseActions.data.items
                })
            }))
    }
    renderUser = () => {
        return this.state.users.map((item, index) => {
            const newCreatedDate = new Date(item.date);
            const createdDateString = `${newCreatedDate.getDate()}.${newCreatedDate.getMonth()+1}.${newCreatedDate.getFullYear()} - ${newCreatedDate.getHours()}:${newCreatedDate.getMinutes()}`;
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>{createdDateString}</td>
                </tr>
            )
        })
    }
    renderActions = () => {
        return this.state.actions.map((item, index) => {
            const userArray = this.state.users.filter((userItem) => userItem._id === item.userId)

            const newLoginDate = new Date(item.loginDate);
            const loginDateString = `${newLoginDate.getDate()}.${newLoginDate.getMonth()+1}.${newLoginDate.getFullYear()} - ${newLoginDate.getHours()}:${newLoginDate.getMinutes()}`;
            const newLogoutDate = new Date(item.logoutDate);
            const logoutDateString = `${newLogoutDate.getDate()}.${newLogoutDate.getMonth()+1}.${newLogoutDate.getFullYear()} - ${newLogoutDate.getHours()}:${newLogoutDate.getMinutes()}`;

            if (item.streams.length === 0) {
                return (
                    <tr key={index}>
                        <td className="tableTr">{index+1}</td>
                        <td>{userArray[0].username}</td>
                        <td>{loginDateString}</td>
                        <td>{item.logoutDate === null ? "-" : logoutDateString}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                )
            }
            return item.streams.map((streamItem, streamIndex) => {
                const hours = Math.floor(streamItem.duration / 3600);
                const minutes = Math.floor(streamItem.duration / 60);
                const fullDuration = `${hours} hours ${minutes} minutes ${streamItem.duration} seconds`;
                if (streamIndex === 0) {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{userArray[0].username}</td>
                            <td>{loginDateString}</td>
                            <td>{item.logoutDate === null ? "-" : logoutDateString}</td>
                            <td>{streamItem.channelTitle}</td>
                            <td>{fullDuration}</td>
                        </tr>
                    )
                }
                return (
                    <tr key={index} className="tableTr">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{streamItem.channelTitle}</td>
                        <td>{fullDuration}</td>
                    </tr>
                )
            });
        });
    }
    render() {
        return (
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col>
                        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Users</h3>
                        <Table responsive style={{ border: "1px solid #e3e3e3" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUser()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row style={{ margin: "50px 0px" }}>
                    <Col>
                        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Actions</h3>
                        <Table responsive="sm" style={{ border: "1px solid #e3e3e3" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Login Date</th>
                                    <th>Logout Date</th>
                                    <th>Streams</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderActions()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default authAdmin(AdminHome);