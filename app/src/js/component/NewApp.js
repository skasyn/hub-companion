import React, { Component } from 'react'
import { Layout, Menu, Icon, Col, Avatar, Row } from 'antd/lib/index';
import logo from '../../wallit.png';
import './NewApp.css'
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import ListActivities from "./ListActivities";
import IntraImg from "./IntraImg";
import '../../App.css';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                            <Col span={6}/>
                            <Col span={12}>
                                <div>
                                    <Row type="flex" justify="center">
                                        <Col span={6}/>
                                        <Col span={12}><Avatar src={logo}/></Col>
                                        <Col span={6}/>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={6}/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div>
                            <Col span={2}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Col>
                            <Col span={22}>
                                <h1>Hub Companion - Welcome, {this.props.state.name}</h1>
                            </Col>
                        </div>
                    </Header>
                    <Content
                        style={{
                            padding: 0,
                            background: '#fff',
                            height: '100%',
                        }}
                    >
                        <div>
                            <IntraImg/>
                            <ListActivities/>
                            <Disconnect/>
                            <Refresh/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo
