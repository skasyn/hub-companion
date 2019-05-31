import React, {Component} from 'react'
import {Avatar, Button, List, Tag } from 'antd/lib/index'

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
