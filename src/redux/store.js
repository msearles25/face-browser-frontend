import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers 
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';

const initialState = {}

const middleWare = [thunk];

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    data: dataReducer
});

const store = createStore((
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleWare), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
));

export default store;