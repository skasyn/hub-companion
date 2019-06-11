import React, {Component} from 'react'
import {Badge, Button, Select, Tag} from 'antd/lib/index'

export class LoadingButton extends Component {

    constructor(props) {
        super(props);
        let loading = false;

        let query = new URLSearchParams(window.location.search);
        if (query.get('code'))
            loading = true;

        this.state = {
            loading: loading,
            iconLoading: false,
        };
    }

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

export class WallitTag extends Component {

    render() {
        let color = "gray";
        let message = "Waiting";

        if (this.props.status === 1) {
            color = "#52c41a";
            message = "Accepted";
        }
        if (this.props.status === 2) {
            color = "#fa541c";
            message = "Refused";
        }
            if (message === "Waiting") {
                return (
                        <Badge dot={true} showZero className="badge-dot" offset={[-7, 0]}>
                            <Tag color={color} key={this.props.status} className="bold-text">
                                {message.toUpperCase()}
                            </Tag>
                        </Badge>
                )
            } else {
                return (
                        <Tag color={color} key={this.props.status} className="bold-text">
                            {message.toUpperCase()}
                        </Tag>
                )}   }
}