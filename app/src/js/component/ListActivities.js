import React from 'react';
import { connect } from "react-redux";
import { Table, Tag } from 'antd/lib/index';
import '../../App.css';
import './NewApp.css';

const mapStateToProps = state => {
  return {
    activities: state.activities
  }
}

class CompListActivities extends React.Component {
  presentTag(present) {
    let color = "gray";
    let message = "Incomming";

    if (present === "present") {
      color = "#52c41a";
      message = "Present";
    }
    if (present === "absent") {
      color = "#fa541c";
      message = "Absent";
    }
    return (
      <Tag color={color} key={present} className="bold-text">
        {message.toUpperCase()}
      </Tag>
    )
  }

  typeTag(type) {
    let color = "gray";
    let message = type;

    if (type === "experimentation")
      color = "#722ed1";
    if (type === "acculturation")
      color = "#2f54eb";
    return (
      <Tag color={color} key={type} className="bold-text">
        {message.toUpperCase()}
      </Tag>
    )
  }

  childCreate(row) {
    const columns = [
      {
        title: <span className="bold-text">Description</span>,
        dataIndex: "description",
        width: '85%',
        key: 'description',
        render: description => <span className="bold-text">{description}</span>
      },
      {
        title: <span className="bold-text">Date</span>,
        dataIndex: "date",
        render: date => <span className="bold-text">{date}</span>
      }
    ];
    return (
      <Table
        className="second-table"
        bordered
        dataSource={[row]}
        columns={columns}
        pagination={{position: 'none'}}
        showHeader={false}
      />);
  }

  render () {
    let list = "";

    const columns = [
      {
        title: <span className="bold-text">Title</span>,
        dataIndex: 'title',
        key: 'rowKey',
        render: title => <span className="bold-text">{title}</span>
      },
      {
        title: <span className="bold-text">Points</span>,
        dataIndex: 'points',
        render: points => <span className="bold-text">{points}</span>
      },
      {
        title: <span className="bold-text">Type</span>,
        dataIndex: 'type',
        render: type => (
          this.typeTag(type)
        )
      },
      {
        title: <span className="bold-text">Presence</span>,
        dataIndex: 'present',
        render: present => (
          this.presentTag(present)
        )
      }
    ];


    if (this.props.activities.length > 0) {
      list = (
        <div class="list-activities">
          <Table
            className="first-table"
            columns={columns}
            dataSource={this.props.activities}
            expandedRowRender={(row) => this.childCreate(row)}
            expandRowByClick={true}
            pagination={{position: 'none'}}
          />
        </div>
      )

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
