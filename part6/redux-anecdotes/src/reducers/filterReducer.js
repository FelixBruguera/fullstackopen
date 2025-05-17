import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: "filters",
    initialState: "",
    reducers: {
        changeFilter(state, action) {
            return action.payload
        }
    }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer