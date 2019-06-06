import React from 'react';
import { connect } from "react-redux";
import { Table, Tag, Badge } from 'antd/lib/index';
import '../../App.css';
import './Components.css';

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
    if (message === "Incomming")
      return (
        <Badge dot={true} showZero className="badge-dot" offset={[-7, 0]}>
          <Tag color={color} key={present} className="bold-text">
            {message.toUpperCase()}
          </Tag>
        </Badge>
      )
    else
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

  descriptionMultiline(description)
  {
    return (
      <span className="bold-text">
        {description.split("\n").map(function(item, key) {
          return (
            <span key={key}>
              {item}
              <br />
            </span>
          )
        })}
      </span>
    )
  }

  childCreate(row) {
    const columns = [
      {
        key: 'description',
        title: <span className="bold-text">Description</span>,
        dataIndex: "description",
        width: '85%',
        render: description => this.descriptionMultiline(description)
      },
      {
        key: 'date',
        title: <span className="bold-text">Date</span>,
        dataIndex: "date",
        width: '15%',
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
        key: 'title',
        title: <span className="bold-text">Title</span>,
        dataIndex: 'title',
        render: title => <span className="bold-text">{title}</span>
      },
      {
        key: 'points',
        title: <span className="bold-text">Points</span>,
        dataIndex: 'points',
        render: points => <span className="bold-text">{points}</span>
      },
      {
        key: 'type',
        title: <span className="bold-text">Type</span>,
        dataIndex: 'type',
        render: type => (
          this.typeTag(type)
        )
      },
      {
        key: 'present',
        title: <span className="bold-text">Presence</span>,
        dataIndex: 'present',
        render: present => (
          this.presentTag(present)
        )
      }
    ];

    this.props.activities.forEach((element, key) => {
      element.key = key;
    });
    if (this.props.activities.length > 0) {
      list = (
        <div className="list-activities">
          <Table
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
