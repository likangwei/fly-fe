import React from 'react'
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

const steps = [
  {
    title: '为什么会发生？',
    content: '从“制造”的角度。',
  }, 
  {
    title: '为什么没有发现？',
    content: '从“检验”的角度。',
  }, 
  {
    title: '为什么没有从系统上预防事故？',
    content: '从“体系”或“流程”的角度。',
  },
];

export default class FiveWhy extends React.Component {
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