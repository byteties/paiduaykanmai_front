import React,{useState,useEffect}from 'react';
import { Modal,Input,Dropdown,Menu,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios'
import { SERVICE_URL } from '../config'

const SnackModal = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  categorys
  }) => {
  const [categoryData,setCategoryData] = useState([])
  const [name, setName] = useState(null)
  const [des, setDes] = useState(null)
  const [price, setPrice] = useState(null)
  const [unit, setUnit] = useState(null)

  useEffect(() => {
    setCategoryData(categorys)
  }, [categorys])
  const handleMenuClick =(e)=> {
    alert('Click on menu item.');
    console.log('click', e);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        categorys.map((e)=>{
          <Menu.Item key={e._id}>
            {e.name}
          </Menu.Item>
        })
      }
    </Menu>
  );

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeDes = (e) => {
    setDes(e.target.value)
  }
  const onChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const onChangeUnit = (e) => {
    setUnit(e.target.value)
  }

  return (
      <Modal title={title} 
      visible={isModalVisible} 
      onOk={()=> handleOk({name,description:des,price,unit})} 
      onCancel={handleCancel}>
        <Input onChange={onChangeName} placeholder="ชื่อสินค้า"/>
        <Input onChange={onChangeDes} placeholder="รายละเอียดสินค้า" />
        <Input onChange={onChangePrice} placeholder="ราคา" />
        <Input onChange={onChangeUnit} placeholder="หน่วยสินค้า" />
        <Dropdown overlay={menu}>
          <Button>
            ประเภทของสินค้า <DownOutlined />
          </Button>
        </Dropdown>
      </Modal>
  );
};

export default SnackModal
