import{a as h,m as S}from"./Alert.05c09075.js";/* empty css            */import{c as w}from"./sesion.c4e8e9f9.js";import{S as f}from"./sweetalert2.all.5497c4f7.js";let g=1;const y=document.querySelector(".listado-citas");document.addEventListener("DOMContentLoaded",function(){P()});function P(){L(),q(),$(),z(),D(),F(),w()}function L(){const i=document.querySelector(".mostrar");i&&i.classList.remove("mostrar"),document.querySelector(`#paso-${g}`).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual"),document.querySelector(`[data-paso="${g}"]`).classList.add("actual")}function q(){document.querySelectorAll(".tabs button").forEach(a=>{a.addEventListener("click",function(t){g=parseInt(t.target.dataset.paso),L()})})}function $(){document.querySelector("#nombreCliente").textContent=localStorage.getItem("user")}function D(){document.querySelector("#fechaCita").addEventListener("input",async function(a){const t=a.target.value;try{const c=await(await fetch(`${h}/citasClientesAll?fecha=${t}`)).json();if(c.length===0)return y.innerHTML="",S("No hay citas en esta fecha","error",".listado-citas");A(c)}catch(e){console.log(e)}})}function T(i){i.forEach(a=>{const{id:t,nombre:e,precio:c}=a,o=document.createElement("DIV");o.classList.add("contenedor-datos");const n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=e;const l=document.createElement("P");l.classList.add("precio-servicio"),l.textContent=`$${c}`,o.appendChild(n),o.appendChild(l);const d=document.createElement("DIV");d.classList.add("servicio-admin"),d.dataset.idServicio=t;const p=document.createElement("DIV"),u=document.createElement("BUTTON");u.classList.add("btn-editar"),u.textContent="Actualizar",u.onclick=function(){x("servicios",a)};const s=document.createElement("BUTTON");s.classList.add("btn-eliminar"),s.textContent="Eliminar",s.onclick=function(){N(a.id)},p.appendChild(u),p.appendChild(s),d.appendChild(o),d.appendChild(p),document.querySelector("#servicios").appendChild(d)})}function A(i){y.innerHTML="";let a=null,t=null,e=null,c=0;if(i.forEach(o=>{const{cliente:n,precio:l,hora:d,servicio:p,telefono:u,id:s,email:C}=o;if(a!==s){if(e){const v=document.createElement("P");v.classList.add("total-servicios");const E=c.toLocaleString("es-ES",{minimumFractionDigits:0,maximumFractionDigits:0});v.innerHTML=`<span>Total a pagar:</span> ${E}`,e.appendChild(v),t.appendChild(e),y.appendChild(t)}c=0,a=s,t=document.createElement("UL"),t.classList.add("citas"),e=document.createElement("LI"),e.innerHTML=`
                <p>ID: <span>${s}</span></p>
                <p>Hora: <span>${d}</span></p>
                <p>Cliente: <span>${n}</span></p>
                <p>Correo: <span>${C}</span></p>
                <p>Telefono: <span>${u}</span></p>
                <h2>Servicios</h2>
            `;const r=document.createElement("DIV");r.classList.add("boton-contenedor");const m=document.createElement("BUTTON");m.textContent="Llenar planilla",m.classList.add("boton"),m.addEventListener("click",function(){x("cita",s)}),r.appendChild(m),e.appendChild(r)}c+=parseFloat(l.replace(/\./g,""));const b=document.createElement("P");b.classList.add("servicioCita"),b.textContent=`${p} : ${l}`,e.appendChild(b)}),e){const o=document.createElement("P");o.classList.add("total-servicios");const n=c.toLocaleString("es-ES",{minimumFractionDigits:0,maximumFractionDigits:0});o.innerHTML=`<span>Total a pagar:</span> ${n}`,e.appendChild(o),t.appendChild(e),y.appendChild(t)}}async function x(i,a){let t=document.querySelector(".modal"),e=document.createElement("DIV");if(e.classList.add("modal"),!t){if(i==="servicios"){const{nombre:c,precio:o,id:n}=a;e.innerHTML=`
            <form class="formulario actualizar-servicio">
                <h2>Actualizar Servicio</h2>
                <div class="campo">
                    <label for="nombreServicio">Nombre</label>
                    <input type="text" id="nombreServicioActualizado" value="${c}" placeholder="Nombre de tu servicio" />
                </div>
                <div class="campo">
                    <label for="precioServicio">Precio</label>
                    <input type="text" value="${o}" id="precioServicioActualizado" placeholder="Precio de tu servicio" />
                </div>
                <div class="opciones">
                    <input type="submit" value="Actualizar" class="btn-editar" id="actualizar-servicio" />
                    <input type="button" value="Cancelar" class="btn-eliminar cerrar" id="cancelar-servicio" />
                </div>
            </form>
        `,e.addEventListener("click",function(l){l.target.classList.contains("btn-editar")&&(l.preventDefault(),I(n))}),e.addEventListener("click",function(l){l.target.classList.contains("cerrar")&&(l.preventDefault(),e.remove())})}else if(i==="cita"){const c=a,o=localStorage.getItem("id");e.innerHTML=`
            <form class="formulario datos-consulta">
                <h2>Datos de la Consulta</h2>
                <div class="campo">
                    <label class="text-white" for="nombre">Nombre</label>
                    <input type="text" id="nombre" placeholder="Nombre completo" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fecha">Fecha</label>
                    <input type="date" id="fecha" />
                </div>
                <div class="campo">
                    <label class="text-white" for="cc">Cc.</label>
                    <input type="text" id="cc" placeholder="C\xE9dula de ciudadan\xEDa" />
                </div>
                <div class="campo">
                    <label class="text-white" for="edad">Edad</label>
                    <input type="number" id="edad" placeholder="Edad" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fechaNacimiento">Fecha de nacimiento</label>
                    <input type="date" id="fechaNacimiento" />
                </div>
                <div class="campo">
                    <label class="text-white" for="estadoCivil">Estado Civil</label>
                    <input type="text" id="estadoCivil" placeholder="Estado civil" />
                </div>
                <div class="campo">
                    <label class="text-white" for="contactoPersonal">Contacto personal</label>
                    <input type="text" id="contactoPersonal" placeholder="Contacto personal" />
                </div>
                <div class="campo">
                    <label class="text-white" for="motivoConsulta">Motivo de la consulta</label>
                    <input type="text" id="motivoConsulta" placeholder="Motivo de la consulta" />
                </div>
                <div class="campo">
                    <label class="text-white" for="patologiaActual">Patolog\xEDa actual</label>
                    <input type="text" id="patologiaActual" placeholder="Patolog\xEDa actual" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fechaUltimoPeriodo">Fecha \xFAltimo periodo</label>
                    <input type="date" id="fechaUltimoPeriodo" />
                </div>
                <div class="campo">
                    <label class="text-white">Regularidad del periodo</label>
                    <div>
                        <input type="radio" id="regular" name="regularidadPeriodo" value="Regular" />
                        <label class="text-white" for="regular">Regular</label>
                        <input type="radio" id="irregular" name="regularidadPeriodo" value="Irregular" />
                        <label class="text-white" for="irregular">Irregular</label>
                    </div>
                </div>
                <div class="campo">
                    <label class="text-white" for="metodoPlanificacion">M\xE9todo de planificaci\xF3n</label>
                    <input type="text" id="metodoPlanificacion" placeholder="M\xE9todo de planificaci\xF3n" />
                </div>
                <div class="opciones">
                    <input type="submit" value="Guardar" class="btn-editar btn-guardar-consulta" id="guardar-consulta" />
                    <input type="button" value="Cancelar" class="btn-eliminar cerrar" id="cancelar-consulta" />
                </div>
            </form>
        `,e.addEventListener("submit",function(n){n.preventDefault(),n.target.classList.contains("datos-consulta")&&M(c,o)}),e.addEventListener("click",function(n){n.target.classList.contains("cerrar")&&(n.preventDefault(),e.remove())})}document.querySelector("body").appendChild(e)}}async function M(i,a){const t=document.querySelector("#nombre").value,e=document.querySelector("#fecha").value,c=document.querySelector("#cc").value,o=document.querySelector("#edad").value,n=document.querySelector("#fechaNacimiento").value,l=document.querySelector("#estadoCivil").value,d=document.querySelector("#contactoPersonal").value,p=document.querySelector("#motivoConsulta").value,u=document.querySelector("#patologiaActual").value,s=document.querySelector("#fechaUltimoPeriodo").value,C=document.querySelector('input[name="regularidadPeriodo"]:checked').value,b=document.querySelector("#metodoPlanificacion").value,r=new FormData;r.append("usuario_id",a),r.append("cita_id",i),r.append("nombre",t),r.append("fecha",e),r.append("cc",c),r.append("edad",o),r.append("fechaNacimiento",n),r.append("estadoCivil",l),r.append("contactoPersonal",d),r.append("motivoConsulta",p),r.append("patologiaActual",u),r.append("fechaUltimoPeriodo",s),r.append("regularidadPeriodo",C),r.append("metodoPlanificacion",b);try{const v=await(await fetch(`${h}/planilla`,{method:"POST",body:r})).json();v.tipo==="error"?S(v.msg,"error",".formulario"):f.fire("Muy bien!",v.mensaje,"success").then(()=>{window.location.reload()})}catch(m){console.error("Error al guardar la planilla:",m)}}async function F(){try{const a=await(await fetch(`${h}/servicios`)).json();T(a)}catch(i){console.log(i)}}async function z(){document.querySelector("#crear-servicio").addEventListener("click",async function(){const a=document.querySelector("#nombreServicio").value,t=document.querySelector("#precioServicio").value,e=new FormData;e.append("nombre",a),e.append("precio",t);try{const o=await(await fetch(`${h}/servicios`,{method:"POST",body:e})).json();o.tipo==="error"?S(o.msg,"error",".formulario"):f.fire("Muy bien!",o.mensaje,"success").then(()=>{window.location.reload()})}catch{f.fire({icon:"error",title:"Oops...",text:"Hubo un error al crear el servicio"})}})}async function N(i){try{const t=await(await fetch(`${h}/servicios/eliminar?id=${i}`,{method:"POST"})).json();t.tipo==="exito"&&f.fire("Muy bien!",t.mensaje,"success").then(()=>{window.location.reload()})}catch{f.fire({icon:"error",title:"Oops...",text:"Hubo un error al eliminar el servicio, Existen citas realizadas con este servicio"})}}async function I(i){const a=document.querySelector("#nombreServicioActualizado").value,t=document.querySelector("#precioServicioActualizado").value,e=new FormData;e.append("nombre",a),e.append("precio",t);try{const o=await(await fetch(`${h}/servicios/actualizar?id=${i}`,{method:"POST",body:e})).json();o.tipo==="error"?S(o.msg,"error",".formulario"):f.fire("Muy bien!",o.respuesta.mensaje,"success").then(()=>{window.location.reload()})}catch{f.fire({icon:"error",title:"Oops...",text:"Hubo un error al actualizar el servicio"})}}
