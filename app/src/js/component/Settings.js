import React from 'react';
import { connect } from "react-redux";
import { Select, Row, Col, Card } from 'antd/lib/index';
import { chosePlan, choseYear } from '../actions/index';
import '../../App.css';

let credit_plan = [
  {
    acculturation: 4,
    experimentation: 3
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 1
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 1,
    sharing: 1
  },
  {
    acculturation: 4,
    experimentation: 3,
    fruition: 2,
    sharing: 2
  }
]

const credit_infos = [
  {
    years: [1, 3],
  },
  {
    years: [1, 2, 3],
  },
  {
    years: [1, 2, 3],
  },
  {
    years: [2, 3]
  }
]

const { Option } = Select;

const mapStateToProps = state => {
  return {
    year: state.year,
    plan: state.plan,
    id : state.id
  }
}

function MapDispatchToProps(dispatch) {
  return {
    chosePlan: code => dispatch(chosePlan(code)),
    choseYear: year => dispatch(choseYear(year))
  }
}

class CompSettings extends React.Component {

  chosePlan(year, index, current_plan) {
    if (index !== current_plan && credit_infos[index].years.find((elem) => elem === year)) {
      this.props.chosePlan({id: this.props.id, plan: index});
    }
  }

  choseYear(year, current_plan) {
    this.props.choseYear({id: this.props.id, year: year});
    if (this.getClassName(year, current_plan, -1) === "greyed-card")
      this.props.chosePlan({id: this.props.id, plan: 1});
  }

  getClassName(year, index, current_plan) {
    if (index === current_plan) {
      return (
        "selected-card"
      )
    } else if (credit_infos[index].years.find((elem) => elem === year)) {
      return (
        "clickable-card"
      );
    } else {
      return (
        "greyed-card"
      );
    }
  }

  render() {
    let current_plan = credit_plan.findIndex((elem) => JSON.stringify(elem) === JSON.stringify(this.props.plan));

    return (
      <div>
        <Row style={{padding: "50px"}}>
          <Select defaultValue={this.props.year || "Not chosen"} style={{width: 150}} onSelect={(key) => this.choseYear(key, current_plan)}>
            <Option value={1}>Tek 1</Option>
            <Option value={2}>Tek 2</Option>
            <Option value={3}>Tek 3</Option>
          </Select>
        </Row>
        <Row gutter={12} style={{paddingLeft: "15px", paddingRight: "15px"}}>
          <Col span={6}>
            <Card title="1 Credit" className={this.getClassName(this.props.year, 0, current_plan)} onClick={() => this.chosePlan(this.props.year, 0, current_plan)}>
              <p>Acculturations: 4</p>
              <p>Experimentions: 3</p>
              <p>-</p>
              <p>-</p>
              <p style={{fontWeight: "bold"}}>Tek1 and Tek3</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="3 Credit" className={this.getClassName(this.props.year, 1, current_plan)} onClick={() => this.chosePlan(this.props.year, 1, current_plan)}>
              <p>Acculturations: 4</p>
              <p>Experimentions: 3</p>
              <p>Fruition: 1</p>
              <p>-</p>
              <p style={{fontWeight: "bold"}}>Tek1, Tek2 and Tek3</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="5 Credit" className={this.getClassName(this.props.year, 2, current_plan)} onClick={() => this.chosePlan(this.props.year, 2, current_plan)}>
              <p>Acculturations: 4</p>
              <p>Experimentions: 3</p>
              <p>Fruition: 1</p>
              <p>Sharing: 1</p>
              <p style={{fontWeight: "bold"}}>Tek1, Tek2 and Tek3</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="8 Credit" className={this.getClassName(this.props.year, 3, current_plan)} onClick={() => this.chosePlan(this.props.year, 3, current_plan)}>
              <p>Acculturations: 4</p>
              <p>Experimentions: 3</p>
              <p>Fruitions: 2</p>
              <p>Sharings: 2</p>
              <p style={{fontWeight: "bold"}}>Tek2 and Tek3</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const Settings = connect(mapStateToProps, MapDispatchToProps)(CompSettings);

export default Settings;
