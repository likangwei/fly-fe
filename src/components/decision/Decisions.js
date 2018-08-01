import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './Decisions.css';
import DecisionDetail from './DecisionDetail';
import { Alert } from 'antd';
import { TreeSelect } from 'antd';
import { Router, Route, Switch } from 'dva/router';

const TreeNode = TreeSelect.TreeNode;


const PAGE_SIZE = 1000


function DecisionList({ dispatch, list: dataSource, loading, total, alert, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'decisions/remove',
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
      type: 'decisions/closeAlert',
    });
  }


  function editHandler(id, values) {
    dispatch({
      type: 'decisions/patch',
      payload: { id, values },
    });
  }

  function creteDecisionHandler(id, why_id){
    dispatch({
      type: 'decisions/addRelation',
      payload: {why: why_id, so: id},
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'decisions/create',
      payload: values,
    });
  }

  const columns = [
   {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      render: (text, record) =>(
        <div>
          <Link to={`/decision/${record.Id}`}>
            {record.Title}
          </Link>
        </div>
      )
    },
    {
      title: 'Content',
      dataIndex: 'Content',
      key: 'Content',
      render: (text, record) =>(
        <div>{record.Content}</div>
      )
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
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
    <div className={styles.normal}>
      <div>
        {alertComp}
        <button onClick={()=>createHandler({Title: "new"})}>新建决策</button>
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
  const { list, total, page, alert } = state.decisions;
  return {
    loading: state.loading.models.decisions,
    list,
    total,
    page,
    alert,
  };
}
DecisionList = connect(mapStateToProps)(DecisionList);

export default class Decisions extends React.Component{

  render(){
    return (
      <div>
        <Route path="/decision/" exact component={DecisionList} />
        <Route path="/decision/:id" exact component={DecisionDetail} />
      </div>
    )
  }
}
