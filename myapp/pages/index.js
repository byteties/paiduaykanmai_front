import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Link from 'next/link'
import {SERVICE_URL} from '../config'
import { Button } from 'antd'
import 'antd/dist/antd.css';
import ShopModal from '../components/ShopModal'

export default function Home() {
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReload,setIsReload] = useState(false)
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (data) => {
    axios.post(`${SERVICE_URL}/shop`,data).then((res)=>{
      console.info('Create successfully!!!')
      setIsReload(!isReload)
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    axios.get(`${SERVICE_URL}/shops`).then((result)=>{
    setData(result.data)
  })
  }, [isReload])
  
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>paiduaykanmai shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to the shop!!!</a>
        </h1>

        <p className={styles.description}>
          ร้านค้าขนมและเครื่องดื่ม
        </p>

        <div className={styles.grid}>
          {
            data.map((shop)=>( 
              <Link href={`/shop/${shop._id}`}>
            <a className={styles.card}>
              <h3>{shop.name} &rarr;</h3>
              <p>{shop.description}</p>
              <p>เบอร์ติดต่อ : {shop.tel}</p>
              <p>ที่อยู่ : {shop.address}</p>
            </a></Link>))
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <Button type="primary" onClick={showModal}><a>เพิ่มร้านค้า</a></Button>
        <ShopModal 
        title="เพิ่มร้านค้าใหม่"
        isModalVisible={isModalVisible} 
        handleOk={handleOk} 
        handleCancel={handleCancel}/>
      </footer>
    </div>
  )
}
