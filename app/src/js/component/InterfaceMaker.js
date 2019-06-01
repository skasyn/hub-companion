import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from "antd";
import { submitMakerAction } from "../actions";
import '../../App.css'

function mapDispatchToProps(dispatch) {
    return {
        submitClick: code => dispatch( submitMakerAction(code))
    }
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithoutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    }
};

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

class ComponentInterfaceMaker extends Component {

    state = {
        checkNick: false,
    };

    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldsValue('keys')

        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: key.filter(key => key !== k),
        })
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldsValue('keys');
        const nextKeys = keys.concat(id++)
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    check = () => {
        console.log("let it bite")
        this.props.form.validateFields(err => {
            if (!err) {
                this.props.submitClick(this.props.form.getFieldsValue())
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                label={index === 0 ? 'Camarades' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whiteSpace: true,
                            message: 'Please input coworker name or delete this field.'
                        },
                    ],
                })(<Input placeholder="passenger name" style={{width: '60%', marginRight: 8 }}/>)}
            </Form.Item>
        ))
        return (
            <div>
                <Form.Item {...formItemLayout} label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not a valid email!'
                            },
                            {
                                required: true,
                                message: 'Please input your email'
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Title">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a title',
                            },
                        ],
                    })(<Input placeholder="Please input a title"/>)
                    }
                </Form.Item>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.check}>
                        Check
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

const WrapperInterfaceMaker = Form.create({name: 'Interface_maker'})(ComponentInterfaceMaker);
export const InterfaceMaker = connect(null, mapDispatchToProps)(WrapperInterfaceMaker);
