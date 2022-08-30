import axios from "axios";

const API_URL = '/api/goals/';

//Create new Goal

const createGoal = async (goalData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    return response.data
}

const getGoal = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const deleteGoal = async (goalID, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalID, config)
    return response.data
}

const updateGoal = async (goalID, goalText, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + goalID, {text: goalText}, config)
    return response.data
}

const goalService = {
    createGoal,
    getGoal,
    deleteGoal,
    updateGoal,
}
export default goalService
