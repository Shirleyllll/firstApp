import React, { Component } from 'react'
//css modules会自动对样式文件中的所有的选择器命名
import styles from './index.module.css'
export default class Layout extends Component {
    render() {
        return (
        <div>
            <div className={styles.aa}>首页布局组件</div>
            <div className={styles.bb}>bb</div>

        </div>
        )
    }
}