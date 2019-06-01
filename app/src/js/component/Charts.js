import React from 'react';
import { connect } from "react-redux";
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
    let acc_perc = NaN
    let exp_perc = NaN
    let fru_perc = NaN
    let sha_perc = NaN
    let span = 6;

    if (this.props.plan.fruition === undefined || this.props.plan.sharing === undefined)
      span = 8;
    if (this.props.plan.fruition === undefined && this.props.plan.sharing === undefined)
      span = 12;
    if (this.props.plan !== undefined && this.props.points !== undefined) {
      acc_perc = Math.round(this.props.points.acculturation * 100 / this.props.plan.acculturation);
      exp_perc = Math.round(this.props.points.experimentation * 100 / this.props.plan.experimentation);
      fru_perc = Math.round(this.props.points.fruition * 100 / this.props.plan.fruition);
      sha_perc = Math.round(this.props.points.sharing * 100 / this.props.plan.sharing);
    }

    if (!isNaN(acc_perc)) {
      return (
        <div style={{padding: '5%'}}>
          <Row>
            <Col span={span}>
              Acculturation : {this.props.points.acculturation + "/" + this.props.plan.acculturation}
            </Col>
            <Col span={span}>
              Experimentation : {this.props.points.experimentation + "/" + this.props.plan.experimentation}
            </Col>
            { this.props.plan.fruition !== undefined &&
              <Col span={span}>
                Fruition : {this.props.points.fruition + "/" + this.props.plan.fruition}
              </Col>
            }
            { this.props.plan.sharing !== undefined &&
              <Col span={span}>
                Sharing : {this.props.points.sharing + "/" + this.props.plan.sharing}
              </Col>
            }
          </Row>
          <Row>
            <Col span={span}>
              <Progress type="circle" strokeWidth={10} percent={acc_perc}>Acculturation</Progress>
            </Col>
            <Col span={span}>
              <Progress type="circle" strokeWidth={10} percent={exp_perc}>Experimentation</Progress>
            </Col>
            { this.props.plan.fruition !== undefined &&
              <Col span={span}>
                <Progress type="circle" strokeWidth={10} percent={fru_perc}>Fruition</Progress>
              </Col>
            }
            { this.props.plan.sharing !== undefined &&
              <Col span={span}>
                <Progress type="circle" strokeWidth={10} percent={sha_perc}>Sharing</Progress>
              </Col>
            }
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
