import React, { Component } from 'react'
import styles from './index.module.scss'
import { Breadcrumb, Button, Card,Form, Space, Input, Radio, Upload} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
// import ReactQuill from 'react-quill'
import { PlusOutlined } from '@ant-design/icons'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
export default class ArticlePublish extends Component {
    state = {
        type:1,
        fileList: [
            {
                name:'image.png',
                status:'done',
                url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
        ]
    }

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
                         initialValues={{ title:'哈哈哈', channel_id: 4,type: 1}}
                         >
                        <Form.Item label="标题" name="title" rules={[
                            {
                                required: true,
                                message: '文章标题不能为空'
                            }
                        ]}>
                            <Input style={{width: 400 }} placeholder="请输入文章标题"></Input>
                        </Form.Item>
                        <Form.Item label="频道" name="channel_id" rules={[
                            {
                                required: true,
                                message: '请选择频道'
                            }
                        ]}>
                            <Channel></Channel>
                        </Form.Item>
                        <Form.Item label="封面" name="type">
                            <Radio.Group 
                            onChange={this.changeType} 
                            // value={value}
                            >
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                        wrapperCol={{offset: 4}}
                        >
                            {
                                this.state.type !== 0 && (
                                    <Upload 
                                    listType="picture-card" 
                                    fileList={this.state.fileList} 
                                    action={`${baseURL}upload`}
                                    name="image"
                                    onChange={this.uploadImage}
                                    >
                                        {
                                            this.state.fileList.length < this.state.type && <PlusOutlined></PlusOutlined>
                                        }
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item label="内容" name="content">
                            <ReactQuill theme="snow"></ReactQuill>
                        </Form.Item> */}
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

    changeType = (e) =>{
        this.setState({
            type: e.target.value,
            fileList: []
        })
    }
    uploadImage = ({fileList}) => {
         this.setState({
             fileList,
         })
    }

}