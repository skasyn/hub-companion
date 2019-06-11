import React from 'react';
import { connect } from "react-redux";
import { Table, Tag, Badge, Select, Button, Input, Icon } from 'antd/lib/index';
import { submitMakerAction } from "../actions/index";
import Highlighter from 'react-highlight-words';
import '../../App.css';
import './Components.css';

const { Option } = Select;

const mapStateToProps = state => {
  return {
    makers: state.makers
  }
};

function MapDispatchToProps(dispatch) {
  return {
    changeStatus: maker => dispatch(submitMakerAction(maker)),
  }
}

class CompAdminMaker extends React.Component {

  state = {
    changeStatus: -1,
    openSelect: false,
    searchText: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] !== null ? record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()) : false,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => {
      if (text !== null && Array.isArray(text))
        text = text.join(" ")
      return (<Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text !== null ? text.toString() : ""}
      />)
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  selectedTag(status, index) {
    this.props.makers[index].status = status;
    this.setState({changeStatus: -1});
    this.props.changeStatus(this.props.makers[index]);
  }

  statusTag(status, index) {
    let color = "gray";
    let message = "Waiting";

    if (status === 1) {
      color = "#52c41a";
      message = "Accepted";
    }
    if (status === 2) {
      color = "#fa541c";
      message = "Refused";
    }
    if (this.state.changeStatus !== index) {
      if (message === "Waiting")
        return (
          <div onClick={(e) => {e.stopPropagation()}}>
            <Badge dot={true} showZero className="badge-dot" offset={[-7, 0]}>
              <Tag color={color} key={status} className="bold-text" onClick={() => this.setState({changeStatus: this.state.changeStatus === -1 ? index : -1, openSelect: true})}>
                {message.toUpperCase()}
              </Tag>
            </Badge>
          </div>
        )
      else
        return (
          <div onClick={(e) => {e.stopPropagation()}}>
            <Tag color={color} key={status} className="bold-text" onClick={() => this.setState({changeStatus: this.state.changeStatus === -1 ? index : -1, openSelect: true})}>
              {message.toUpperCase()}
            </Tag>
          </div>
        )
    } else {
      return (
        <div onClick={(e) => {
          this.setState({openSelect: !this.state.openSelect, changeStatus: -1});
          e.stopPropagation()
        }}>
        <Select defaultValue={status} onSelect={(value) => {this.selectedTag(value, index)}} open={this.state.openSelect}>
          <Option value={0}>
            <Tag color="gray" className="bold-text">
              WAITING
            </Tag>
          </Option>
          <Option value={1}>
            <Tag color="#52c41a" key={status} className="bold-text">
              ACCEPTED
            </Tag>
          </Option>
          <Option value={2}>
            <Tag color="#fa541c" key={status} className="bold-text">
              REFUSED
            </Tag>
          </Option>
        </Select>
        </div>
      )
    }
  }

  getCoworkers(coworkers)
  {
    let list = "";
    if (coworkers !== null) {
      coworkers = coworkers.filter((elem, index) => {
        return (elem !== null && elem !== "")
      });
      list = coworkers.map(function(item, key) {
        return (item + " ");
      })
    }
    return (
      <span className="bold-text wordWrap">
        {list}
      </span>
    )
  }

  descriptionMultiline(description)
  {
    if (description !== null && description !== undefined) {
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
    } else {
      return (
        <span/>
      )
    }
  }

  childCreate(row) {
    const columns = [
      {
        key: 'description',
        title: <span className="bold-text">Description</span>,
        dataIndex: "description",
        width: '20%',
        render: description => this.descriptionMultiline(description)
      },
      {
        key: 'functionalities',
        title: <span className="bold-text">Functionalities</span>,
        dataIndex: "functionalities",
        width: '20%',
        render: functionalities => this.descriptionMultiline(functionalities)
      },
      {
        key: 'informations',
        title: <span className="bold-text">Informations</span>,
        dataIndex: "informations",
        width: '20%',
        render: informations => this.descriptionMultiline(informations)
      },
      {
        key: 'ressources',
        title: <span className="bold-text">Resources</span>,
        dataIndex: "ressources",
        width: '20%',
        render: ressources => this.descriptionMultiline(ressources)
      },
      {
        key: 'technologies',
        title: <span className="bold-text">Technologies</span>,
        dataIndex: "technologies",
        width: '20%',
        render: technologies => this.descriptionMultiline(technologies)
      },
    ];

    return (
      <Table
        className="second-table"
        bordered
        dataSource={[row]}
        columns={columns}
        pagination={{position: 'none'}}
      />);
  }

  render() {
    let list = "";
    const columns = [
      {
        key: 'title',
        title: <span className="bold-text">Title</span>,
        dataIndex: 'title',
        width: '15%',
        render: title => <span className="bold-text">{title}</span>
      },
      {
        key: 'leader_email',
        title: <span className="bold-text">Group leader</span>,
        dataIndex: 'leader_email',
        width: '20%',
        render: leader_email => <span className="bold-text">{leader_email}</span>,
        ...this.getColumnSearchProps('leader_email')
      },
      {
        key: 'co_workers',
        title: <span className="bold-text">Coworkers</span>,
        dataIndex: 'co_workers',
        width: '55%',
        render: coworkers => ( this.getCoworkers(coworkers) ),
        ...this.getColumnSearchProps('co_workers')
      },
      {
        key: 'status',
        title: <span className="bold-text">Status</span>,
        dataIndex: 'status',
        width: '10%',
        render: (text, record, index) => (
          this.statusTag(text, index)
        ),
        sorter: function(a, b) {
          return (a.status - b.status);
        }
      }
    ]
    
    this.props.makers.forEach((element, key) => {
      element.key = key;
    });
    this.props.makers.sort((a, b) => a.status - b.status);
    if (this.props.makers.length > 0) {
      list = (
        <div className="list-activities">
          <Table
            columns={columns}
            dataSource={this.props.makers}
            expandedRowRender={(row, index) => this.childCreate(row, index)}
            expandRowByClick={true}
            pagination={{position: this.props.makers.length > 10 ? "bottom" : "none"}}
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

const AdminMaker = connect(mapStateToProps, MapDispatchToProps)(CompAdminMaker);

export default AdminMaker;
