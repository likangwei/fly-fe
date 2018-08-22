import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import {connect} from 'dva'
const { TextArea } = Input;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChoseDetail extends React.Component {

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
      type: 'choses/fetch',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'choses/patch',
          payload: {id: this.state.Id, values},
        });
      }
    });
  }

  render() {
    console.log("render")
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {list} = this.props
    let record_id = this.state.Id
    
    let records = list.filter(function(x){return x.Id==record_id})
    if(records.length != 1){
      return <div>not found {this.state.Id}</div>
    }
    let {Title, Content} = records[0]
    const titleError = isFieldTouched('title') && getFieldError('title');
    const contentError = isFieldTouched('content') && getFieldError('content');
    return (
      <div>
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

ChoseDetail = Form.create()(ChoseDetail);

function mapStateToProps(state) {
  const { list, total, page, alert} = state.options;
  return {
    list
  };
}

export default connect(mapStateToProps)(ChoseDetail)