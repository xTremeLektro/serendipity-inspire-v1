let mainProjectsParsed

try {
    // Parse the JSON string into an object
    mainProjectsParsed = JSON.parse(mainProjects); // Parse the JSON string into an object
    console.log(mainProjectsParsed); // Call the function to use mainProjectsParsed
}
catch (error) {
    console.error("Error parsing JSON:", error); // Handle any parsing errors
}

const projects = mainProjectsParsed.filter((project) => project.type === "Project"); 
const ideas = mainProjectsParsed.filter((project) => project.type === "Idea");
const lugares = mainProjectsParsed.filter((project) => project.type === "Lugar");

const listaDeProyectos = document.getElementsByClassName('project-group')[0]; 
const listaDeIdeas = document.getElementsByClassName('ideas-group')[0]; 
const listaDeLugares = document.getElementsByClassName('lugares-group')[0];

// Just to review the contents of the lists
// console.log("Proyectos:", listaDeProyectos);
// console.log("Ideas:", listaDeIdeas);
// console.log("Lugares:", listaDeLugares);

function crearProyectoDOM(proyecto) {
    // Crear el contenedor principal del proyecto
    const proyectoDiv = document.createElement('div');
    proyectoDiv.className = 'project bg-white rounded-lg shadow-md overflow-hidden group';
  
    // Crear la imagen del proyecto
    const imagenProyecto = document.createElement('img');
    imagenProyecto.src = proyecto.homeThumb || 'https://placehold.co/600x400/FFFFFF/A89A90?text=Imagen+No+Disponible'; // Usar una URL por defecto si no hay imagen
    imagenProyecto.alt = proyecto.name ? `Imagen Proyecto ${proyecto.name}` : 'Imagen del Proyecto';
    imagenProyecto.className = 'w-full max-w-xl h-auto object-cover group-hover:scale-105 transition duration-300';
    // imagenProyecto.className = 'w-full h-64 object-cover group-hover:scale-105 transition duration-300';
  
    // Crear el contenedor de la información del proyecto
    const infoDiv = document.createElement('div');
    infoDiv.className = 'p-4';
  
    // Crear el título del proyecto
    const tituloProyecto = document.createElement('h3');
    tituloProyecto.className = 'text-lg font-semibold text-gray-800 mb-1';
    tituloProyecto.textContent = proyecto.name || 'Nombre del Proyecto';
  
    // Crear la ubicación del proyecto
    const ubicacionProyecto = document.createElement('p');
    ubicacionProyecto.className = 'text-sm text-gray-600';
    ubicacionProyecto.textContent = proyecto.place || 'Ubicación Desconocida';
  
    // Ensamblar los elementos
    infoDiv.appendChild(tituloProyecto);
    infoDiv.appendChild(ubicacionProyecto);
    proyectoDiv.appendChild(imagenProyecto);
    proyectoDiv.appendChild(infoDiv);
  
    return proyectoDiv;
  }

// Armar la lista de proyectos
  projects.forEach(proyecto => {
    const proyectoElemento = crearProyectoDOM(proyecto);
    if (listaDeProyectos) {
      listaDeProyectos.appendChild(proyectoElemento);
    }
  });

//   Armar la lista de ideas
  ideas.forEach(idea => {
    const ideaElemento = crearProyectoDOM(idea);
    if (listaDeIdeas) {
      listaDeIdeas.appendChild(ideaElemento);
    }
  });

//   Armar la lista de lugares
  lugares.forEach(lugar => {
    const lugarElemento = crearProyectoDOM(lugar);
    if (listaDeLugares) {
      listaDeLugares.appendChild(lugarElemento);
    }
  });