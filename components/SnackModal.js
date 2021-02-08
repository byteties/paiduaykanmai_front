import React,{useState,useEffect}from 'react';
import { Modal,Input,Dropdown,Menu,Button,InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const SnackModal = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  categorys,
  data,
  isEdit
  }) => {
  const [defaultValueName,setDefaultValueName] = useState('')
  const [defaultValueDes,setDefaultValueDes] = useState('')
  const [defaultValuePrice,setDefaultValuePrice] = useState('')
  const [defaultValueUnit,setDefaultValueUnit] = useState('')

  const [categoryData,setCategoryData] = useState([])
  const [categoryID,setCategoryID] = useState(null)
  const [categoryTitle,setCategoryTitle] = useState('ประเภทของสินค้า')

  const [name, setName] = useState(null)
  const [des, setDes] = useState(null)
  const [price, setPrice] = useState(null)
  const [unit, setUnit] = useState(null)

  const [isTypeName,setIsTypeName] = useState(false)
  const [isTypeDes,setIsTypeDes] = useState(false)
  const [isTypePrice,setIsTypePrice] = useState(false)
  const [isTypeUnit,setIsTypeUnit] = useState(false)

  useEffect(() => {
    setCategoryData(categorys)
    setDefaultValueName(data?.name)
    setDefaultValueDes(data?.description)
    setDefaultValuePrice(data?.price)
    setDefaultValueUnit(data?.unit)
  },[data])

  const handleMenuClick =(e)=> {
    const id = Number(e.key)
    setCategoryTitle(categoryData[id-1].name)
    setCategoryID(id)
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        categoryData.map((e)=>(
          <Menu.Item key={e._id}>
            {e.name}
          </Menu.Item>))
      }
    </Menu>
  );

  const onChangeName = (e) => {
    setIsTypeName(true)
    setName(e.target.value)
  }
  const onChangeDes = (e) => {
    setIsTypeDes(true)
    setDes(e.target.value)
  }
  const onChangePrice = (value) => {
    setIsTypePrice(true)
    setPrice(value)
  }
  const onChangeUnit = (e) => {
    setIsTypeUnit(true)
    setUnit(e.target.value)
  }

  const dataProcess = (data) =>{
    let tempName
    let tempDes
    let tempPrice
    let tempUnit
    if(data?.name){
      tempName = data?.name
    } else {
      tempName = defaultValueName
    }
    if(data?.description){
      tempDes = data?.description
    } else {
      tempDes = defaultValueDes
    }
    if(data?.price){
      tempPrice = data?.price
    } else {
      tempPrice = defaultValuePrice
    }
    if(data?.name){
      tempUnit = data?.unit
    } else {
      tempUnit = defaultValueUnit
    }
    return {...data,
      name:tempName,
      description:tempDes,
      price:tempPrice,
      unit:tempUnit
    }
  }

  return (
      <Modal title={title} 
      visible={isModalVisible}
      onOk={()=> {
        const temp = {_id:data._id,name,description:des,price,unit,categoryID}
        const newData = dataProcess(temp)
        setName(null)
        setDes(null)
        setPrice(null)
        setUnit(null)
        setCategoryTitle('ประเภทของสินค้า')
        setIsTypeName(false)
        setIsTypeDes(false)
        setIsTypePrice(false)
        setIsTypeUnit(false)
        console.log(newData)
        return handleOk(newData)
      }} 
      onCancel={handleCancel}>
        <Input onChange={onChangeName} value={(isEdit && !isTypeName)?defaultValueName:name} placeholder="ชื่อสินค้า"/>
        <Input onChange={onChangeDes} value={(isEdit && !isTypeDes)?defaultValueDes:des} placeholder="รายละเอียดสินค้า" />
        <InputNumber
          style={{width:'auto'}}
          formatter={value => `${value} บาท`}
         onChange={onChangePrice} 
         value={(isEdit && !isTypePrice)?defaultValuePrice:price} 
         placeholder="ราคา" />
        <Input onChange={onChangeUnit} value={(isEdit && !isTypeUnit)?defaultValueUnit:unit} placeholder="หน่วยสินค้า" />
        <Dropdown overlay={menu}>
          <Button>
            {categoryTitle} <DownOutlined />
          </Button>
        </Dropdown>
      </Modal>
  );
};

export default SnackModal
