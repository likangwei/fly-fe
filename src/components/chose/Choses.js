import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { Alert } from 'antd';
import { TreeSelect } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import ChoseDetail from './ChoseDetail'


const TreeNode = TreeSelect.TreeNode;


const PAGE_SIZE = 1000


function ChoseList({ dispatch, list: dataSource, loading, total, alert, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'choses/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/Decision',
        query: { page },
      })
    );
  }

  function closeAlertHandler() {
    dispatch({
      type: 'choses/closeAlert',
    });
  }


  function editHandler(id, values) {
    dispatch({
      type: 'choses/patch',
      payload: { id, values },
    });
  }

  function creteDecisionHandler(id, why_id){
    dispatch({
      type: 'choses/addRelation',
      payload: {why: why_id, so: id},
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'choses/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
      render: (text, record) =>(
        <div>
          <Link to={`/chose/${record.Id}`}>
            {record.Id}
          </Link>
        </div>
      )
    },
   {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      render: (text, record) =>(
        <div>
          {record.Title}
        </div>
      )
    },
    {
      title: 'Content',
      dataIndex: 'Content',
      key: 'content',
      render: (text, record) =>(
        <div>
          {record.Content}
        </div>
      )
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.Id)}
          >
          <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  let alertComp = null
  if (alert.open){
    alertComp = <Alert
      key="alert"
      message={alert.msg}
      type="warning"
      closable
      onClose={closeAlertHandler.bind(null)}
    />
  }
  return (
    <div >
      <div>
        {alertComp}
        <button onClick={()=>createHandler({Content: "new"})}>新建选择</button>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, alert } = state.choses;
  return {
    loading: state.loading.models.choses,
    list,
    total,
    page,
    alert,
  };
}
ChoseList = connect(mapStateToProps)(ChoseList);

export default class Choses extends React.Component{

  render(){
    return (
      <div>
        <Route path="/chose/" exact component={ChoseList} />
        <Route path="/chose/:id" exact component={ChoseDetail} />
      </div>
    )
  }
}
