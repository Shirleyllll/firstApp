
import {Router, Route, Switch,Redirect} from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
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
      </div>
    </Router>

  );
}

export default App;
