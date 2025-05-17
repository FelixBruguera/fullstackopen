import { createSlice } from '@reduxjs/toolkit'
import { add, vote } from "./anecdoteReducer"

const notificationsReducer = createSlice({
    name: "notifications",
    initialState: "",
    reducers: {
        update(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add, (state, action) => {
            return `Successfully created ${action.payload}`
        })
        builder.addCase(vote, (state, action) => {
            return `Vote added to ${action.payload.content}`
        })
    }
})

export const { update } = notificationsReducer.actions
export default notificationsReducer.reducer