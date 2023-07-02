import React from 'react'
import { FormInput } from '../components/FormInput'
import { SaveData } from '../components/SaveData'

export const ToDoPage = () => {
  return (
    <div className='container-fluid'>
        <div className='row'>
          <FormInput/>
          <SaveData/>
        </div>
    </div>
  )
}
