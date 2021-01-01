import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {SERVICE_URL} from '../config'
import 'antd/dist/antd.css';

export default function Snacks() {
  const [snacks,setSnacks] = useState([])
  const [shops,setShops] = useState([])
  useEffect(() => {
    axios.get(`${SERVICE_URL}/snacks`).then((result)=>{
      setSnacks(result.data)
    })
    axios.get(`${SERVICE_URL}/shops`).then((result)=>{
      setShops(result.data)
    })
  })

  const processFromShop = (id) =>{
    const result = shops.filter(e => e._id === id);
    return result[0]?.name
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>paiduaykanmai shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to Shop Management</a>
        </h1>

        <p className={styles.description}>
          สินค้าทั้งหมดภายในระบบ
        </p>

        <div className={styles.grid}>
          {
            snacks.map((snack)=>( 
            <a className={styles.card}>
              <h3>{snack.name} &rarr;</h3>
              <p>{snack.description}</p>
              <p>ราคา : {snack.price}</p>
              <p>หน่วยสินค้า : {snack.unit}</p>
              <p>สินค้าจากร้าน : {processFromShop(snack.shopID)}</p>
            </a>))
          }
        </div>
      </main>
    </div>
  )
}
