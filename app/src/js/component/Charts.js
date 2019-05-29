import React from 'react';
import { connect } from "react-redux";
import Chart from 'react-apexcharts';
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
          <RadialChart percentage={acc_perc} name="Acculturation" number={this.props.points.acculturation + "/" + this.props.plan.acculturation}/>
          <RadialChart percentage={exp_perc} name="Experimentation" number={this.props.points.experimentation + "/" + this.props.plan.experimentation}/>
          <RadialChart percentage={fru_perc} name="Fruition" number={this.props.points.fruition + "/" + this.props.plan.fruition}/>
          <RadialChart percentage={sha_perc} name="Sharing" number={this.props.points.sharing + "/" + this.props.plan.sharing}/>
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
