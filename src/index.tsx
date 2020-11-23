import './styles/style.global.scss';
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

import { bindEventsMethods } from 'hee-event-system';
import { store } from './redux';
import { Main } from './ee-main';
import { Sidebar } from './ee-sidebar';
import { Layout } from './ee-layout';
import { Header } from './ee-header';
import { Card } from './component/ee-card';
import { Login } from './ee-login';
import { Router, RouterOut } from './ee-router';
import { Search } from './page/ee-search';
import { Blank } from './page/ee-blank';
bindEventsMethods(['click']);
const declarations = [Main,Sidebar,Layout,Header,Card,Login,RouterOut,Router,Search,Blank];
declarations.forEach(component => {
    customElements.define(component.mtagName,component);
});
document.querySelector('#root-component').appendChild(new Router());
