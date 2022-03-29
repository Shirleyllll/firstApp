import React from 'react';
import ReactDOM from 'react-dom';

//导入antd的全局样式
import 'antd/dist/antd.min.css'
import './index.css';
import App from './App';

//antd中文模式
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <ConfigProvider  locale={locale}>
        <App />
    </ConfigProvider>
,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//测量网页性能
// reportWebVitals();
