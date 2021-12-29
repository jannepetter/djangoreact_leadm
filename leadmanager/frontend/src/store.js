import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import leadsReducer from "./reducers/leadsReducer";

const reducer = combineReducers({
    leads: leadsReducer
})
const rootReducer = (state, action) => {
    if (action.type === 'LOGGED_OUT') {
        state = undefined;
    }

    return reducer(state, action);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store