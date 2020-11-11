import './styles/style.scss';
// import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
    <div onClick={e=>{
        console.log('parent');
    }}><div onClick={e=>{
        e.preventDefault();
        console.log('child');
    }}>fff</div></div>,
    document.getElementById('root')
)

import './ee-layout'
import './ee-header'
import './ee-main'
import './ee-sidebar'
import { bindEventsMethods } from './event-system';
bindEventsMethods(['click']);