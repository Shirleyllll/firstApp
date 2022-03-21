import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import './index.scss'
//引入图片方法
import logo from 'assets/logo.jpg'
export default class Login extends Component {
    onFinish = values => {
        console.log(values);
      };
    render() {

        return (
            <div className="login">
                <Card className="login-container">
                    {/* 引入图片 */}
                    <img src={logo} alt="" />
                    <Form 
                        size="large"
                        onFinish={this.onFinish}

                    >
                        <Form.Item
                        // validateTrigger={['onChange','onBlur']}
                            name="mobile"
                            rules={[
                                { 
                                    required: true, 
                                    message: '不能为空' 
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message:'手机号格式错误',
                                    validateTrigger:'onBlur'
                                }
                            ]}
                        >
                            <Input placeholder="请输入手机号" autoComplete="off"/>
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            {
                                required: true,
                                message:"验证码不能为空",
                            },
                            {
                                pattern: /^\d{6}$/,
                                message: "验证码格式错误"
                            }
                        ]}>
                            <Input placeholder="请输入验证码" />
                        </Form.Item>

                        <Form.Item valuePropName="checked" name="agree" rules={[
                            {
                                required:true,
                                message:"请阅读并同意协议"
                            }
                        ]}>
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