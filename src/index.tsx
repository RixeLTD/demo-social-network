import reportWebVitals from './reportWebVitals'
import store from './redux/redux-store'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {App} from './App'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {QueryParamProvider} from 'use-query-params'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
            <Provider store={store}>
                <App/>
            </Provider>
        </QueryParamProvider>
    </Router>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
