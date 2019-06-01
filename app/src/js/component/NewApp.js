import React from 'react'
import { Layout, Menu, Icon, Col, Avatar } from 'antd/lib/index';
import logo from '../../wallit.png';
import './NewApp.css'
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import ListActivities from "./ListActivities";
import IntraImg from "./IntraImg";
import Charts from "./Charts";
import { fetchInfos } from "../actions/index";
import '../../App.css';
import { connect } from "react-redux";
import { changeContent } from '../actions/index';
import InterfaceMaker from "./InterfaceMaker";

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
        name: state.name
    }
}

class CompMiddleContent extends React.Component {
    render() {
        if (this.props.activities.length === 0)
            this.props.fetchAuto(this.props.id);
    
        switch (this.props.content) {
            case 1:
                return (
                    <div>
                        <h1>Welcome, {this.props.name}</h1>
                        <IntraImg/>
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
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

class HeaderComponent extends React.Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 'initial'}}>
                <div>
                    <Col span={2}>
                        <Icon
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    </Col>
                    <Col span={20}>
                        <h1>Hub Companion</h1>
                    </Col>
                    <Col span={2}></Col>
                </div>
            </Header>
        )
    }
}

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
                    <HeaderComponent collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Content
                        style={{
                            padding: 0,
                            background: '#fff',
                            height: '100%',
                        }}
                    >
                        <MiddleContent/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(null, SiderMapDispatchToProps)(SiderDemo);
