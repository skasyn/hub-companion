import React from 'react';
import { connect } from "react-redux";
import '../../App.css';
import { WallitList} from "./WallitAssets";

const mapStateToProps = state => {
  return {
    activities: state.activities
  }
}

class CompListActivities extends React.Component {
  render () {
    let list = "";

    if (this.props.activities.length > 0) {
      list = <WallitList elem={this.props.activities}/>
    }
    return (
      <div>
        {list}
      </div>
    )
  }
}

const ListActivities = connect(mapStateToProps)(CompListActivities);

export default ListActivities;
