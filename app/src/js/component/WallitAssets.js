import React, {Component} from 'react'
import {Avatar, Button, List, Table, Tag } from 'antd/lib/index'

export class LoadingButton extends Component {

    state = {
        loading: false,
        iconLoading: false,
    };

    enterLoading = () => {
        this.setState({loading: true})
    };

    render() {
        if (this.props.url !== '') {
            return (
                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}  href={this.props.url} block>
                    {this.props.messageone}
                </Button>
            )
        } else {
            return (
                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} block>
                    {this.props.messagetwo}
                </Button>
            )
        }
    }
}

LoadingButton.defaultProps = {
    href: '',
    message: "Loading"
}

export class WallitList extends Component {

    render() {
        return (
            <div class="list-activities">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.elem}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://www.rueducommerce.fr/medias/bf862a4b8b6e34dc85e0d6e56ccd15e9/p_580x580/0d0687c2b822314e9f6aed78a90b7c31.jpg" />}
                                title={item.type}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

WallitList.defaultProps = {
    elem: {
        description: '',
        present: '',
        type: '',
        points: 0
    }
}
