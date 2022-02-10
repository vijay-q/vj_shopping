import { createStore } from "redux";
import shopReducer from "./shopReducer";

const store = createStore(shopReducer)

export default store