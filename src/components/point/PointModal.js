import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = "YYYY-MM-DD HH:mm:ss"
class PointEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let dt = Object.assign(values)
        dt.ct = dt.ct.unix()
        onOk(dt);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { ct, content } = this.props.record;
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit Point"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="content">
              {getFieldDecorator('content', {
                initialValue: content,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ct">
              {
                getFieldDecorator('ct', {
                  initialValue: moment(ct*1000)
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss" 
                  />
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PointEditModal);
