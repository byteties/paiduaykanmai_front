import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import {SERVICE_URL} from '../../config'
import { Button,Modal } from 'antd'
import ShopModal from '../../components/ShopModal'
import 'antd/dist/antd.css';
import SnackModal from '../../components/SnackModal'
import { PlusOutlined } from '@ant-design/icons';

export default function Shop() {  
  const [snacks, setSnacks] = useState([])
  const [snack,setSnack] = useState({})
  const [categorys,setCategorys] = useState([])
  const [shop,setShop] = useState('')
  const router = useRouter()
  const { id } = router.query

  const [isShopModalVisible, setIsShopModalVisible] = useState(false);
  const [isSnackModalVisible, setIsSnackModalVisible] = useState(false);
  const [isReload,setIsReload] = useState(false)
  const [isEditSnack,setIsEditSnack] = useState(false)
  const [snackTitle,setSnackTitle] = useState('')

  useEffect(() => {
    axios.get(`${SERVICE_URL}/snacks?shopID=${id}`).then((result)=>{
      setSnacks(result.data)
    })
    axios.get(`${SERVICE_URL}/shop/${id}`).then((result)=>{
      setShop(result.data)
    })
    axios.get(`${SERVICE_URL}/categorys`).then((result)=>{
      setCategorys(result.data)
    })
  }, [id,isReload])

  const showShopModal = () => {
    setIsShopModalVisible(true);
  };

  const showAddSnackModal = () => {
    setSnackTitle("เพิ่มข้อมูลสินค้า")
    setIsEditSnack(false)
    setIsSnackModalVisible(true);
    setSnack({})
  };

  const showEditSnackModal = (data) => {
    setSnackTitle("แก้ไขข้อมูลสินค้า")
    setIsEditSnack(true)
    setIsSnackModalVisible(true);
    setSnack(data)
  };

  const shopOk = (data) => {
    axios.put(`${SERVICE_URL}/shop/${id}`,data).then((res)=>{
      console.info('Update successfully!!!')
      setIsReload(!isReload)
    })
    setIsShopModalVisible(false);
  };

  const shopCancel = () => {
    setIsShopModalVisible(false);
  };

  const snackOk = (data) => {
    if(isEditSnack){
      axios.put(`${SERVICE_URL}/snack/${data._id}`,{...data,shopID:id}).then((res)=>{
        console.info('Update successfully!!!')
        setIsReload(!isReload)
      })
    } else {
      axios.post(`${SERVICE_URL}/snack`,{...data,shopID:id}).then((res)=>{
        console.info('Create successfully!!!')
        setIsReload(!isReload)
      })
    }
    setSnack({})
    setIsSnackModalVisible(false);
  };

  const snackCancel = () => {
    setIsSnackModalVisible(false);
  };

  const confirm =(name,id)=> {
    Modal.confirm({
      title: 'ต้องการลบสินค้า',
      content: `คุณต้องการ ลบ ${name}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        axios.delete(`${SERVICE_URL}/snack/${id}`).then((result)=>{
          console.info('Create successfully!!!')
          setIsReload(!isReload)
          setSnack({})
        })
      },
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>paiduaykanmai shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a className={styles.card}>
          <h1 className={styles.title}>
            <a>{shop.name}</a>
          </h1>

          <p className={styles.description}>
            {shop.description}
          </p>
          <p className={styles.description}>
            เบอร์ติดต่อ : {shop.tel}
          </p>
          <p className={styles.description}>
            ที่อยู่ : {shop.address}
          </p>
        </a>
        <div className={styles.grid}>
          {
            snacks.map((snack)=>( 
            <a className={styles.card}>
              <h3>{snack.name} &rarr;</h3>
              <p>{snack.description}</p>
              <p>ราคา : {snack.price}</p>
              <p>หน่วยสินค้า : {snack.unit}</p>
              <Button type="primary" onClick={()=>showEditSnackModal(snack)}>
              แก้ไข
              </Button>
              <Button type="primary" danger onClick={()=>confirm(snack.name,snack._id)}>
              ลบ
              </Button>
            </a>))
          }
        </div>
        <Button
          type="dashed"
          onClick={showAddSnackModal}
          style={{ marginTop: '20px' }}
          icon={<PlusOutlined />}
        >
          เพิ่มข้อมูลสินค้า
        </Button>
      </main>

      <footer className={styles.footer}>
      <Button type="primary" onClick={showShopModal}><a>แก้ไขข้อมูลร้านค้า</a></Button>
        <ShopModal 
        title="แก้ไขข้อมูลร้าน"
        isModalVisible={isShopModalVisible} 
        handleOk={shopOk} 
        handleCancel={shopCancel}
        data={shop}/>

        <SnackModal 
          title={snackTitle}
          isModalVisible={isSnackModalVisible} 
          handleOk={snackOk} 
          handleCancel={snackCancel}
          categorys={categorys}
          data={snack}
          isEdit={isEditSnack}
          />
      </footer>
    </div>
  )
}
