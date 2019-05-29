import React from 'react';
import { connect } from "react-redux";
import Chart from 'react-apexcharts';
import { Progress, Row, Col } from "antd";
import '../../App.css';

class RadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            dataLabels: {
              name: {
                show: false,
                color: "white",
                fontSize: "1.5em",
                offsetY: 150
              },
              value: {
                show: false
              }
            }
            },
        },
        stroke: {
          lineCap: "round"
        },
        labels: [this.props.name]
      },
      series: [this.props.percentage],
    }
  }

  render() {
    return (
      <div id="chart" style={{display: "inline-block"}}>
        <h2>{this.props.name}</h2>
        <h2>{this.props.number}</h2>
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height="350" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    points: state.points,
    plan: state.plan
  }
}

class CompCharts extends React.Component {
  render() {
    let acc_perc = this.props.points.acculturation * 100 / this.props.plan.acculturation;
    let exp_perc = this.props.points.experimentation * 100 / this.props.plan.experimentation;
    let fru_perc = this.props.points.fruition * 100 / this.props.plan.fruition;
    let sha_perc = this.props.points.sharing * 100 / this.props.plan.sharing;

    if (acc_perc) {
      return (
        <div>
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
              <Progress type="circle" percent={acc_perc} status={(!acc_perc ? "normal" : "")}>Acculturation</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={exp_perc} status={(!exp_perc ? "normal" : "")}>Experimentation</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={fru_perc} status={(!fru_perc ? "normal" : "")}>Fruition</Progress>
            </Col>
            <Col span={6}>
              <Progress type="circle" percent={sha_perc} status={(!sha_perc ? "normal" : "")}>Sharing</Progress>
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
