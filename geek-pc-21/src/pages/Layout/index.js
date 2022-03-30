import React, { Component } from 'react'
//css modules会自动对样式文件中的所有的选择器命名
import { Layout, Menu, message, Popconfirm } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import Home from 'pages/Home';
import ArticleList from 'pages/ArticleList';
import ArticlePublish from 'pages/ArticlePublish'
import { HomeOutlined, DiffOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
import { removeToken } from 'utils/storage';
import { getUserProfile } from 'api/user';
const { Header, Content, Sider } = Layout;

export default class LayoutComponent extends Component {
    state = {
        profile:{}
    }
    render() {
        return (
            <div className={styles.layout}>
                <Layout>
                    <Header className="header">
                    <div className="logo" />
                    <div className="profile">
                        <span>{this.state.profile.mobile}</span>
                        <span>
                            <Popconfirm
                                title="确定要退出本系统吗"
                                onConfirm={this.onConfirm}
                                // onCancel={cancel}
                                okText="确定"
                                cancelText="取消"
                            >
                            <LoginOutlined /> 
                            {" "}退出

                            </Popconfirm>
                        </span>
                    </div>
                    </Header>
                    <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[this.props.location.pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="/home" icon={<HomeOutlined></HomeOutlined>}>
                                <Link to="/home">数据概览</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                                <Link to="/home/list">内容管理</Link>
                            </Menu.Item>
                            <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                                <Link to="/home/publish">发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px', overflow: 'auto' }}>
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

    async componentDidMount() {
        const res = await getUserProfile()
        console.log(res)
        this.setState({
            profile: res.data,

        })
    }
    //退出系统
    onConfirm = () => {
        // console.log("点击了确定按钮")
        //移除token
        // localStorage.removeItem('token')
        removeToken()
        //跳转到登录页
        this.props.history.push('/login')
        //提示消息
        message.success('退出成功')
    }
}