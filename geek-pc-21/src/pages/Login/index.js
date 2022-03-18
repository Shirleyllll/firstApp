import React, { Component } from 'react'
import { Card } from 'antd'
import './index.scss'
//引入图片方法
import logo from 'assets/logo.jpg'
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <Card className="login-container">
                    {/* 引入图片 */}
                    <img src={logo} alt="" />
                    <h1>我的校园</h1>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>

                </Card>
            </div>            
        )

    }
}