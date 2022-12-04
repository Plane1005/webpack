import React from 'react';
import { Layout } from 'antd';
import styles from './style.module.scss'

const { Header, Content, Sider } = Layout;

const LayoutWrap = () => {

    return (
        <Layout>
            <Header className={styles.header}></Header>

        </Layout>
    )
}