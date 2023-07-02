import { createSlice } from '@reduxjs/toolkit'

export const Task_Redux = createSlice({
    name: 'updateDataValue',
    initialState: {value: {id:'',task:'',status:''}},
    reducers:{
        updateDataValue: (state,action) =>{
            state.value = action.payload
        }
    }
})

export const {updateDataValue} = Task_Redux.actions;
export default Task_Redux.reducer;
