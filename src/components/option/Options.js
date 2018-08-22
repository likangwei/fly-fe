import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { Alert } from 'antd';
import { TreeSelect } from 'antd';
import { Router, Route, Switch } from 'dva/router';
import OptionDetail from './OptionDetail'


const TreeNode = TreeSelect.TreeNode;


const PAGE_SIZE = 1000


function OptionList({ dispatch, list: dataSource, loading, total, alert, page: current }) {

  function deleteHandler(id) {
    dispatch({
      type: 'options/remove',
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
      type: 'options/closeAlert',
    });
  }


  function editHandler(id, values) {
    dispatch({
      type: 'options/patch',
      payload: { id, values },
    });
  }

  function creteDecisionHandler(id, why_id){
    dispatch({
      type: 'options/addRelation',
      payload: {why: why_id, so: id},
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'options/create',
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
          <Link to={`/option/${record.Id}`}>
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
        <button onClick={()=>createHandler({Content: "new", Decision: {Id: 1}})}>新建选项</button>
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
  const { list, total, page, alert } = state.options;
  return {
    loading: state.loading.models.options,
    list,
    total,
    page,
    alert,
  };
}
OptionList = connect(mapStateToProps)(OptionList);

export default class Options extends React.Component{

  render(){
    return (
      <div>
        <Route path="/option/" exact component={OptionList} />
        <Route path="/option/:id" exact component={OptionDetail} />
      </div>
    )
  }
}
