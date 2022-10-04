import{a as g,m as C}from"./Alert.c90547c0.js";import{v as T,c as H,S as h}from"./sweetalert2.all.c9172487.js";function $(e){const t={weekday:"long",year:"numeric",month:"long",day:"numeric"},n=new Date(e),o=n.getMonth(),a=n.getDate()+2,c=n.getFullYear();return new Date(Date.UTC(c,o,a)).toLocaleDateString("es-ES",t)}function F(){let e=new Date,t=e.getFullYear(),n=e.getDate(),o=e.getMonth();if(o=o+1,o<10)var a="0"+o;else var a=o.toString;document.querySelector("#fecha").min=t+"-"+a+"-"+n}let s=1,I=1,P=3;const l={nombre:"",fecha:"",hora:"",servicios:[]},y=document.querySelector(".listado-citas");document.addEventListener("DOMContentLoaded",function(){A()});function A(){T(),S(),M(),L(),O(),j(),k(),R(),w(),N(),F(),V(),q(),H()}function S(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar"),document.querySelector(`#paso-${s}`).classList.add("mostrar");const n=document.querySelector(".actual");n&&n.classList.remove("actual"),document.querySelector(`[data-paso="${s}"]`).classList.add("actual"),w()}function M(){document.querySelectorAll(".tabs button").forEach(t=>{t.addEventListener("click",function(n){s=parseInt(n.target.dataset.paso),S(),L()})})}function L(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");s===1?(e.classList.add("ocultar-paginador"),t.classList.remove("ocultar-paginador")):s===3?(e.classList.remove("ocultar-paginador"),t.classList.add("ocultar-paginador"),q()):s===4?(e.classList.add("ocultar-paginador"),t.classList.add("ocultar-paginador")):(e.classList.remove("ocultar-paginador"),t.classList.remove("ocultar-paginador")),S()}function O(){document.querySelector("#anterior").addEventListener("click",function(){s<=I||(s--,L())})}function j(){document.querySelector("#siguiente").addEventListener("click",function(){s>=P||(s++,L())})}async function k(){try{const t=await(await fetch(`${g}/servicios`)).json();U(t)}catch(e){console.log(e)}}function U(e){e.forEach(t=>{const{id:n,nombre:o,precio:a}=t,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent=`$${a}`;const i=document.createElement("DIV");i.classList.add("servicio"),i.dataset.idServicio=n,i.onclick=function(){B(t)},i.appendChild(c),i.appendChild(r),document.querySelector("#servicios").appendChild(i)})}function B(e){const{id:t}=e,{servicios:n}=l,o=document.querySelector(`[data-id-servicio="${t}"]`);n.some(a=>a.id===t)?(l.servicios=n.filter(a=>a.id!==t),o.classList.remove("seleccionado")):(l.servicios=[...n,e],o.classList.add("seleccionado"))}function R(){document.querySelector("#nombre").value=localStorage.getItem("user"),document.querySelector("#nombreCliente").textContent=localStorage.getItem("user"),l.nombre=document.querySelector("#nombre").value}function N(){document.querySelector("#fecha").addEventListener("input",function(t){const n=new Date(t.target.value).getUTCDay();[0].includes(n)?(t.target.value="",C("Los domingos no abrimos.","error",".formulario")):l.fecha=t.target.value})}function V(){document.querySelector("#hora").addEventListener("input",function(t){const o=t.target.value.split(":")[0];o<9||o>18?(t.target.value="",C("hora no valida, cerrado","error",".formulario")):l.hora=t.target.value})}function q(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(l).includes("")||l.servicios.length===0)return C("faltan datos o servicios","error",".contenido-resumen",!1);const{nombre:t,fecha:n,hora:o,servicios:a}=l,c=document.createElement("H2");c.textContent="Resumen de Servicios",e.appendChild(c),a.forEach(f=>{const{id:G,precio:x,nombre:D}=f,v=document.createElement("DIV");v.classList.add("contenedor-servicios");const b=document.createElement("P");b.textContent=D;const E=document.createElement("P");E.innerHTML=`<span>Precio:</span> ${x}`,v.appendChild(b),v.appendChild(E),e.appendChild(v)});const r=document.createElement("H2");r.textContent="Resumen de Cita",e.appendChild(r);const i=document.createElement("P");i.innerHTML=`<span>Nombre:</span> ${t}`;const m=document.createElement("P");m.innerHTML=`<span>Fecha:</span> ${$(n)}`;const p=document.createElement("P");p.innerHTML=`<span>Hora:</span> ${o} Horas`;const d=document.createElement("DIV");d.classList.add("txt-center"),d.style.marginBottom="20px";const u=document.createElement("BUTTON");u.classList.add("boton"),u.textContent="Reservar Cita",d.appendChild(u),u.onclick=Y,e.appendChild(i),e.appendChild(m),e.appendChild(p),e.appendChild(d)}async function Y(){const{fecha:e,hora:t,servicios:n}=l,o=n.map(c=>c.id),a=new FormData;a.append("fecha",e),a.append("hora",t),a.append("usuarioId",localStorage.getItem("id")),a.append("servicios",o.toString());try{const r=await(await fetch(`${g}/citas`,{method:"POST",body:a})).json();r.respuesta.tipo==="exito"&&h.fire("Muy bien!",r.respuesta.mensaje,"success").then(()=>{s=4,S()})}catch{h.fire({icon:"error",title:"Oops...",text:"Hubo un error al guardar la cita"})}}async function w(){try{const t=await(await fetch(`${g}/citasClientes?id_cliente=${localStorage.getItem("id")}`)).json();if(t.length===0)return C("No has reservado una cita aun","error",".listado-citas",!1);_(t)}catch(e){console.log(e)}}function _(e){y.innerHTML="";let t;e.forEach(n=>{const{precio:o,fecha:a,hora:c,servicio:r,id:i}=n;if(t!==i){const u=document.createElement("UL"),f=document.createElement("LI");u.classList.add("citas"),f.innerHTML=`
                <p>ID: <span>${i}</span></p>
                <p>Hora: <span>${c}</span></p>
                <p>Fecha: <span>${$(a)}</span></p>
                <h2>Servicios</h2>
            `,t=i,u.appendChild(f),y.appendChild(u)}const m=document.createElement("DIV");m.classList.add("opciones");const p=document.createElement("P");p.classList.add("servicioCita"),p.textContent=`${r} : ${o}`;const d=document.createElement("BUTTON");d.textContent="Cancelar cita",d.classList.add("btn-eliminar"),d.style.height="30px",d.addEventListener("click",function(){z(i)}),m.appendChild(p),m.appendChild(d),y.appendChild(m)})}async function z(e){h.fire({title:"Estas seguro/a de cancelar la cita?",showCancelButton:!0,confirmButtonText:"Confirmar"}).then(async t=>{if(t.isConfirmed)try{const o=await(await fetch(`${g}/citas/eliminar?id=${e}`,{method:"POST"})).json();h.fire("Muy bien!",o.mensaje,"success").then(()=>{window.location.reload()})}catch{h.fire({icon:"error",title:"Oops...",text:"Hubo un error al eliminar el servicio"})}})}
