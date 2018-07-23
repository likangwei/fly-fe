import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './Reasons.css';
import ReasonModal from './ReasonModal';

const PAGE_SIZE = 1000

function Reasons({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'reasons/remove',
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
      type: 'reasons/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'reasons/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) =>(
        <Link to={`/5step/reason/${record.id}`}>text</Link>
      )
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ReasonModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </ReasonModal>
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
          <ReasonModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Reason</Button>
          </ReasonModal>
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
  const { list, total, page } = state.reasons;
  return {
    loading: state.loading.models.reasons,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Reasons);
