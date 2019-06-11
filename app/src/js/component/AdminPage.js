import React from 'react'
import { Layout, Menu, Icon, Col, Avatar, Row, Badge } from 'antd/lib/index';
import { connect } from "react-redux";

import './Components.css';
import '../../App.css';
import logo from '../../wallit.png';
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import { fetchAdminInfos } from "../actions/index";
import { changeContent } from '../actions/index';
import AdminMaker from "./AdminMakers";
import AdminUsers from "./AdminUsers";
import AdminSharing from "./AdminSharings";

const Contents = {
    MENU: 1,
    MAKER: 2,
    SHARING: 3,
    USERS: 4,
    SETTINGS: 5,
    DEFAULT: 6
}

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

function ContentMapDispatchToProps(dispatch) {
    return {
      fetchAuto: code => dispatch(fetchAdminInfos(code))
    }
}

const ContentMapStateToProps = state => {
    return {
        content: state.content,
        id: state.id,
        received_activities: state.received_activities,
    }
}

class CompMiddleContent extends React.Component {
    render() {
        let content = this.props.content;

        if (this.props.received_activities === false) {
            this.props.fetchAuto(this.props.id);
            content = Contents.DEFAULT;
        }
    
        switch (content) {
            case Contents.MENU:
                return (
                    <div>
                      <Disconnect/>
                      <Refresh/>
                    </div>
                )
            case Contents.MAKER:
                return (
                    <div>
                      <AdminMaker/>
                    </div>
                )
            case Contents.SHARING:
                return (
                    <div>
                        <AdminSharing />
                    </div>
                )
            case Contents.SETTINGS:
                return (
                    <div>
                    </div>
                )
            case Contents.USERS:
                return (
                    <div>
                        <AdminUsers />
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
                    <Menu.Item key="1" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.MENU)}>
                        <Icon type="dashboard" style={{fontSize: '1em'}} />
                        <span>Menu</span>
                    </Menu.Item>
                    <Menu.Item key="2" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.MAKER)}>
                        <Icon type="experiment" style={{fontSize: '1em'}} />
                        <span>Makers</span>
                    </Menu.Item>
                    <Menu.Item key="3" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.SHARING)}>
                        <Icon type="team" style={{fontSize: '1em'}} />
                        <span>Sharing</span>
                    </Menu.Item>
                    <Menu.Item key="4" style={{fontSize: '1.5em'}} onClick={() => this.props.changeContentClick(Contents.USERS)}>
                        <Icon type="solution" style={{fontSize: '1em'}} />
                        <span>Users</span>
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

class AdminPage extends React.Component {
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

export default connect(null, UserMapDispatchToProps)(AdminPage);
