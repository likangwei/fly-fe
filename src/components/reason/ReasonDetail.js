import React from 'react';
import { connect } from 'dva';
import { 
  Input,
  Table,
  Pagination, 
  Popconfirm, 
  Button,
  Form,
} from 'antd';
import { routerRedux } from 'dva/router';
import FiveWhy from './FiveWhy'
const FormItem = Form.Item;


const { TextArea } = Input;
const PAGE_SIZE = 1000

const Why = () => {
  return (
    <FormItem
      id="control-mention"
      label="为什么"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Input value={val}/> 
    </FormItem>
  )
}

const Answser = (val) => {
  return (
    <FormItem
      id="control-mention"
      label="因为"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Input value={this.props.val}/> 
    </FormItem>
  )
}

class ReasonDetail extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      analysis: [""]
    }
  }

  addRecord = () => {
    let analysis = this.state.analysis
    analysis.push("")
    this.setState({analysis})
  }

  render(){
    const {list} = this.props
    let match = this.props.match
    console.log(match.params.id)
    let record = null
    for(let i=0; i<list.length; i++){
      let cell = list[i]
      if (cell.id == match.params.id){
        record = cell
        break
      }
    }
    if (record == null){
      return <div>无效的ID</div>
    }
    let analysis = this.state.analysis
    let analysisComp = []
    for (let i=0; i<analysis.length; i=i+1){
      let val = analysis[i]
      if (i%2 == 0){
        analysisComp.push(<Why val={val}/>)
      }else{
        analysisComp.push(<Answser val={val}/>)
      }
    }
    return (
      <Form layout="horizontal">
        reason detail
        <FiveWhy />
        <TextArea 
          placeholder="" 
          autosize={{ minRows: 2, maxRows: 600 }} 
        />
        {analysisComp}
        <Button type="primary" htmlType="submit" onClick={this.addRecord}>
            添加
        </Button>
        <Button type="primary" htmlType="submit">
            保存
        </Button>
      </Form>
    )
  }
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

export default connect(mapStateToProps)(ReasonDetail);
