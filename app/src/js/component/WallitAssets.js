import React, {Component} from 'react'
import { Button } from 'antd/lib/index'

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