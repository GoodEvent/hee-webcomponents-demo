import './styles/style.scss';
// import App from './App';
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render(
//     <div onClick={e=>{
//         console.log('parent');
//     }}><div onClick={e=>{
//         e.preventDefault();
//         console.log('child');
//     }}>fff</div></div>,
//     document.getElementById('root')
// )

import { bindEventsMethods } from './event-system';
import { store } from './redux';
import { Main } from './ee-main';
import { Sidebar } from './ee-sidebar';
import { Layout } from './ee-layout';
import { Header } from './ee-header';
import { Card } from './ee-card';
import { Login } from './ee-login';
import { Router, RouterOut } from './ee-router';
import { Search } from './page/ee-search';
import { Blank } from './page/ee-blank';
bindEventsMethods(['click']);
const declarations = [Main,Sidebar,Layout,Header,Card,Login,RouterOut,Router,Search,Blank];
declarations.forEach(component => {
    customElements.define(component.mtagName,component);
});
store.dispatch({ type: 'load', payload: location.pathname })
document.querySelector('#root-component').appendChild(new Router());
