import React, { Component } from 'react'
//css modules会自动对样式文件中的所有的选择器命名
import styles from './index.module.scss'
import { Pagination } from 'antd'
export default class Layout extends Component {
    render() {
        return (
        <div>
            <div className={styles.aa}>
                <Pagination defaultCurrent={1} total={50} ></Pagination>
            </div>
        </div>
        )
    }
}