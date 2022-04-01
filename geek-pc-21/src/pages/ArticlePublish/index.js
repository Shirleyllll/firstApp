import React, { Component } from 'react'
import styles from './index.module.scss'
import { Breadcrumb, Button, Card,Form, Space, Input, Radio, Upload, Modal, message} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import { PlusOutlined } from '@ant-design/icons'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
import { getArticleById, updateArticle } from 'api/article'

// import { addArticle } from 'api/article'
export default class ArticlePublish extends Component {
    state = {
        type:1,
        fileList: [
            {
                name:'image.png',
                status:'done',
                url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
        ],
        showPreview: false,
        previewUrl:'',
        id: this.props.match.params.id
    }
    formRef = React.createRef()
    render() {
        console.log(this.props)
        return (
            <div className={styles.articlePublish}>
                <Card 
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">首页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.state.id ? '编辑文章': '发布文章'}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                >
                    <Form 
                        ref={this.formRef}
                        labelCol={{ span: 4 }} 
                        wrapperCol={{ offset:4}}
                         size="large" 
                         onFinish={this.onFinish} 
                         validateTrigger={['onBlur','onChange']}
                        //  initialValues={{ title:'哈哈哈', channel_id: 4,type: 1}}
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
                                    onPreview={this.handlePreview}
                                    beforeUpload={this.beforeUpload}
                                    >
                                        {
                                            this.state.fileList.length < this.state.type && <PlusOutlined></PlusOutlined>
                                        }
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="内容" name="content">
                            {/* <ReactQuill theme="snow"></ReactQuill> */}
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" size="large">发布文章</Button>
                                <Button size="large"  onClick={this.addDraft}>存入草稿</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
                <Modal
                visible={this.state.showPreview}
                title={'图片预览'}
                footer={null}
                onCancel={this.handleCancel}
                >
                    <img src={this.state.previewUrl} style={{ width: '100%' }} alt="example" />
                </Modal>
            </div>
        )
    }

    async componentDidMount() {
        if(this.state.id) {
            //需要发请求
            const res = await getArticleById(this.state.id)
            console.log(res,'data')
            const values = {
                ...res.data,
                type: res.data.cover.type
            }
            console.log(this.formRef)

            this.formRef.current.setFieldsValue(values)
            const fileList = res.data.cover.images.map(item => {
                return {
                    url: item,
                }
            })
            this.setState({
                fileList,
                type: res.data.cover.type
            })

        }
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
    handlePreview = (file) => {
        // console.log(file)
        const url = file.url || file.response.data.url
        this.setState({
            showPreview: true,
            previewUrl: url
        })
    }

    handleCancel = () =>{
        this.setState({
            showPreview: false,
            previewUrl: ''
        })
    }

    beforeUpload = (file) => {
        if(file.size >= 1024*500) {
            message.warn('上传的文件不能超过500kb')
            return Upload.LIST_IGNORE
        }
        if(!['image/png','image/jpeg'].includes(file.type)) {
            message.warn('只能上传jpg或者png的图片')
            return Upload.LIST_IGNORE
        }
        return true
    }
    save = async (values, draft) => {
        console.log(values)
        const {fileList, type} = this.state
        if(fileList.length !== type){
            message.warn('上传图片数量不正确')
        }
        const images = fileList.map(item => {
            return item.url || item.response.data.url
        })
        // if( this.state.id) {
        //     //修改
        //     const res= await updateArticle({
        //         ...values,
        //         cover: {
        //             type,
        //             images
        //         },
        //         id:this.state.id
        //     }, draft)
        //     message.success('修改成功');

        // } else {
        // //添加文章
        //     const res = await addArticle({
        //         ...values,
        //         cover: {
        //             type,
        //             images
        //         }
        //     }, draft)
        //     message.success('添加成功');
        // }

        this.props.history.push('/home/list');
    }
    onFinish = (values) => {
        this.save(values,false)
    }
    addDraft = async () => {
        // console.log('添加草稿')
        const values = await this.formRef.current.validateFields()
        console.log(values)
        this.save(values,true)
    }
}