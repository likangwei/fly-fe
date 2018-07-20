import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import { Router, Route, Switch } from 'dva/router';
import LeadSteps from '../components/LeadSteps'


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
    console.log(this.props)
    const {match} = this.props
    return (
        <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">目标</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
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
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route path="/lead/1" exact component={LeadSteps} />
              <Route path="/index" exact component={ReadMe} />
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
