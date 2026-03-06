// Elementos del DOM
const entradaTarea = document.getElementById('entradaTarea');
const botonAgregarTarea = document.getElementById('botonAgregarTarea');
const listaTareas = document.getElementById('listaTareas');
const contadorTotal = document.getElementById('contadorTotal');
const contadorCompletadas = document.getElementById('contadorCompletadas');
const formularioTareas = document.getElementById('formularioTareas');
const mensajeVacio = document.getElementById('mensajeVacio');

// Variables de control
let arregloTareas = [];
let idTarea = 0;

// Evento para agregar tarea al enviar el formulario
formularioTareas.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (entradaTarea.value.trim() === "") {
        alert('Por favor, escribe una tarea antes de agregar.');
        return;
    }

    crearTarea(entradaTarea.value);
    entradaTarea.value = "";
    entradaTarea.focus();
});

// Función para crear una nueva tarea
function crearTarea(textoTarea) {
    const objetoTarea = {
        id: idTarea++,
        texto: textoTarea,
        completada: false
    };

    arregloTareas.push(objetoTarea);
    renderizarTareas();
}

// Función para renderizar todas las tareas
function renderizarTareas() {
    listaTareas.innerHTML = "";

    arregloTareas.forEach((tarea) => {
        const elementoTarea = document.createElement('li');
        elementoTarea.className = `elemento-tarea ${tarea.completada ? 'completada' : ''}`;
        elementoTarea.id = `tarea-${tarea.id}`;
        
        elementoTarea.innerHTML = `
            <input type="checkbox" class="checkbox-tarea" ${tarea.completada ? 'checked' : ''}>
            <span class="texto-tarea">${tarea.texto}</span>
            <button class="boton-eliminar" title="Eliminar tarea">✕</button>
        `;

        // Evento para marcar como completada
        elementoTarea.querySelector('.checkbox-tarea').addEventListener('change', () => {
            tarea.completada = !tarea.completada;
            renderizarTareas();
        });

        // Evento para eliminar tarea
        elementoTarea.querySelector('.boton-eliminar').addEventListener('click', () => {
            arregloTareas = arregloTareas.filter(t => t.id !== tarea.id);
            renderizarTareas();
        });

        listaTareas.appendChild(elementoTarea);
    });

    // Actualizar contadores
    actualizarContadores();
    actualizarMensajeVacio();
}

// Función para actualizar los contadores
function actualizarContadores() {
    contadorTotal.innerText = arregloTareas.length;
    const completadas = arregloTareas.filter(t => t.completada).length;
    contadorCompletadas.innerText = completadas;
}

// Función para mostrar/ocultar mensaje de lista vacía
function actualizarMensajeVacio() {
    if (arregloTareas.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }
}