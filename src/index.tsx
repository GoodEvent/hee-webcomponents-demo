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
bindEventsMethods(['click']);
const declarations = [Main,Sidebar,Layout,Header,Card];
declarations.forEach(component => {
    customElements.define(component.mtagName,component);
});
// document.querySelector('#root-component').appendChild(new Layout());
