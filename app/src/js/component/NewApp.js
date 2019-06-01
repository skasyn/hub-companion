import React from 'react'
import { Layout, Menu, Icon, Col, Avatar, Row, Button, Badge } from 'antd/lib/index';
import { connect } from "react-redux";

import logo from '../../wallit.png';
import './NewApp.css'
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import ListActivities from "./ListActivities";
import Charts from "./Charts";
import { fetchInfos } from "../actions/index";
import '../../App.css';
import { changeContent } from '../actions/index';
import Settings from "./Settings";
import InterfaceMaker from "./InterfaceMaker";

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

function ContentMapDispatchToProps(dispatch) {
    return {
      fetchAuto: code => dispatch(fetchInfos(code))
    }
}

const ContentMapStateToProps = state => {
    return {
        content: state.content,
        id: state.id,
        activities: state.activities,
        name: state.name,
        year: state.year,
        plan: state.plan,
    }
}

class CompMiddleContent extends React.Component {
    render() {
        let content = this.props.content;

        if (this.props.activities.length === 0)
            this.props.fetchAuto(this.props.id);
        if ((this.props.year === 0 || this.props.plan === undefined) && content === 1)
            content = 11;
    
        switch (content) {
            case 1:
                return (
                    <div>
                        <Charts/>
                        <Disconnect/>
                        <Refresh/>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <ListActivities/>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <InterfaceMaker/>
                    </div>
                )
            case 4:
                return (
                    <div>

                    </div>
                )
            case 10:
                return (
                    <Settings/>
                )
            case 11:
                return (
                    <div>
                        <Row style={{paddingTop: "30vh"}}>
                            <h1>You must select your current year and credit plan</h1>
                            <Col span={7}/>
                            <Col span={10}>
                                <Button className="danger-button" type="danger" block onClick={() => this.props.changeContentClick(10)} >
                                    <Icon type="setting"/>
                                    Settings
                                </Button>
                            </Col>
                            <Col span={7}/>
                        </Row>
                    </div>
                )
            default:
                return (<div/>)
        }
    }    
}

const MiddleContent = connect(ContentMapStateToProps, ContentMapDispatchToProps)(CompMiddleContent);

/*************************/

const SiderMapStateToProps = state => {
    return {
        activities: state.activities,
        content: state.content,
    }
}

class CompSiderComponent extends React.Component {
    render() {
        // let count = this.props.activities.filter((elem) => { return elem.present === null }).length;

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed} id="sider-component">
                <div className="logo">
                    <Avatar src={logo} />
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[this.props.content.toString()]} >
                    <Menu.Item key="1" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(1)}>
                        <Icon type="dashboard" style={{fontSize: '1em'}} />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="2" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(2)}>
                        <Icon type="database" style={{fontSize: '1em'}} />
                        <span>Activities</span>
                    </Menu.Item>
                    <Menu.Item key="3" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(3)}>
                        <Icon type="experiment" style={{fontSize: '1em'}} />
                        <span>Maker</span>
                    </Menu.Item>
                    <Menu.Item key="4" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(4)}>
                        <Icon type="team" style={{fontSize: '1em'}} />
                        <span>Sharing</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

const SiderComponent = connect(SiderMapStateToProps)(CompSiderComponent);

/*************************/

const HeaderMapStateToProps = state => {
    return {
        name: state.name,
        year: state.year,
        plan: state.plan,
    }
}

class CompHeaderComponent extends React.Component {
    render() {
        let alert = 0;
        if (this.props.year === 0 || this.props.plan === undefined)
            alert = 1;
        return (
            <Header style={{ background: '#fff', padding: 0, height: 'initial'}}>
                <div>
                    <Row>
                        <Col span={1}>
                            <Icon
                                className="trigger"
                                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.props.toggle}
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={18}>
                            Hub Companion
                        </Col>
                        <Col span={3}>
                            <Menu mode="horizontal" selectable={false}>
                                <SubMenu title={
                                        <span>
                                            {alert !== 0 &&
                                                <Badge showZero={false} dot={true} offset={[-10, 0]}>
                                                    <Icon type="user"/>
                                                </Badge>
                                            }
                                            {alert === 0 &&
                                                <Icon type="user"/>
                                            }
                                            {this.props.name}
                                        </span>
                                }>
                                    <Menu.Item key="1" onClick={() => this.props.changeContentClick(10)}>
                                        {alert !== 0 &&
                                            <Badge showZero={false} dot={true} offset={[-10, 0]}>
                                                <Icon type="setting"/>
                                            </Badge>
                                        }
                                        {alert === 0 &&
                                            <Icon type="setting"/>
                                        }
                                        Settings
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </Header>
        )
    }
}

const HeaderComponent = connect(HeaderMapStateToProps)(CompHeaderComponent);

/*************************/

function SiderMapDispatchToProps(dispatch) {
    return {
      changeContentClick: content => dispatch(changeContent(content))
    }
}

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
            <Layout style={{minWidth: '100%'}} id="layout">
                <SiderComponent collapsed={this.state.collapsed} changeContentClick={this.props.changeContentClick}/>
                <Layout id="content-layout">
                    <HeaderComponent collapsed={this.state.collapsed} toggle={this.toggle} changeContentClick={this.props.changeContentClick}/>
                    <Content
                        style={{
                            padding: 0,
                            background: '#fff',
                            height: '100%',
                        }}
                    >
                        <MiddleContent changeContentClick={this.props.changeContentClick}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(null, SiderMapDispatchToProps)(SiderDemo);
