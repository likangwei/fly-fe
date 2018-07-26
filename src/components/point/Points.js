import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './Points.css';
import PointModal from './PointModal';

const PAGE_SIZE = 1000

function Points({ dispatch, list: dataSource, loading, total, page: current }) {
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

  function editHandler(id, values) {
    dispatch({
      type: 'points/patch',
      payload: { id, values },
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
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
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
  const { list, total, page } = state.points;
  return {
    loading: state.loading.models.points,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Points);
