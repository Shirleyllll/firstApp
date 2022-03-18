import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd'
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
                    <Form size="large">
                        <Form.Item>
                            <Input placeholder="请输入你的手机号"/>
                        </Form.Item>

                        <Form.Item>
                            <Input placeholder="请输入验证码" />
                        </Form.Item>

                        <Form.Item valuePropName="checked">
                            <Checkbox>我已阅读并同意</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                        </Form>

                </Card>

            </div>            
        )

    }
}