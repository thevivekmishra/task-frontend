import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth.jsx'
const store = configureStore({
    reducer:{
        auth:authReducer,
    },
});

export default store