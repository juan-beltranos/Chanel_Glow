import{a as h,m as g}from"./Alert.645a9844.js";/* empty css            */import{c as x}from"./sesion.308f604c.js";import{S as b}from"./sweetalert2.all.5497c4f7.js";let L=1;const C=document.querySelector(".listado-citas");document.addEventListener("DOMContentLoaded",function(){E()});function E(){P(),q(),$(),z(),T(),N(),x()}function P(){const i=document.querySelector(".mostrar");i&&i.classList.remove("mostrar"),document.querySelector(`#paso-${L}`).classList.add("mostrar");const a=document.querySelector(".actual");a&&a.classList.remove("actual"),document.querySelector(`[data-paso="${L}"]`).classList.add("actual")}function q(){document.querySelectorAll(".tabs button").forEach(t=>{t.addEventListener("click",function(a){L=parseInt(a.target.dataset.paso),P()})})}function $(){document.querySelector("#nombreCliente").textContent=localStorage.getItem("user")}function T(){document.querySelector("#fechaCita").addEventListener("input",async function(t){const a=t.target.value;try{const c=await(await fetch(`${h}/citasClientesAll?fecha=${a}`)).json();if(c.length===0)return C.innerHTML="",g("No hay citas en esta fecha","error",".listado-citas");D(c)}catch(e){console.log(e)}})}function A(i){i.forEach(t=>{const{id:a,nombre:e,precio:c}=t,n=S(c),o=document.createElement("DIV");o.classList.add("contenedor-datos");const l=document.createElement("P");l.classList.add("nombre-servicio"),l.textContent=e;const p=document.createElement("P");p.classList.add("precio-servicio"),p.textContent=`$${n}`,o.appendChild(l),o.appendChild(p);const d=document.createElement("DIV");d.classList.add("servicio-admin"),d.dataset.idServicio=a;const m=document.createElement("DIV"),s=document.createElement("BUTTON");s.classList.add("btn-editar"),s.textContent="Actualizar",s.onclick=function(){w("servicios",t)};const u=document.createElement("BUTTON");u.classList.add("btn-eliminar"),u.textContent="Eliminar",u.onclick=function(){I(t.id)},m.appendChild(s),m.appendChild(u),d.appendChild(o),d.appendChild(m),document.querySelector("#servicios").appendChild(d)})}function D(i){C.innerHTML="";let t=null,a=null,e=null,c=0;if(i.forEach(n=>{const{cliente:o,precio:l,hora:p,servicio:d,telefono:m,id:s,email:u}=n;if(t!==s){if(e){const f=document.createElement("P");f.classList.add("total-servicios"),f.innerHTML=`<span>Total a pagar:</span> ${S(c)}`,e.appendChild(f),a.appendChild(e),C.appendChild(a)}c=0,t=s,a=document.createElement("UL"),a.classList.add("citas"),e=document.createElement("LI"),e.innerHTML=`
                <p>ID: <span>${s}</span></p>
                <p>Hora: <span>${p}</span></p>
                <p>Cliente: <span>${o}</span></p>
                <p>Correo: <span>${u}</span></p>
                <p>Telefono: <span>${m}</span></p>
                <h2>Servicios</h2>
            `;const r=document.createElement("DIV");r.classList.add("boton-contenedor");const v=document.createElement("BUTTON");v.textContent="Llenar planilla",v.classList.add("boton"),v.addEventListener("click",function(){w("cita",s)}),r.appendChild(v),e.appendChild(r)}c+=Number(l);const y=document.createElement("P");y.classList.add("servicioCita"),y.textContent=`${d} : ${S(l)}`,e.appendChild(y)}),e){const n=document.createElement("P");n.classList.add("total-servicios"),n.innerHTML=`<span>Total a pagar:</span> ${S(c)}`,e.appendChild(n),a.appendChild(e),C.appendChild(a)}}async function w(i,t){let a=document.querySelector(".modal"),e=document.createElement("DIV");if(e.classList.add("modal"),!a){if(i==="servicios"){const{nombre:c,precio:n,id:o}=t;e.innerHTML=`
            <form class="formulario actualizar-servicio">
                <h2>Actualizar Servicio</h2>
                <div class="campo">
                    <label for="nombreServicio">Nombre</label>
                    <input type="text" id="nombreServicioActualizado" value="${c}" placeholder="Nombre de tu servicio" />
                </div>
                <div class="campo">
                    <label for="precioServicio">Precio</label>
                    <input type="number" value="${S(n)}" id="precioServicioActualizado" placeholder="Precio de tu servicio" />
                </div>
                <div class="opciones">
                    <input type="submit" value="Actualizar" class="btn-editar" id="actualizar-servicio" />
                    <input type="button" value="Cancelar" class="btn-eliminar cerrar" id="cancelar-servicio" />
                </div>
            </form>
        `,e.addEventListener("click",function(l){l.target.classList.contains("btn-editar")&&(l.preventDefault(),H(o))}),e.addEventListener("click",function(l){l.target.classList.contains("cerrar")&&(l.preventDefault(),e.remove())})}else if(i==="cita"){const c=t,n=localStorage.getItem("id");e.innerHTML=`
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
        `,e.addEventListener("submit",function(o){o.preventDefault(),o.target.classList.contains("datos-consulta")&&M(c,n)}),e.addEventListener("click",function(o){o.target.classList.contains("cerrar")&&(o.preventDefault(),e.remove())})}document.querySelector("body").appendChild(e)}}async function M(i,t){const a=document.querySelector("#nombre").value,e=document.querySelector("#fecha").value,c=document.querySelector("#cc").value,n=document.querySelector("#edad").value,o=document.querySelector("#fechaNacimiento").value,l=document.querySelector("#estadoCivil").value,p=document.querySelector("#contactoPersonal").value,d=document.querySelector("#motivoConsulta").value,m=document.querySelector("#patologiaActual").value,s=document.querySelector("#fechaUltimoPeriodo").value,u=document.querySelector('input[name="regularidadPeriodo"]:checked').value,y=document.querySelector("#metodoPlanificacion").value,r=new FormData;r.append("usuario_id",t),r.append("cita_id",i),r.append("nombre",a),r.append("fecha",e),r.append("cc",c),r.append("edad",n),r.append("fechaNacimiento",o),r.append("estadoCivil",l),r.append("contactoPersonal",p),r.append("motivoConsulta",d),r.append("patologiaActual",m),r.append("fechaUltimoPeriodo",s),r.append("regularidadPeriodo",u),r.append("metodoPlanificacion",y);try{const f=await(await fetch(`${h}/planilla`,{method:"POST",body:r})).json();f.tipo==="error"?g(f.msg,"error",".formulario"):b.fire("Muy bien!",f.mensaje,"success").then(()=>{window.location.reload()})}catch(v){console.error("Error al guardar la planilla:",v)}}async function N(){try{const t=await(await fetch(`${h}/servicios`)).json();A(t)}catch(i){console.log(i)}}function S(i){return Number(i).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,".")}async function z(){document.querySelector("#crear-servicio").addEventListener("click",async function(){const t=document.querySelector("#nombreServicio").value,e=document.querySelector("#precioServicio").value.replace(/\./g,""),c=new FormData;c.append("nombre",t),c.append("precio",e);try{const o=await(await fetch(`${h}/servicios`,{method:"POST",body:c})).json();o.tipo==="error"?g(o.msg,"error",".formulario"):b.fire("Muy bien!",o.mensaje,"success").then(()=>{window.location.reload()})}catch{b.fire({icon:"error",title:"Oops...",text:"Hubo un error al crear el servicio"})}})}async function I(i){try{const a=await(await fetch(`${h}/servicios/eliminar?id=${i}`,{method:"POST"})).json();a.tipo==="exito"&&b.fire("Muy bien!",a.mensaje,"success").then(()=>{window.location.reload()})}catch{b.fire({icon:"error",title:"Oops...",text:"Hubo un error al eliminar el servicio, Existen citas realizadas con este servicio"})}}async function H(i){const t=document.querySelector("#nombreServicioActualizado").value,e=document.querySelector("#precioServicioActualizado").value.replace(/\./g,""),c=new FormData;c.append("nombre",t),c.append("precio",e);try{const o=await(await fetch(`${h}/servicios/actualizar?id=${i}`,{method:"POST",body:c})).json();o.tipo==="error"?g(o.msg,"error",".formulario"):b.fire("Muy bien!",o.respuesta.mensaje,"success").then(()=>{window.location.reload()})}catch{b.fire({icon:"error",title:"Oops...",text:"Hubo un error al actualizar el servicio"})}}
