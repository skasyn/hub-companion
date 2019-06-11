import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Icon, Popover, Card, List, Row, Col, Drawer, Divider } from "antd";
import { submitMakerAction, fetchMakerUserAction } from "../actions";
import { WallitTag } from "./WallitAssets";
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
        submitClick: code => dispatch(submitMakerAction(code))
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

class ComponentInterfaceMaker extends Component {

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
                                <p>Enter the name of your maker project.</p>
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

                <Form.Item {...formItemLayout}
                           label="Functionalities"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('functionalities', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a list of functionalities'
                            },
                        ],
                    })(<TextArea rows={4} placeholder="Please input a list of functionalities" style={{width: '90%', marginRight: 8}}/>)}
                    <Popover
                        title="List of functionalities"
                        content={
                            <div>
                                <p>This list represents what you will produce. It will be used to evaluate your project.</p>
                            </div>
                        }
                        placement="rightTop">
                        <Icon type="question"/>
                    </Popover>
                </Form.Item>

                <Form.Item {...formItemLayout}
                           label="Technologies"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('technologies', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your technologies'
                            },
                        ],
                    })(<Input placeholder="Please input your technologies" style={{width: '90%', marginRight: 8}}/>)}
                    <Popover
                        title="Technologies used"
                        content={
                            <div>
                                <p>This field speaks for itself.</p>
                            </div>
                        }
                        placement="rightTop">
                        <Icon type="question"/>
                    </Popover>
                </Form.Item>

                <Form.Item {...formItemLayout}
                           label="Ressources"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('ressources', {
                        rules: [
                            {
                                required: false,
                                message: 'Please input a list of ressources'
                            },
                        ],
                    })(<TextArea rows={4} placeholder="Please input a list of ressources" style={{width: '90%', marginRight: 8}}/>)}
                    <Popover
                        title="Ressources needed"
                        content={
                            <div>
                                <p>If you need ressources, precise it here.</p>
                            </div>
                        }
                        placement="rightTop">
                        <Icon type="question"/>
                    </Popover>
                </Form.Item>

                <Form.Item {...formItemLayout}
                           label="Informations"
                           style={{textAlign: 'left'}}
                >
                    {getFieldDecorator('information', {
                        rules: [
                            {
                                required: false,
                                message: 'Please input a list of ressources'
                            },
                        ],
                    })(<TextArea rows={4} placeholder="Please input informations if needed." style={{width: '90%', marginRight: 8}}/>
                    )}
                    <Popover
                        title="Further informations"
                        content={
                            <div>
                                <p>If you want to give other informations, put it here.</p>
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

const WrapperInterfaceMaker = Form.create({name: 'Interface_maker'})(ComponentInterfaceMaker);
const InterfaceForm = connect(mapStateToProps, mapDispatchToProps)(WrapperInterfaceMaker);

// Maker list

const makerMapStateToProps = state => {
    return {
        makers: state.makers,
        received_makers: state.received_makers,
        id: state.id
    }
};

function makerMapDispatchToProps(dispatch) {
    return {
        fetchMaker: profile => dispatch(fetchMakerUserAction(profile))
    }
}

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

class CompMakerList extends Component {

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    hideDrawer = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        if (this.props.received_makers === false) {
            this.props.fetchMaker(this.props.id);
        }

        return (
            <div>
                <List
                    grid={{gutter: 16, column: 2 }}
                    dataSource={this.props.makers}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title} extra={<Button>More</Button>}>
                                    <WallitTag status={item.status}/>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

const MakerList = connect(makerMapStateToProps, makerMapDispatchToProps)(CompMakerList);

// Interface Maker
class InterfaceMaker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddMaker: false
        };
    }

    hideForm = () => {
        this.setState({showAddMaker: false});
    };

    showForm = () => {
        this.setState({showAddMaker: true});
    };

    render() {
        if (this.state.showAddMaker) {
            return (
                <div>
                    <Row className="center_div">
                        <Col span={24}>
                            <InterfaceForm onUpdate={this.hideForm}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} >
                            <h2 style={{marginLeft: 2}}>Maker list</h2>
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
                            <MakerList/>
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
                            <h2 style={{marginLeft: 2}}>Maker list</h2>
                        </Col>
                        <Col span={14}/>
                        <Col span={4}>
                            <Button type="primary" onClick={this.showForm}>
                                <Icon type="plus" />
                                Add new maker
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}/>
                        <Col span={20}>
                            <MakerList/>
                        </Col>
                        <Col span={2}/>
                    </Row>
                </div>
            )
        }
    }
}

export default InterfaceMaker