import { Select } from "antd";
import React, { Component } from "react";
import { getChannels  } from "api/channel";
const { Option } = Select
export default class Channel extends Component {
    state = {
        //频道列表数据
        channels: [],
    }
    render() {

        //Form给组件提供了value和onChange
        console.log(this.props)
        return (
            <Select style={{ width: 200 }} placeholder="请选择文章频道" value={this.props.value} onChange={this.props.onChange}>
                {
                    this.state.channels.map((item) => (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    ))
                }
            </Select>
        )
    }

    componentDidMount() {
        // 同时发出两个请求
        this.getChannelList()
    }

    async getChannelList() {
        const res = await getChannels()
        this.setState({
            channels: res.data.channels
        })
    }
}