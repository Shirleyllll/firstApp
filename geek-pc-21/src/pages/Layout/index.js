import React, { Component } from 'react'
//css modules会自动对样式文件中的所有的选择器命名
import { Layout, Menu } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import Home from 'pages/Home';
import ArticleList from 'pages/ArticleList';
import ArticlePublish from 'pages/ArticlePublish'
import { HomeOutlined, DiffOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
const { Header, Content, Sider } = Layout;

export default class LayoutComponent extends Component {
    render() {
        return (
            <div className={styles.layout}>
                <Layout>
                    <Header className="header">
                    <div className="logo" />
                    <div className="profile">
                        <span>用户名</span>
                        <span>
                            <LoginOutlined />
                            {" "}退出
                        </span>
                    </div>
                    </Header>
                    <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1" icon={<HomeOutlined></HomeOutlined>}>
                                <Link to="/home">数据概览</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DiffOutlined />}>
                                <Link to="/home/list">内容管理</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <Link to="/home/publish">发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        <Content
                        className="site-layout-background"
                        >
                            <Switch>
                                <Route exact path="/home" component={Home}></Route>
                                <Route path="/home/list" component={ArticleList} ></Route>
                                <Route path="/home/publish" component={ArticlePublish}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}