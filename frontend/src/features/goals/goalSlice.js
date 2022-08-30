import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
// import { getGoals } from "../../../../backend/controllers/goalControllers";
// import { useDispatch } from "react-redux";


const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
         || EvalError.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoal(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
         || EvalError.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async (goalID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(goalID, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
         || EvalError.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goals/update', async ({id, text}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.updateGoal(id, text , token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
         || EvalError.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState,     //We will reset to initial state. We did not do this in our auth
                                            //cause we didnt  want our user to get lost from our state.
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
                
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
                
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
                
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true
                
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.map((item, index) => {
                    if(item._id === action.payload._id) {
                        return {
                            ...item,
                            text: action.payload.text
                        }
                    }
                    return item
                })
                
                
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})

export const {reset} = goalSlice.actions
export default goalSlice.reducer