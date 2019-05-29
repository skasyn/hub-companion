import React from 'react';
import { connect } from "react-redux";
import { fetchInfos } from "../actions/index";
import Charts from "./Charts";
import '../../App.css';

function mapDispatchToProps(dispatch) {
  return {
    fetchAuto: code => dispatch(fetchInfos(code))
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    activities: state.activities
  }
}

class CompListActivities extends React.Component {
  render () {
    if (this.props.activities.length === 0)
      this.props.fetchAuto(this.props.id);
    let list = "";

    if (this.props.activities.length > 0) {
      list = this.props.activities.map(function(elem, index) {
        return (
          <div key={index} className="list-activities">
            <div className="description">
              {elem.description + ":" + elem.present}
            </div>
            <div className="points">
              {elem.type + " " + elem.points}
            </div>
          </div>
        )
      })
    }
    return (
      <div>
        <Charts/>
        {list}
      </div>
    )
  }
}

const ListActivities = connect(mapStateToProps, mapDispatchToProps)(CompListActivities);

export default ListActivities;
