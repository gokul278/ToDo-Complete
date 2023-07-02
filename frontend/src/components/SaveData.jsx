import React, { useEffect, useState } from 'react'
import { Axios } from 'axios'
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { HashLoader } from 'react-spinners/HashLoader'
import { useDispatch } from 'react-redux'
import { updateDataValue } from '../features/Task_Redux'

export const SaveData = () => {

  const dispatch = useDispatch()

  const [userdata,setUserdata] = useState([])

  const [deleteData,setDeleteData] = useState({
    id:''
  })

  const [statusUpdate,setStatusUpdate] = useState({
    id:'',
    task:'',
    status:''
  })

  useEffect(()=>{
    Axios.get('https://todo-complete-backend.onrender.com/')
    .then(res=> {
      if(res.status === 200){
          if(res.data.length>0){
            setUserdata(res.data)
          }else{
            setUserdata([{
              _id:"novalue",
              task:"No Data",
              status:"No Data"
            }])
          }
      }
    })
  })

  let loadData;


  if(userdata.length === 0){
      loadData = <div className='row mt-5'>
      <div className='col-lg-12' align='center'>
        <HashLoader color="#ffca2c" />
      </div>
    </div>    
  }else{
    loadData = userdata.map((element) => {
      return (
            <div key={element._id}>
              {element._id === "novalue" ? (
                <div className='row'>
                <div className='col-lg-1'></div>
                <div className='col-lg-10 mt-3 mb-2' style={{backgroundColor:"#ffca2c",borderRadius:'10px'}}>
                <div className='row mt-3 mb-3'>
                  <div className='col-lg-12' align='center'>
                    <h5 style={{fontWeight:700}}>{element.task}</h5>
                  </div>
                </div>
                </div>
                </div>
              ) : (
                <div className='row'>
                  <div className='col-lg-1'></div>
              {element.status ? (
                <div className='col-lg-10 mt-3 mb-2' style={{backgroundColor:"#36AE7C",borderRadius:'10px'}}>
                <div className='row mt-3'>
                  <div className='col-lg-12' align='center'>
                    <h5 style={{fontWeight:700}}>{element.task}</h5>
                  </div>
                </div>
                <div className='row mt-3 mb-2'>
                  <div className='col-lg-12' align='center'>
                    <div className='row'>
                      <div className='col-lg-11'></div>
                      <div onClick={()=> setDeleteData({id:element._id})} className='col-lg-1'><i style={{cursor:"pointer"}} className="fa-sharp fa-solid fa-trash"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                <div className='col-lg-10 mt-3 mb-2' style={{backgroundColor:"#ffca2c",borderRadius:'10px'}}>
                <div className='row mt-3'>
                  <div className='col-lg-12' align='center'>
                    <h5 style={{fontWeight:700}}>{element.task}</h5>
                  </div>
                </div>
                <div className='row mt-3 mb-2'>
                  <div className='col-lg-12' align='center'>
                    <div className='row'>
                      <div className='col-lg-9'></div>
                      <div onClick={()=> setStatusUpdate({id:element._id,task:element.task,status:1})} className='col-lg-1'><i style={{cursor:"pointer"}} className="fa-solid fa-circle-check"></i></div>
                      <div onClick={()=> dispatch(updateDataValue({id:element._id,task:element.task,status:element.status}))} className='col-lg-1'><i style={{cursor:"pointer"}} className="fa-solid fa-pen-to-square"></i></div>
                      <div onClick={()=> setDeleteData({id:element._id})} className='col-lg-1'><i style={{cursor:"pointer"}}  className="fa-sharp fa-solid fa-trash"></i></div>
                    </div>
                  </div>
                </div>
              </div>
              )}
                </div>
              )}
            </div>
      );
    });
  }


  if(deleteData.id){
    Axios.delete(`https://todo-complete-backend.onrender.com/${deleteData.id}`)
    .then(res=> {
      if(res.status === 200){
        new Notify ({
          status: 'error',
          title: 'Success',
          text: '<h6>Task Deleted...!</h6>',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '<i class="fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i>',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 1500,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom',
          customWrapper: '',
        })
      }else{
        new Notify ({
          status: 'error',
          title: 'Error',
          text: '<h6>Try Again</h6>',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 1500,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom',
          customWrapper: '',
        })
      }
    })
    setDeleteData({
      id:''
    })
  }


  if(statusUpdate.id){
    Axios.patch(`https://todo-complete-backend.onrender.com/${statusUpdate.id}`,{task:statusUpdate.task,status:statusUpdate.status})
    .then(res => {
      if(res.status === 200){
        new Notify ({
          status: 'info',
          title: 'Success',
          text: '<h6>Task Finished ...!</h6>',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '<i class="fa-solid fa-check" style="color: #005eff;"></i>',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 1500,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom',
          customWrapper: '',
        })
      }else{
        new Notify ({
          status: 'error',
          title: 'Error',
          text: '<h6>Try Again</h6>',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 1500,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'left bottom',
          customWrapper: '',
        })
      }
    })
    setStatusUpdate({
      id:'',
      task:'',
      status:''
    })
    
  }


  return (
    <div className='col-lg-6' style={{height: '100vh',overflowX:'hidden',}}>
      {loadData}
    </div>
  )
}
