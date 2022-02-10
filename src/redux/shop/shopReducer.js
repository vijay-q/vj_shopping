import { BUY_ITEM } from "./shopTypes"
const initialState = {
    items:[{
        id:1,
        image:"smartwatch",
        name:"Smart Watch",
        sku:"SKU 12345",
        price:17,
        quantity:0
    },
    {
        id:2,
        image:"headset",
        name:"Headset",
        sku:"SKU 234324",
        price: 5,
        quantity:0
    },
    {
        id:3,
        image:"speaker",
        name:"Speaker",
        sku:"SKU 8978997",
        price:10,
        quantity:0
    }]
}

const shopReducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_ITEM : return {
            ...state,
        }
        default: return state
    }
}

export default shopReducer