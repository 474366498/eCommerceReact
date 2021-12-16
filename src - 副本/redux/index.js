import { createStore ,combineReducers ,applyMiddleware , compose } from 'redux';
import HomeReduce from './home/reduce.js';
import AdviceReduce from './advice/reduce.js' ;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const reducer = combineReducers({
   HomeReduce ,
   AdviceReduce
})
const store = createStore(reducer,composeEnhancers(applyMiddleware())) ;

export default store;