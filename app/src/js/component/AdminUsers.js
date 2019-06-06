import React from 'react';
import { connect } from "react-redux";
import { Table, Icon, Button, Input } from 'antd/lib/index';
import '../../App.css';
import './Components.css';
import { credit_plan } from './Plans';
import Highlighter from 'react-highlight-words';

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

class CompAdminUsers extends React.Component {
  state = {
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
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
        <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  planCompletion(record) {
    let plan = credit_plan[record.plan] || credit_plan[0];

    if (plan !== undefined) {
      if (record.acculturation >= plan.acculturation &&
          record.experimentation >= plan.experimentation/* &&
          record.fruition >= plan.fruition &&
          record.sharing >= plan.sharing*/)
          return (
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize: "1.5em"}}/>
          )
      else
          return (
            <Icon type="close-circle" theme="twoTone" twoToneColor="#fa541c" style={{fontSize: "1.5em"}}/>
          )
    } else
      return (
        <span className="bold-text">Not chosen</span>
      )
  }

  getYear(year) {
    if (year !== 0)
      return (
        <span className="bold-text">Tek {year}</span>
      )
    else
      return (
        <span className="bold-text">Not chosen</span>
      )
  }

  childCreate(row) {
    const columns = [
      {
        key: 'email',
        title: <span className="bold-text">Email</span>,
        dataIndex: 'mail',
        width: '30%',
        render: email => <span className="bold-text">{email}</span>
      },
      {
        key: 'acculturation',
        title: <span className="bold-text">Acculturation</span>,
        dataIndex: 'acculturation',
        width: '17%',
        render: acculturation => <span className="bold-text">{acculturation}</span>
      },
      {
        key: 'experimentation',
        title: <span className="bold-text">Experimentation</span>,
        dataIndex: 'experimentation',
        width: '17%',
        render: experimentation => <span className="bold-text">{experimentation}</span>
      },
      {
        key: 'fruition',
        title: <span className="bold-text">Fruition</span>,
        dataIndex: 'fruition',
        width: '17%',
        render: fruition => <span className="bold-text">{fruition}</span>
      },
      {
        key: 'sharing',
        title: <span className="bold-text">Sharing</span>,
        dataIndex: 'sharing',
        width: '17%',
        render: sharing => <span className="bold-text">{sharing}</span>
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
        key: 'name',
        title: <span className="bold-text">Name</span>,
        dataIndex: 'name',
        width: '33%',
        ...this.getColumnSearchProps('name')
      },
      {
        key: 'year',
        title: <span className="bold-text">Year</span>,
        dataIndex: 'year',
        width: '33%',
        render: year => this.getYear(year),
        sorter: function(a, b) {
          return (a.year - b.year);
        }
      },
      {
        key: 'plan',
        title: <span className="bold-text">Completion</span>,
        dataIndex: 'plan',
        width: '33%',
        render: (text, record, index) => this.planCompletion(record)
      }
    ]
    
    this.props.users.forEach((element, key) => {
      element.key = key;
    });
    if (this.props.users.length > 0) {
      list = (
        <div className="list-activities">
          <Table
            columns={columns}
            dataSource={this.props.users}
            expandedRowRender={(row, index) => this.childCreate(row, index)}
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

const AdminUsers = connect(mapStateToProps, null)(CompAdminUsers);

export default AdminUsers;
