import React, {Component} from 'react'
import {Badge, Button, Tag, Drawer, Row, Divider, Col} from 'antd/lib/index'

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

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const default_item = {
    title: 'DEFAULT_ITEM',
    leader_email: 'wallit@wanadoo.fr',
    co_workers: ['untruc@caramail.fr'],
    description: 'An error by Wallit studio'
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

export class WallitDrawer extends Component {

    findMakerById = id => {
        if (id === 0) {
            return this.props.items[0]
        }
        return this.props.items.find((elem) => elem._id === id);
    };

    render() {
        let item = (this.props.selected_item ? this.findMakerById(this.props.selected_item) : default_item);

        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.props.hideDrawer}
                visible={this.props.drawer_visible}
            >
                <div style={{...pStyle, marginBottom: 24 }}>
                    <Row>
                        <Col span={20}>
                            {item.title}
                        </Col>
                        <Col span={4}>
                            <WallitTag status={item.status} />
                        </Col>
                    </Row>
                </div>
                <p style={pStyle}>Team</p>
                <Row>
                    <DescriptionItem title="Leader" content={item.leader_email}/>
                </Row>
                {item.co_workers !== undefined &&
                <Row>
                    {item.co_workers.map((item, index) => {
                        return (<DescriptionItem key={index} title={"Coworker " + (index + 1)} content={item}/>)
                    })}
                </Row>
                }
                <Divider />
                <p style={pStyle}>Project information</p>
                <Row>
                    <DescriptionItem title="Description" content={item.description}/>
                </Row>
                {item.functionalities !== undefined &&
                    <Row>
                        <DescriptionItem title="Functionalities" content={item.functionalities}/>
                    </Row>
                }
                {item.technologies !== undefined &&
                    <Row>
                        <DescriptionItem title="Technologies" content={item.technologies}/>
                    </Row>
                }
                {(item.ressources !== undefined || item.informations !== undefined) &&
                    <div>
                        < Divider />
                        <p style={pStyle}>Additionnal information</p>
                        {item.ressources !== undefined &&
                            <Row>
                                <DescriptionItem title="Ressources" content={item.ressources}/>
                            </Row>
                        }
                        {item.informations !== undefined &&
                            <Row>
                                <DescriptionItem title="More information" content={item.informations}/>
                            </Row>
                        }
                    </div>
                }
            </Drawer>
        )
    }
}