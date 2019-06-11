import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Icon, Popover, Card, List, Row, Col} from "antd";
import { submitSharingAction, fetchSharingUserAction } from "../actions";
import {WallitDrawer, WallitTag} from "./WallitAssets";
import '../../App.css'

const { TextArea } = Input;

let id = 0;

const mapStateToProps = state => {
    return {
        email: state.mail,
        loading: state.loading,
        error: state.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitClick: code => dispatch(submitSharingAction(code))
    }
};

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10},
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 3},
};

class ComponentInterfaceSharing extends Component {

    state = {
        checkNick: false,
    };

    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldsValue().keys;

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        })
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldsValue().keys;
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    check = () => {
        this.setState({loading: true});
        this.props.form.validateFields(err => {
            let results = this.props.form.getFieldsValue();
            results.email = this.props.email;
            if (!err) {
                this.props.submitClick(results)
                this.props.onUpdate();
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const coworkerItem = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayout)}
                label={'Coworker ' + (index + 1)}
                required={false}
                key={k}
                style={{textAlign: 'left'}}
            >
                {getFieldDecorator(`coworker_email[${k}]`, {
                    rules: [
                        {
                            type: 'email',
                            message: 'The input is not a valid email!'
                        },
                        {
                            required: true,
                            message: 'Please input coworker name or delete this field.'
                        },
                    ],
                })(<Input placeholder="coworker email" style={{width: '90%', marginRight: 8}}/>)}
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                />
            </Form.Item>
        ));
        return (
            <div>
                <Form.Item {...formItemLayout}
                           label="Title"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a title',
                            },
                        ],
                    })(<Input placeholder="Please input a title" style={{width: '90%', marginRight: 8}}/>)}
                    <Popover
                        title="Project title"
                        content={
                            <div>
                                <p>Enter the name of your sharing project.</p>
                            </div>
                        }
                        placement="rightTop">
                        <Icon type="question"/>
                    </Popover>
                </Form.Item>

                {coworkerItem}
                <Form.Item {...formItemLayout}>
                    <Popover
                        title="Coworkers"
                        content={
                            <div>
                                <p>Click here to add coworkers (if needed).</p>
                            </div>
                        }
                        placement="rightTop">
                        <Button type="dashed" onClick={this.add} >
                            <Icon type="plus" />Add coworker
                        </Button>
                    </Popover>
                </Form.Item>

                <Form.Item {...formItemLayout}
                           label="Description"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a description'
                            },
                        ],
                    })(<TextArea rows={4} placeholder="Please input a description" style={{width: '90%', marginRight: 8}}/>)}
                    <Popover
                        title="Description of your project"
                        content={
                            <div>
                                <p>The goal is to understand the objective of your project (context, usage, ...)</p>
                            </div>
                        }
                        placement="rightTop">
                        <Icon type="question"/>
                    </Popover>
                </Form.Item>
                
                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.check} loading={this.props.loading}>
                        Check
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

const WrapperInterfaceSharing = Form.create({name: 'Interface_sharing'})(ComponentInterfaceSharing);
const InterfaceForm = connect(mapStateToProps, mapDispatchToProps)(WrapperInterfaceSharing);

// Sharing list

const sharingMapStateToProps = state => {
    return {
        sharings: state.sharings,
        received_sharings: state.received_sharings,
        id: state.id
    }
};

function sharingMapDispatchToProps(dispatch) {
    return {
        fetchSharing: profile => dispatch(fetchSharingUserAction(profile))
    }
}

class CompSharingList extends Component {

    state = {
        selected_item: 0,
        drawer_visible: false,
    };

    hideDrawer = () => this.setState({ drawer_visible: false });

    showDrawer = item => {
        this.setState({
            selected_item: item.currentTarget.value,
            drawer_visible: true,
        })
    };

    render() {
        if (this.props.received_sharings === false) {
            this.props.fetchSharing(this.props.id);
        }

        return (
            <div>
                <List
                    grid={{gutter: 16, column: 3 }}
                    dataSource={this.props.sharings}
                    renderItem={item => (
                        <List.Item>
                            <Card headStyle={{fontWeight: "bold", textAlign: 'left'}} title={item.title} extra={<Button value={item._id} onClick={this.showDrawer}>More</Button>}>
                                <WallitTag status={item.status}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <WallitDrawer items={this.props.sharings} selected_item={this.state.selected_item} drawer_visible={this.state.drawer_visible} hideDrawer={this.hideDrawer}/>
            </div>
        )
    }
}

const SharingList = connect(sharingMapStateToProps, sharingMapDispatchToProps)(CompSharingList);

// Interface Sharing
class InterfaceSharing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSharing: false
        };
    }

    hideForm = () => {
        this.setState({showAddSharing: false});
    };

    showForm = () => {
        this.setState({showAddSharing: true});
    };

    render() {
        if (this.state.showAddSharing) {
            return (
                <div>
                    <Row className="center_div">
                        <Col span={24}>
                            <InterfaceForm onUpdate={this.hideForm}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} >
                            <h2 style={{marginLeft: 2}}>Sharing list</h2>
                        </Col>
                        <Col span={14}/>
                        <Col span={4}>
                            <Button type="danger" onClick={this.hideForm}>
                                <Icon type="close" />
                                Quit adding
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}/>
                        <Col span={20}>
                            <SharingList/>
                        </Col>
                        <Col span={2}/>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <Row>
                        <Col span={24}/>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <h2 style={{marginLeft: 2}}>Sharing list</h2>
                        </Col>
                        <Col span={14}/>
                        <Col span={4}>
                            <Button type="primary" onClick={this.showForm}>
                                <Icon type="plus" />
                                Add new sharing
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}/>
                        <Col span={20}>
                            <SharingList/>
                        </Col>
                        <Col span={2}/>
                    </Row>
                </div>
            )
        }
    }
}

export default InterfaceSharing