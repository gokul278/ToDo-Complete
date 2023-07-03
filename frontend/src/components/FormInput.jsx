import React, { useEffect, useState } from 'react'
import { Axios } from 'axios'
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { useSelector,useDispatch } from 'react-redux'
import { updateDataValue } from '../features/Task_Redux'

export const FormInput = () => {


  const dispatch = useDispatch();

  const [detail,setDetail] = useState({
    task:'',
    status:0
  })

  const [topic,setTopic] = useState({
    heading:'Add ToDoList',
    btnName:'Submit'
  })

  const [errormessage,setErrormessage] = useState({
    style:'',
    value:''
  })

  const handlechange = (event) =>{
    setDetail({
      ...detail,
      [event.target.name]:event.target.value
    })
    setErrormessage({
      style:'',
      value:''
    })
  }

  const updateValue = useSelector(state=>state.updateDataValue.value)

  useEffect(()=>{
    if(updateValue.id){
      setDetail({
        task:updateValue.task
      })
      setTopic({
        heading:"Update ToDoList",
        btnName:"Update"
      })

    }
  },[updateValue.id , updateValue.task])

  const submitbtn = () =>{
    if(detail.task){
      if(topic.btnName === "Update"){
        Axios.patch(`https://todo-complete-backend.onrender.com/${updateValue.id}`,{task:detail.task,status:updateValue.status})
        .then(res => {
          if(res.status === 200){
            new Notify ({
              status: 'success',
              title: 'Success',
              text: '<h6>Task Updated...!</h6>',
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

            setDetail({
              task:'',
              status:0
            })

            setTopic({
              heading:'Add ToDoList',
              btnName:'Submit'
            })

            dispatch(updateDataValue({id:'',task:'',status:''}))
          }  
        })
      }else{
        Axios.post('https://todo-complete-backend.onrender.com/',{task:detail.task,status:detail.status})
      .then(res => {
        if(res.status === 200){
          new Notify ({
            status: 'success',
            title: 'Success',
            text: '<h6>Task Added...!</h6>',
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

          setDetail({
            task:'',
            status:0
          })
        }
      })
      }
    }else{
      setErrormessage({
        style:'pt-2 pb-1',
        value:'Enter the Task'
      })
    }
  }

  console.log(detail);

  const cancelbtn = () =>{
    setDetail({
      task:'',
      status:''
    })

    setTopic({
      heading:'Add ToDoList',
      btnName:'Submit'
    })

    dispatch(updateDataValue({id:'',task:'',status:''}))
  }

  return (
    <div className='col-lg-6' >
      <div className='row mt-5'>
        <div className='col-lg-1'></div>
        <div className='col-lg-10' style={{backgroundColor:"#27374D",borderRadius:'10px'}}>
        <div className='row'>
            <div className='col-lg-12 mt-5' align='center'>
              <h2 style={{color:"white",fontWeight:'700'}}>{topic.heading}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10 mt-5'>
              <label htmlFor=""><h4 style={{color:"white",fontWeight:'700'}}>Event</h4></label>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10 mt-2'>
              <input type="text" onChange={handlechange} value={detail.task} name="task" className="form-control" placeholder="Enter the Event" />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-lg-1'></div>
            <div className='col-lg-10' align="center">
              {errormessage.value && (
                <div className={errormessage.style} style={{backgroundColor:"#ED2B2A",borderRadius:'5px'}}>
                <h5>{errormessage.value}</h5>
                </div>
              )}
              {!errormessage.value && (
                <div >
                </div>
              )}
            </div>
          </div>
          
            {updateValue.id ? (
              <div className='row'>
              <div className='col-lg-7'></div>
              <div className='col-lg-2 mt-5 mb-5' align='center'>
              <button className='btn btn-warning' style={{fontWeight:700}} onClick={submitbtn}>{topic.btnName}</button>
              </div>
              <div className='col-lg-2 mt-5 mb-5' align='center'>
              <button className='btn btn-danger' style={{fontWeight:700}} onClick={cancelbtn}>Close</button>
              </div>
              </div>
            ) : (
              <div className='row'>
              <div className='col-lg-12 mt-5 mb-5' align='center'>
              <button className='btn btn-warning' style={{fontWeight:700}} onClick={submitbtn}>{topic.btnName}</button>
             </div>
             </div>
            )}
            
          
        </div>
      </div>
    </div>
  )
}
