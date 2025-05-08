const listaDeProyectos = document.getElementsByClassName('project-group')[0]; // Assuming there's only one element with this class

function crearProyectoDOM(proyecto) {
  // Crear el contenedor principal del proyecto
  const proyectoDiv = document.createElement('div');
  proyectoDiv.className = 'project bg-white rounded-lg shadow-md overflow-hidden group';

  // Crear la imagen del proyecto
  const imagenProyecto = document.createElement('img');
  imagenProyecto.src = proyecto.imagenUrl || 'https://placehold.co/600x400/FFFFFF/A89A90?text=Imagen+No+Disponible'; // Usar una URL por defecto si no hay imagen
  imagenProyecto.alt = proyecto.nombre ? `Imagen Proyecto ${proyecto.nombre}` : 'Imagen del Proyecto';
  imagenProyecto.className = 'w-full h-64 object-cover group-hover:scale-105 transition duration-300';

  // Crear el contenedor de la información del proyecto
  const infoDiv = document.createElement('div');
  infoDiv.className = 'p-4';

  // Crear el título del proyecto
  const tituloProyecto = document.createElement('h3');
  tituloProyecto.className = 'text-lg font-semibold text-gray-800 mb-1';
  tituloProyecto.textContent = proyecto.nombre || 'Nombre del Proyecto';

  // Crear la ubicación del proyecto
  const ubicacionProyecto = document.createElement('p');
  ubicacionProyecto.className = 'text-sm text-gray-600';
  ubicacionProyecto.textContent = proyecto.ubicacion || 'Ubicación Desconocida';

  // Ensamblar los elementos
  infoDiv.appendChild(tituloProyecto);
  infoDiv.appendChild(ubicacionProyecto);
  proyectoDiv.appendChild(imagenProyecto);
  proyectoDiv.appendChild(infoDiv);

  return proyectoDiv;
}

// Ejemplo de cómo podrías usar la función con un objeto de proyecto:
const nuevoProyectoData = {
  nombre: 'Nuevo Proyecto Residencial',
  ubicacion: 'Vitacura, Santiago',
  imagenUrl: 'https://placehold.co/600x400/C0FFEE/333333?text=Nuevo+Proyecto'
};

const nuevoProyectoElemento = crearProyectoDOM(nuevoProyectoData);

// Agregar el nuevo proyecto al contenedor de la lista de proyectos
if (listaDeProyectos) {
  listaDeProyectos.appendChild(nuevoProyectoElemento);
} else {
  console.error('No se encontró el elemento con la clase "project-group" en el DOM.');
}

// Si tienes una lista de proyectos (array de objetos), puedes iterar y crear elementos para cada uno:
const proyectosDataList = [
  { nombre: 'Residencia Los Andes', ubicacion: 'Los Andes', imagenUrl: 'https://placehold.co/600x400/ADD8E6/000000?text=Los+Andes' },
  { nombre: 'Edificio El Centro', ubicacion: 'Santiago Centro', imagenUrl: 'https://placehold.co/600x400/FAF0E6/808080?text=El+Centro' },
  // ... más proyectos
];

proyectosDataList.forEach(proyecto => {
  const proyectoElemento = crearProyectoDOM(proyecto);
  if (listaDeProyectos) {
    listaDeProyectos.appendChild(proyectoElemento);
  }
});