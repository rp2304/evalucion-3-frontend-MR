
//esto codigo sirve para validar el run de una persona y que no se repita tambien para validar el email 
//y que no se repita en la base de datos 
import { getAll, remove, save, selectOne, update } from "./firestore.js"
let id = ''
//addEventListener permite invocar eventos(click,change,blur)
document.getElementById('btnSave').addEventListener('click', () => {
    //sirve para validar los campos 
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const equipos = {
            pais: document.getElementById('pais').value,
            entrenador: document.getElementById('entrenador').value,
            fechaFundacion: document.getElementById('fechaFundacion').value,
            camisetaPrincipal: document.getElementById('camisetaPrincipal').value,
            colorSecundario: document.getElementById('colorSecundario').value,
            estadio: document.getElementById('estadio').value,
            anioParticipacion: document.getElementById('anioParticipacion').value,
            titulosGanados: document.getElementById('titulosGanados').value
        }
        //si el id es vacio se guarda
        if(id == ''){
            save(equipos)
        }
        else{
            update(id,equipos)
        }
        limpiar()
        id = ''        
    }
})
//DOMContentLoaded es un vento que se activa al recargar la página web
window.addEventListener('DOMContentLoaded', () => {
    //getAll es la función que recibe la colección de datos
    getAll(datos => {
        let tabla = ''
        //recorriendo la colección, para mostrar uno a uno los documentos en la tabla
        datos.forEach(doc => {
            //asigna el documento a la variable item(los valores están en data())
            const item = doc.data()
            tabla += `<tr>
                <td>${item.pais}</td>
                <td>${item.entrenador}</td>
                <td>${item.fechaFundacion}</td>
                <td>${item.camisetaPrincipal}</td>
                <td>${item.colorSecundario}</td>
                <td>${item.estadio}</td>
                <td>${item.anioParticipacion}</td>
                <td>${item.titulosGanados}</td>
                <td nowrap>
                    <input type="button" class="btn btn-danger" value="Eliminar" 
                    id="${doc.id}">
                    <input type="button" class="btn btn-warning" value="Editar"
                        id="${doc.id}">
                </td>
            </tr>`
        })
        document.getElementById('contenidoEquipos').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //indentificar a que botón se le hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //invocar a la función que permite eliminar un documento según su id
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //recorrer todos los botones editar 
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //indentificmos a que botón se le hizo click 
            //asyn y await permite que la función espera en segundo plano la respuesta
            btn.addEventListener('click',async()=>{
                //invocamos a la función que retornar el documento seleccionado
                const emp= await selectOne(btn.id)
                //accedemos a los datos del documento
                const e = emp.data()
                //asignar los datos del documento a los input
                document.getElementById('pais').value = e.pais
                document.getElementById('entrenador').value = e.entrenador
                document.getElementById('fechaFundacion').value = e.fechaFundacion
                document.getElementById('camisetaPrincipal').value = e.camisetaPrincipal
                document.getElementById('colorSecundario').value = e.colorSecundario
                document.getElementById('estadio').value = e.estadio
                document.getElementById('anioParticipacion').value = e.anioParticipacion
                document.getElementById('titulosGanados').value = e.titulosGanados
                
                //guardar por editar
                document.getElementById('btnSave').value = 'Editar'
                //se asigna el id del documento seleccionado a la variable
                id = emp.id
            })
        })
    })
})