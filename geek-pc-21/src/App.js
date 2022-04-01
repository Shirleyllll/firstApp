
import {Router, Route, Switch,Redirect} from 'react-router-dom'
import React from 'react'

import Home from './pages/Layout'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'
import { Suspense } from 'react'


// import Login from './pages/Login'
// import LayoutComponent from './pages/Layout'
const Login = React.lazy(() => import('pages/Login'))
const LayoutComponent = React.lazy(() => import('pages/Layout'))

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
        {/* fallback兜底 如果组件还没有加载，默认会显示fallback的内容 */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {/* redirect指定from时必须写到switch里面 */}
            <Redirect exact from="/" to='/home'></Redirect>
            <AuthRoute path="/home" component={Home}></AuthRoute>
            <Route path="/login" component={Login}></Route>
            {/* render方法需要传入props */}
            {/* <Route path="/login" render={(props) => {

              return <Login {...props} />
            }}></Route> */}
            {/* 1. route组件可以不使用component，使用render属性 */}
            {/* 配置一个404组件 */}
          </Switch>
        </Suspense>
      </div>
    </Router>

  );
}

export default App;
