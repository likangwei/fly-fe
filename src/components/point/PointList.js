import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Input } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './Points.css';
import PointModal from './PointModal';

const { Column } = Table;

const PAGE_SIZE = 1000

const data = [{
  title: "bababa"
}];


export default class PointList extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      dataSource: data
    }
  }

 handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  render(){

    return (
      <div>
        <Table dataSource={this.state.dataSource}>
          <Column
            title="Title"
            dataIndex="title"
            key="title"
          />
          <Column
            title="移除"
            key="remove"
            render={() => <a href="javascript:;" onClick={alert}>remove</a>}
          />
        </Table>
      </div>
      
    );
  }
}
