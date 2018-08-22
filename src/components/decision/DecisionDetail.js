import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import {connect} from 'dva'
const { TextArea } = Input;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DecisionDetail extends React.Component {

  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      Id: props.match.params.id || "",
      record: null,
    }
  }

  componentDidMount() {
    this.props.form.validateFields();
    this.props.dispatch({
      type: 'decisions/fetchOne',
      payload: this.state.Id
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'decisions/patch',
          payload: {id: this.state.Id, values},
        });
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {decisions} = this.props
    let m = decisions.m
    let record_id = this.state.Id
    let record = m[record_id]
    console.log(record)
    if(record == null){
      return <div>not found {this.state.Id}</div>
    }
    let {Title, Content} = record
    const titleError = isFieldTouched('title') && getFieldError('title');
    const contentError = isFieldTouched('content') && getFieldError('content');
    return (
      <div>
        <pre>
        {JSON.stringify(record, null, 2)}
        </pre>
        <a href="http://fromwiz.com/share/s/36Ha2336xA_02MxC2h0y0ZS11Hd1Kf3QKQaZ2vgkSY0Mkaos">5 学会决策</a>
        <Form onSubmit={this.handleSubmit}>

        <FormItem
          validateStatus={titleError ? 'error' : ''}
          help={titleError || ''}
        >
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please input title!' }],
            initialValue: Title,
          })(
            <Input placeholder="Title"/>
          )}
        </FormItem>
        <FormItem
          validateStatus={contentError ? 'error' : ''}
          help={contentError || ''}
        >
          {getFieldDecorator('Content', {
            rules: [{ required: true, message: 'Please input your content!' }],
            initialValue: Content,
          })(
            <TextArea autosize={{ minRows: 20, maxRows: 600 }}  placeholder="Content"/>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            保存
          </Button>
        </FormItem>
      </Form>
      </div>
      
    );
  }
}

DecisionDetail = Form.create()(DecisionDetail);

function mapStateToProps(state) {
  return {
    "decisions": state.decisions
  };
}

export default connect(mapStateToProps)(DecisionDetail)