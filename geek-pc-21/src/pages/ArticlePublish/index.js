import React, { Component } from 'react'
import styles from './index.module.scss'
import { Breadcrumb, Button, Card,Form, Space, Input} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'

export default class ArticlePublish extends Component {

    render() {
        return (
            <div className={styles.articlePublish}>
                <Card 
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">首页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                发布文章
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                >
                    <Form 
                        labelCol={{ span: 4 }} 
                        wrapperCol={{ offset:4}}
                         size="large" 
                         onFinish={this.onFinish} 
                         validateTrigger={['onBlur','onChange']}
                         initialValues={{ title:'哈哈哈', channel_id: 4}}
                         >
                        <Form.Item label="标题" name="title" rules={[
                            {
                                required: true,
                                message: '文章标题不能为空'
                            }
                        ]}>
                            <Input style={{width: 400 }} placeholder="请输入文章标题"></Input>
                        </Form.Item>
                        <Form.Item label="频道" name="channel_id">
                            <Channel></Channel>
                        </Form.Item>
                        <Form.Item label="封面"></Form.Item>
                        <Form.Item label="标题"></Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" size="large">发布文章</Button>
                                <Button size="large">存入草稿</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    componentDidMount() {

    }

    onFinish = (values) => {
        console.log(values)
    }

}