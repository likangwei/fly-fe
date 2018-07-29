import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;



class PointRelation extends React.Component {
  

  render() {
    let point = "为什么1+1=2"
    let whys = ["因为1", "因为2"， "因为3"]
    let sos = ["所有2+2=4"]
    
    return (
      <div>
      <p>{point}</p>
      {whys}
      {sos}
      </div>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);