let mainProjectsParsed

try {
    // Parse the JSON string into an object
    mainProjectsParsed = JSON.parse(mainProjects); // Parse the JSON string into an object
    console.log(mainProjectsParsed); // Call the function to use mainProjectsParsed
}
catch (error) {
    console.error("Error parsing JSON:", error); // Handle any parsing errors
}

const ideas = mainProjectsParsed.filter((project) => project.type === "Idea");
const lugares = mainProjectsParsed.filter((project) => project.type === "Lugar");
const projects = mainProjectsParsed.filter((project) => project.type === "Project"); 

const listaDeProyectos = document.getElementsByClassName('project-group')[0]; // Assuming there's only one element with this class
const listaDeIdeas = document.getElementsByClassName('ideas-group')[0]; // Assuming there's only one element with this class
const listaDeLugares = document.getElementsByClassName('lugares-group')[0];

console.log("Proyectos:", listaDeProyectos);
console.log("Ideas:", listaDeIdeas);
console.log("Lugares:", listaDeLugares);