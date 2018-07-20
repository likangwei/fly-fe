import React from 'react'
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

const steps = [{
  title: '回顾目标',
  content: '回顾目标可以让你keep focus.',
}, {
  title: '调整状态',
  content: 'This is a description.',
}, 
  {
    title: '先做重要的事情',
    content: '总是会有各种原因导致你没有完成重要的事',
  },
  {
    title: '抬头看路',
    content: '埋头干活的时候，要学会抬头看路。',
  },
];

export default class LeadSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}