import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio,Button, DatePicker,Table ,Tag, Space } from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getArticles } from 'api/article'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Channel from 'components/Channel'

const { RangePicker } = DatePicker

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
            render:(data) => {
                return (
                    <Space>
                        <Button 
                        type="primary"
                         shape="circle" 
                         icon={<EditOutlined />} 
                         onClick={() => this.handleEdit(data.id)} 
                         />
                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                    </Space>
                )
            }
        }
      ];
    // 用于存放查询文章列表的所有的参数
    reqParams = {
        page:1,
        per_page:10
    }
      
    state = {
        //频道列表数据
        articles: {}
    }
    render() {
        const { total_count, results, per_page, page } = this.state.articles
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
                            <Channel></Channel>
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
                    <Table 
                        columns={this.columns} 
                        dataSource={results} 
                        rowKey="id"
                        pagination={{
                            position: ['bottomCenter'],
                            total: total_count,
                            pageSize : per_page,
                            current: page,
                            onChange: this.onChange
                        }} 
                        />
                </Card>
            </div>
        )
    }
    onChange = (page, pageSize) => {
        this.reqParams.page = page
        this.reqParams.per_page = pageSize
        this.getArticleList()
    }
    componentDidMount() {
        // 同时发出两个请求
        this.getArticleList()
    }

    async getArticleList () {
        const res2 = await getArticles(this.reqParams)
        // console.log(res2)
        this.setState({
            articles: res2.data
        })
    }
    handleEdit = (id) => {
        this.props.history.push(`/home/publish/${id}`)
    }
    onFinish = ({status, channel_id,date}) => {
        if(status !== -1){
            this.reqParams.status = status
        } else {
            delete this.reqParams.status
        }
        if(channel_id !== undefined) {
            this.reqParams.channel_id = channel_id
        }
        if(date) {
            this.reqParams.begin_pubdate = date[0]
            .startOf('day').format('YYYY-MM-DD HH:mm:ss')
            this.reqParams.end_pubdate = date[1]
            .startOf('day').format('YYYY-MM-DD HH:mm:ss')


        }
        console.log(this.reqParams)
        this.reqParams.page=1
        this.getArticleList()

    }
}