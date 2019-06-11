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

const default_maker = {
    title: 'DEFAULT_MAKER',
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
            return this.props.makers[0]
        }
        return this.props.makers.find((elem) => elem._id === id);
    };

    render() {
        let maker = (this.props.selected_maker ? this.findMakerById(this.props.selected_maker) : default_maker);

        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.props.hideDrawer}
                visible={this.props.drawer_visible}
            >
                <p style={{...pStyle, marginBottom: 24 }}>
                    <Row>
                        <Col span={20}>
                            {maker.title}
                        </Col>
                        <Col span={4}>
                            <WallitTag status={maker.status} />
                        </Col>
                    </Row>
                </p>
                <p style={pStyle}>Team</p>
                <Row>
                    <DescriptionItem title="Leader" content={maker.leader_email}/>
                </Row>
                {maker.co_workers !== undefined &&
                <Row>
                    {maker.co_workers.map((item, index) => {
                        return (<DescriptionItem title={"Coworker " + (index + 1)} content={item}/>)
                    })}
                </Row>
                }
                <Divider />
                <p style={pStyle}>Project information</p>
                <Row>
                    <DescriptionItem title="Description" content={maker.description}/>
                </Row>
                <Row>
                    <DescriptionItem title="Functionalities" content={maker.functionalities}/>
                </Row>
                <Row>
                    <DescriptionItem title="Technologies" content={maker.technologies}/>
                </Row>
                {(maker.ressources !== undefined || maker.informations !== undefined) &&
                    <div>
                        < Divider />
                        <p style={pStyle}>Additionnal information</p>
                        {maker.ressources !== undefined &&
                            <Row>
                                <DescriptionItem title="Ressources" content={maker.ressources}/>
                            </Row>
                        }
                        {maker.informations !== undefined &&
                            <Row>
                                <DescriptionItem title="More information" content={maker.informations}/>
                            </Row>
                        }
                    </div>
                }
            </Drawer>
        )
    }
}