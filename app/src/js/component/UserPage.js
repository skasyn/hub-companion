import React from 'react'
import { Layout, Menu, Icon, Col, Avatar, Row, Button, Badge } from 'antd/lib/index';
import { connect } from "react-redux";

import logo from '../../wallit.png';
import './Components.css';
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import ListActivities from "./ListActivities";
import Charts from "./Charts";
import { fetchInfos, changeContent } from "../actions/index";
import '../../App.css';
import Settings from "./Settings";
import InterfaceMaker from "./InterfaceMaker";
import InterfaceSharing from "./InterfaceSharing";

const Contents = {
    DASHBOARD: 1,
    ACTIVITIES: 2,
    MAKER: 3,
    SHARING: 4,
    SETTINGS: 5,
    ALERTNOYEAR: 6,
    DEFAULT: 7
}

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
        received_activities: state.received_activities,
        name: state.name,
        year: state.year,
        plan: state.plan,
    }
}

class CompMiddleContent extends React.Component {
    render() {
        let content = this.props.content;

        if ((this.props.year === 0 || this.props.plan === undefined) && content === 1)
            content = Contents.ALERTNOYEAR;
        if (this.props.received_activities === false) {
            this.props.fetchAuto(this.props.id);
            content = Contents.DEFAULT;
        }
    
        switch (content) {
            case Contents.DASHBOARD:
                return (
                    <div>
                        <Charts/>
                        <Disconnect/>
                        <Refresh/>
                    </div>
                )
            case Contents.ACTIVITIES:
                return (
                    <div>
                        <ListActivities/>
                    </div>
                )
            case Contents.MAKER:
                return (
                    <div>
                        <InterfaceMaker/>
                    </div>
                )
            case Contents.SHARING:
                return (
                    <div>
                        <InterfaceSharing />
                    </div>
                )
            case Contents.SETTINGS:
                return (
                    <Settings/>
                )
            case Contents.ALERTNOYEAR:
                return (
                    <div>
                        <Row style={{paddingTop: "30vh"}}>
                            <h1>You must select your current year and credit plan</h1>
                            <Col span={7}/>
                            <Col span={10}>
                                <Button className="danger-button" type="danger" block onClick={() => this.props.changeContentClick(Contents.SETTINGS)} >
                                    <Icon type="setting"/>
                                    Settings
                                </Button>
                            </Col>
                            <Col span={7}/>
                        </Row>
                    </div>
                )
            case Contents.DEFAULT:
                return (
                    <div/>
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
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed} id="sider-component">
                <div className="logo">
                    <Avatar src={logo} />
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[this.props.content.toString()]} >
                    <Menu.Item key="1" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.DASHBOARD)}>
                        <Icon type="dashboard" style={{fontSize: '1em'}} />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="2" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.ACTIVITIES)}>
                        <Icon type="database" style={{fontSize: '1em'}} />
                        <span>Activities</span>
                    </Menu.Item>
                    <Menu.Item key="3" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.MAKER)}>
                        <Icon type="experiment" style={{fontSize: '1em'}} />
                        <span>Maker</span>
                    </Menu.Item>
                    <Menu.Item key="4" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.SHARING)}>
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
                                    <Menu.Item key="1" onClick={() => this.props.changeContentClick(Contents.SETTINGS)}>
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

function UserMapDispatchToProps(dispatch) {
    return {
      changeContentClick: content => dispatch(changeContent(content))
    }
}

class UserPage extends React.Component {
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

export default connect(null, UserMapDispatchToProps)(UserPage);
