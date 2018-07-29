import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './Points.css';
import PointModal from './PointModal';
import AddReasonModal from './AddReasonModal'
import { Alert } from 'antd';
import { TreeSelect } from 'antd';
import RealReason from './RealReason'
const TreeNode = TreeSelect.TreeNode;


const PAGE_SIZE = 1000



function Points({ dispatch, list: dataSource, loading, total, alert, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'points/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/reason',
        query: { page },
      })
    );
  }

  function closeAlertHandler() {
    dispatch({
      type: 'points/closeAlert',
    });
  }


  function editHandler(id, values) {
    dispatch({
      type: 'points/patch',
      payload: { id, values },
    });
  }

  function creteReasonHandler(id, why_id){
    dispatch({
      type: 'points/addRelation',
      payload: {why: why_id, so: id},
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'points/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) =>(
        <div>{record.content}</div>
      )
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <PointModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </PointModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
          <AddReasonModal record={record} onOk={creteReasonHandler.bind(null, record.id)}>
            <button>Add Why</button>
          </AddReasonModal>
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
        <RealReason />
        <div className={styles.create}>
          <PointModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Point</Button>
          </PointModal>
        </div>
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
  const { list, total, page, alert } = state.points;
  return {
    loading: state.loading.models.points,
    list,
    total,
    page,
    alert,
  };
}

export default connect(mapStateToProps)(Points);
