import { useEffect, useState } from 'react';
import './App.css'
import Axios from "axios"
import FormFild from './components/FormFild';

// Axios.default.baseURL="http://localhost:8080/"

const App = () => {
  const [dataList, setDataList] = useState([]) //to show list data
  const [addData, setAddData] = useState(false) //relevent to add data in first
  const [editSection ,setEditSection]=useState(false) //second
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id : ""
  })

  const handelChange = (e) => {
    const { name, value } = e.target
    const copyFildData = { ...formData }
    copyFildData[name] = value
    setFormData(copyFildData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(formData);

    const userData = await Axios.post("http://localhost:8080/create", formData)
    console.log(userData.data);

    if (userData.data.success) {
      setAddData(false)
      getFetchData()
      alert(userData.data.message)
    }
  }

  const getFetchData = async () => {
    const data = await Axios.get("http://localhost:8080/")
    // console.log(data.data.data); 
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])

  // console.log(dataList);

  const handelDelete = async (id) => {
    const data = await Axios.delete(`http://localhost:8080/delete/${id}`)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }

    //   try {
    //     const data = await Axios.delete(`http://localhost:8080/delete/${id}`);
    //     if (data.data.success) {
    //         getFetchData();
    //         alert(data.data.message);
    //     }
    // } catch (error) {
    //     console.error("Error deleting user:", error);
    // }
  }  

  const handelUpdate=async(e)=>{
    console.log(formDataEdit);
    
    e.preventDefault()
    const data = await Axios.patch("http://localhost:8080/update", formDataEdit)
    setEditSection(false)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }

  const handelEditChange=(e)=>{
    const {name , value} = e.target
    const copyData = {...formDataEdit}
    copyData[name]=value
    setFormDataEdit(copyData)
  }
  const handelEdit=(el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <button onClick={() => setAddData(true)} className='text-white border-white border-4 p-4 rounded-lg absolute top-3 left-9'>Add</button>
      {
        addData && (
         <FormFild
         handleSubmit={handleSubmit}
         handelChange={handelChange}
         handelClose={()=>setAddData(false)}
         rest={formData}
         />
        )
      }
      {
        editSection && (
          <FormFild
         handleSubmit={handelUpdate}
         handelChange={handelEditChange}
         handelClose={()=>setEditSection(false)}
         rest={formDataEdit}
         />
        )
      }
      <div className='flex flex-wrap mt-20'>
        {dataList[0] ? (

          dataList.map((el) => (
            <div className='flex border-2 p-4 rounded-lg  m-8'>
              <div className='flex flex-col'>
                <span>Name  : {el.name}</span>
                <span>Email : {el.email}</span>
                <span>mobile: {el.mobile}</span>
                <span>{el.createdAt}</span>
                <div className='flex gap-48 mt-4'>
                  <button onClick={()=>handelEdit(el)} className='bg-green-950 hover:bg-green-900 hover:text-white hover:shadow-green-600 shadow-lg pl-4 p-1 pr-4 rounded-lg'>Edit</button>
                  <button onClick={() => handelDelete(el._id)} className='bg-red-950 hover:bg-red-900 hover:text-white hover:shadow-red-600 shadow-lg pl-4 p-1 pr-4 rounded-lg' >Delete</button>
                </div>
              </div>
            </div>
          ))
        ):<p className='text-8xl translate-x-0 shadow-lg shadow-neutral-700'> NO DATA AVAILABLE</p>
        }
      </div>
    </div >
  )
}

export default App