// import { store } from "..";
// import { getUserThunk } from "../redux";
// import d3 from "d3";

// export class Tree extends HTMLElement {
//     static mtagName = "ee-tree"
//     unsubscribe;
//     html: string;
//     constructor() {
//         // 必须首先调用 super 方法
//         super();
//         const shadow = this.attachShadow({ mode: 'open' });
//         this.unsubscribe = store.subscribe(() => {
//             let html = this.render(store.getState());
//             if (this.html !== html) {
//                 this.html = html;
//                 this.shadowRoot.innerHTML = html;
//             }
//             this.afterViewChecked();
//         });
//     }

//     chart(){
//             const root = tree(data);
          
//             let x0 = Infinity;
//             let x1 = -x0;
//             root.each(d => {
//               if (d.x > x1) x1 = d.x;
//               if (d.x < x0) x0 = d.x;
//             });
          
//             const svg = d3.create("svg")
//                 .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);
            
//             const g = svg.append("g")
//                 .attr("font-family", "sans-serif")
//                 .attr("font-size", 10)
//                 .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
              
//             const link = g.append("g")
//               .attr("fill", "none")
//               .attr("stroke", "#555")
//               .attr("stroke-opacity", 0.4)
//               .attr("stroke-width", 1.5)
//             .selectAll("path")
//               .data(root.links())
//               .join("path")
//                 .attr("d", d3.linkHorizontal()
//                     .x(d => d.y)
//                     .y(d => d.x));
            
//             const node = g.append("g")
//                 .attr("stroke-linejoin", "round")
//                 .attr("stroke-width", 3)
//               .selectAll("g")
//               .data(root.descendants())
//               .join("g")
//                 .attr("transform", d => `translate(${d.y},${d.x})`);
          
//             node.append("circle")
//                 .attr("fill", d => d.children ? "#555" : "#999")
//                 .attr("r", 2.5);
          
//             node.append("text")
//                 .attr("dy", "0.31em")
//                 .attr("x", d => d.children ? -6 : 6)
//                 .attr("text-anchor", d => d.children ? "end" : "start")
//                 .text(d => d.data.name)
//               .clone(true).lower()
//                 .attr("stroke", "white");
            
//             return svg.node();
//     }

//     get name() {
//         return this.getAttribute('name');
//     }

//     get age() {
//         return this.getAttribute('age');
//     }

//     add() {
//         store.dispatch({ type: 'add' });
//     }
//     add1() {
//         store.dispatch({ type: 'add1' });
//     }

//     render(state: { users: [], loading: boolean }) {
//         return `
//         <button (click)="tosearch()">tosearch</button>
//         <ee-progress></ee-progress>
//     `;

//     }

//     tosearch(){
//         store.dispatch({type:'push',payload:'/layout/search'})
//     }

//     afterViewChecked() {
//     }

//     connectedCallback() {
//         this.search();
//     }
//     disconnectedCallback() {
//         console.log('remove')
//         this.unsubscribe();
//     }
//     search() {
//         store.dispatch({ type: 'fetching' });
//         setTimeout(() => {
//             store.dispatch(getUserThunk());
//         }, 1000)
//     }

//     // static get observedAttributes() { return Object.keys(store.state); }


//     changeName($event, name, age) {
//         this.setAttribute('name', name + 1);
//     }
//     changeAge($event, name, age) {
//         this.setAttribute('age', age + 1);
//     }

//     attributeChangedCallback() {

//     }
// }
