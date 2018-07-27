import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Problems.css';
import ProblemModal from './ProblemModal';

const PAGE_SIZE = 1000

function Problems({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'problems/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/problems',
        query: { page },
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'problems/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'problems/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: text => text,
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ProblemModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </ProblemModal>
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
          <ProblemModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Problem</Button>
          </ProblemModal>
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
  const { list, total, page } = state.problems;
  return {
    loading: state.loading.models.problems,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Problems);
