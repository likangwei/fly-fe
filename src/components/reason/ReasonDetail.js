import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';

const PAGE_SIZE = 1000

export default class ReasonDetail extends React.Component{

  render(){
    console.log("reason detail")
    return (
      <div>reason detail</div>
    )
  }
}

