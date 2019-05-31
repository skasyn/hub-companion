import React from 'react';
import { connect } from "react-redux";
import Chart from 'react-apexcharts';
import { Progress, Row, Col } from "antd";
import '../../App.css';


const mapStateToProps = state => {
  return {
    points: state.points,
    plan: state.plan,
  }
}

class CompCharts extends React.Component {
  render() {
    let acc_perc = Math.round(this.props.points.acculturation * 100 / this.props.plan.acculturation);
    let exp_perc = Math.round(this.props.points.experimentation * 100 / this.props.plan.experimentation);
    let fru_perc = Math.round(this.props.points.fruition * 100 / this.props.plan.fruition);
    let sha_perc = Math.round(this.props.points.sharing * 100 / this.props.plan.sharing);

    if (!isNaN(acc_perc)) {
      return (
        <div style={{padding: '5%'}}>
          <Row>
            <Col span={6}>
              Acculturation : {this.props.points.acculturation + "/" + this.props.plan.acculturation}
            </Col>
            <Col span={6}>
              Experimentation : {this.props.points.experimentation + "/" + this.props.plan.experimentation}
            </Col>
            <Col span={6}>
              Fruition : {this.props.points.fruition + "/" + this.props.plan.fruition}
            </Col>
            <Col span={6}>
              Sharing : {this.props.points.sharing + "/" + this.props.plan.sharing}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Progress type="circle" percent={acc_perc}>Acculturation</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={exp_perc}>Experimentation</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={fru_perc}>Fruition</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={sha_perc}>Sharing</Progress>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }  
}

const Charts = connect(mapStateToProps)(CompCharts);

export default Charts;
