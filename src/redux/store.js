import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers 
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';

// const initialState = {}

const reduxThunk = thunk;

// const middleWare = [thunk];
// const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null


const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    data: dataReducer
});

const store = createStore(
    reducers,
    // initialState,
    applyMiddleware(reduxThunk)
    // compose(
    //     applyMiddleware(...middleWare), 
    //     devTools
    // )
);

export default store;