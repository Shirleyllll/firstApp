import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio,Button, Select, DatePicker,Table ,Tag, Space } from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Option } = Select

export default class ArticleList extends Component {
    columns = [
        {
          title: '封面',
          render(data) {
              if(data.cover.type === 0){
                  return <div className="coverimg">暂无图片</div>
              }
              
              return <img className="coverimg" src={data.cover.images[0]} alt=""></img>
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '状态',
          dataIndex: 'status',
          render(status){
              const obj = ArticleStatus.find((item) => item.id === status)
              return <Tag color={obj.color}>{obj.name}</Tag>
          }
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
        },
        {
            title: '操作',
            // dataIndex: 'tags',
            render(data) {
                return (
                    <Space>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                    </Space>


                )
            }
        }
      ];
      
      
    state = {
        //频道列表数据
        channels: [],
        articles: {}
    }
    render() {
        const { total_count, results } = this.state.articles
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
                <Card title={`根据筛选条件工查询到${ total_count }条结果`}>
                    <Table columns={this.columns} dataSource={results} rowKey="id" />
                </Card>
            </div>
        )
    }

    componentDidMount() {
        // 同时发出两个请求
        this.getChannelList()
        this.getArticleList()
    }
    async getChannelList() {
        const res = await getChannels()
        this.setState({
            channels: res.data.channels
        })
    }

    async getArticleList () {
        const res2 = await getArticles()
        // console.log(res2)
        this.setState({
            articles: res2.data
        })
    }

    onFinish = (values) => [
        console.log(values)
    ]
}