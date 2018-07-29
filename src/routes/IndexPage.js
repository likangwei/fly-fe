import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import { Router, Route, Switch } from 'dva/router';
import LeadSteps from '../components/LeadSteps'
import Problems from '../components/problem/Problems'
import Reasons from '../components/reason/Reasons'
import ReasonDetail from '../components/reason/ReasonDetail'

import Points from '../components/point/Points'



const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const ReadMe = () => {
  return (
    <div>
      <pre>
      五步流程
      PDCA
      问题 -> 分析 -> 方案 -> 预期目标 -> 结果对比 -> 复盘
      存在的意义-> 愿景 -> 目标 -> 方案 -> 任务 -> 复盘
      引导很重要。 要有特别舒服的引导，躺着进化的感觉。
      要能展示出来自己的进步，形成正向激励
      </pre>
      
    </div>
  )
}

export class IndexPage extends React.Component{

  render(){
    let match = this.props.match
    console.log(match)
    let subnav = match.params.subnav || "5step"
    let option = match.params || ""

    return (
        <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">目标</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">
              <a target="_blank" href="https://k6cd7r.axshare.com">Axture</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['5step']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="5step" 
                title={<span><Icon type="laptop" />5步流程</span>}
              >
                <Menu.Item key="target">目标</Menu.Item>
                <Menu.Item key="found_question">
                  <Link to="/5step/problem">
                    发现问题
                  </Link>
                </Menu.Item>
                <Menu.Item key="reason">
                  <Link to="/5step/reason">
                    分析问题
                  </Link>
                </Menu.Item>
                <Menu.Item key="make_plan">制定方案</Menu.Item>
                <Menu.Item key="do">坚定执行</Menu.Item>
                <Menu.Item key="principle">总结原则</Menu.Item>
              </SubMenu>

              <SubMenu key="sub1" title={<span><Icon type="user" />引导</span>}>
                <Menu.Item key="1">
                  <Link to="/lead/1">
                    lead
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                 <Link to="/index">
                    index
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`${match.url}target`}>
                    目标
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" title={<span><Icon type="notification" />集点器</span>}>
                <Menu.Item key="collect_points">
                  <Link to={`/collect_points/points`}>
                    点
                  </Link>
                </Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{match.url}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route path="/lead/1" exact component={LeadSteps} />
              <Route path="/" exact component={ReadMe} />
              <Route path="/5step/problem" exact component={Problems} />
              <Route path="/5step/reason" exact component={Reasons} />
              <Route path="/5step/reason/:id" exact component={ReasonDetail} />
              <Route path="/collect_points/points" exact component={Points} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      );
  }
  
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
