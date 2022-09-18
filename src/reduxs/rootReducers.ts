import { combineReducers } from '@reduxjs/toolkit'
import accountReducer from './accounts/account.slices';

const rootReducer = combineReducers({
    account: accountReducer,
})

export default rootReducer;