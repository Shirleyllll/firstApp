import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import './index.scss'
import { login } from 'api/user'
//引入图片方法
import logo from 'assets/logo.jpg'
export default class Login extends Component {

    onFinish = async ({ mobile, code }) => {
        try {
            const res = await login(mobile, code);
            console.log(res)
            //登录成功
            //1.保存token
            localStorage.setItem('token',res.data.token)
            //2.跳转到首页
            this.props.history.push('/home')
            //3.提示消息
            alert('登录成功')
        } catch(error) {
            console.log(error)
            alert(error.response.data)
        }

    }
    
    render() {

        return (
            <div className="login">
                <Card className="login-container">
                    {/* 引入图片 */}
                    <img src={logo} alt="" />
                    <Form 
                        size="large"
                        onFinish={this.onFinish}
                        initialValues={{
                            mobile:'13911111111',
                            code:'246810',
                            agree:true
                        }}

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
                                validator(rule, value){
                                    if (value) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(new Error('请阅读并同意'))
                                    }
                                }
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