import React,{useState,useEffect}from 'react';
import { Modal,Input } from 'antd';

const ShopModal = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  data
  }) => {
  const [defaultValueName,setDefaultValueName] = useState('')
  const [defaultValueDes,setDefaultValueDes] = useState('')
  const [defaultValueTel,setDefaultValueTel] = useState('')
  const [defaultValueAddress,setDefaultValueAddress] = useState('')

  const [name, setName] = useState(data?.name)
  const [des, setDes] = useState(data?.description)
  const [tel, setTel] = useState(data?.tel)
  const [address, setAddress] = useState(data?.address)

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeDes = (e) => {
    setDes(e.target.value)
  }
  const onChangeTel = (e) => {
    setTel(e.target.value)
  }
  const onChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  useEffect(() => {
    setDefaultValueName(data?.name)
    setDefaultValueDes(data?.description)
    setDefaultValueTel(data?.tel)
    setDefaultValueAddress(data?.address)
  })
  return (
      <Modal title={title} 
      visible={isModalVisible} 
      onOk={()=> handleOk({name,description:des,tel,address})} 
      onCancel={handleCancel}>
        <Input onChange={onChangeName}  defaultValue={defaultValueName} placeholder="ชื่อร้าน"/>
        <Input onChange={onChangeDes}  defaultValue={defaultValueDes} placeholder="คำอภิบายร้าน" />
        <Input onChange={onChangeTel}  defaultValue={defaultValueTel} placeholder="เบอนร์ติดต่อ" />
        <Input onChange={onChangeAddress}  defaultValue={defaultValueAddress} placeholder="ที่อยู่" />
      </Modal>
  );
};

export default ShopModal
