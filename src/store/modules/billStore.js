import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
        addBill(state, action) {
            state.billList.push(action.payload);
        }
    }
})

const { setBillList, addBill } = billStore.actions;

// 编写异步action
const getBillList = () => {
    return async (dispatch) => {

        const res = await fetch("http://localhost:6174/ka");
        const data = await res.json();
        /* const data = [
            {
                "type": "pay",
                "money": -99,
                "date": "2022-10-24 10:36:42",
                "useFor": "drinks",
                "id": 1
            },
            {
                "type": "pay",
                "money": -88,
                "date": "2022-10-24 10:37:51",
                "useFor": "longdistance",
                "id": 2
            },
            {
                "type": "income",
                "money": 100,
                "date": "2022-10-22 00:00:00",
                "useFor": "bonus",
                "id": 3
            },
            {
                "type": "pay",
                "money": -33,
                "date": "2022-09-24 16:15:41",
                "useFor": "dessert",
                "id": 4
            },
            {
                "type": "pay",
                "money": -56,
                "date": "2022-10-22T05:37:06.000Z",
                "useFor": "drinks",
                "id": 5
            },
            {
                "type": "pay",
                "money": -888,
                "date": "2022-10-28T08:21:42.135Z",
                "useFor": "travel",
                "id": 6
            },
            {
                "type": "income",
                "money": 10000,
                "date": "2024-03-20T06:45:54.004Z",
                "useFor": "salary",
                "id": 7
            },
            {
                "type": "pay",
                "money": -10,
                "date": "2024-03-22T07:17:12.531Z",
                "useFor": "drinks",
                "id": 8
            },
            {
                "type": "pay",
                "money": -20,
                "date": "2024-03-22T07:51:20.421Z",
                "useFor": "dessert",
                "id": 9
            },
            {
                "type": "pay",
                "money": -100,
                "date": "2024-03-22T09:18:12.898Z",
                "useFor": "drinks",
                "id": 17
            },
            {
                "type": "pay",
                "money": -50,
                "date": "2024-03-23T09:11:23.312Z",
                "useFor": "food",
                "id": 18
            },
            {
                "type": "pay",
                "money": -100,
                "date": "2024-04-04T03:03:15.617Z",
                "useFor": "drinks",
                "id": 19
            },
            {
                "type": "pay",
                "money": -100,
                "date": "2024-04-02T16:00:00.000Z",
                "useFor": "food",
                "id": 20
            },
            {
                "type": "income",
                "money": 10000,
                "date": "2024-02-28T16:00:00.000Z",
                "useFor": "salary",
                "id": 21
            },
            {
                "type": "pay",
                "money": -100,
                "date": "2024-11-02T16:00:00.000Z",
                "useFor": "drinks",
                "id": 22
            },
            {
                "type": "pay",
                "money": -100,
                "date": "2024-11-02T16:00:00.000Z",
                "useFor": "drinks",
                "id": 23
            }
        ] */
        dispatch(setBillList(data));
    }
}

const addBillList = (data) =>{
    return async (dispatch) => {
        const res = await axios.post('http://localhost:6174/ka', data)
        dispatch(setBillList(res.data));
    }
}

export { getBillList, addBillList }
const reducer = billStore.reducer;

export default reducer