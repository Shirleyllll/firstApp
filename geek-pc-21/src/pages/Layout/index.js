import React, { Component } from 'react'
//css modules会自动对样式文件中的所有的选择器命名
import { Layout, Menu, message, Popconfirm } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';

// import Home from 'pages/Home';
// import ArticleList from 'pages/ArticleList';
// import ArticlePublish from 'pages/ArticlePublish'
import { HomeOutlined, DiffOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
import { removeToken } from 'utils/storage';
import { getUserProfile } from 'api/user';
const { Header, Content, Sider } = Layout;

const Home = React.lazy(() => import('pages/Home'))
const ArticleList = React.lazy(() => import('pages/ArticleList'))
const ArticlePublish = React.lazy(() => import('pages/ArticlePublish'))
export default class LayoutComponent extends Component {
    state = {
        profile:{},
        selectedKey:this.props.location.pathname
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
                        selectedKeys={[this.state.selectedKey]}
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
                            {/* 在这个里面切换路由 */}
                            <Switch>
                                <Route exact path="/home" component={Home}></Route>
                                <Route path="/home/list" component={ArticleList} ></Route>
                                {/* 新增的路由 要加exact不然带id的路由永远会渲染这里 */}
                                <Route exact path="/home/publish" component={ArticlePublish} key="add"></Route>
                                {/* 修改的路由 */}
                                <Route path="/home/publish/:id" component={ArticlePublish} key="edit"></Route>
                            </Switch>
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }

    //组件更新完成的钩子函数。。。路由变化完成了，组件也是会重新渲染
    //prevProps: 上一次的props
    componentDidUpdate(prevProps) {
        // 判断是否是url地址放生了变化，如果是，才更新
        let pname = this.props.location.pathname
        if (pname !== prevProps.location.pathname){
            //考虑修改文章的高亮问题
            // if(pathname.startsWith('/home/publish')){
            //     pathname = '/home/publish'
            // }
            if(pname.startsWith('/home/publish')){
                pname = '/home/publish'
            }
            this.setState({
                selectedKey: pname
            })
        }
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