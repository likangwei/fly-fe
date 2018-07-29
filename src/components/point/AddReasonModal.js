import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import PointList from './PointList'
import { Select } from 'antd';
import { connect } from 'dva';


const FormItem = Form.Item;
const dateFormat = "YYYY-MM-DD HH:mm:ss"

const Option = Select.Option;

class AddReasonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      why_id: null,
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (value) => {
    this.setState({why_id: value})
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(this.state.why_id);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const list = this.props.list;
    const record = this.props.record
    let sels = []
    for(let i=0; i<list.length; i++){
      const {content, ct, id} = list[i]
      sels.push(
        <Option key={id} value={id}>{content}</Option>
      )
    }
    
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit Point"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <p>为什么{record.content}?</p>
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <Select 
              style={{ width: 120 }} onChange={this.handleChange}
              value={this.state.why_id}
            >
              {sels}
            </Select>
          </Form>
        </Modal>
      </span>
    );
  }
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

AddReasonModal = Form.create()(AddReasonModal)
export default connect(mapStateToProps)(AddReasonModal);
