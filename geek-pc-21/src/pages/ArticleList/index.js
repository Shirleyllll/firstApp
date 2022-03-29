import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio,Button, Select, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'


const { RangePicker } = DatePicker
const { Option } = Select

export default class ArticleList extends Component {
    state = {
        //频道列表数据
        channels: [],
    }
    render() {
        return (
            <div className={styles.root}>
                <Card 
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">首页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>文章列表</Breadcrumb.Item>

                        </Breadcrumb>
                    }
                >
                    {/* 表单 */}
                    <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
                        <Form.Item label="状态" name="status">
                            <Radio.Group>
                                {
                                    ArticleStatus.map((item) => (
                                        <Radio value={item.id} key={item.id}>{item.name}</Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="频道" name="channel_id">
                            <Select style={{ width: 200 }} placeholder="请选择文章频道">
                                {
                                    this.state.channels.map((item) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="日期" name="date">
                            <RangePicker></RangePicker>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">筛选</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    async componentDidMount() {
        const res = await getChannels()
        this.setState({
            channels: res.data.channels
        })
    }

    onFinish = (values) => [
        console.log(values)
    ]
}