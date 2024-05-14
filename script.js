// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// populate #projects section with cards using the template
let cardTemplate = document.querySelector("#project-card-template");
let cardGrid = document.querySelector("#photo-grid");
let cards = []

async function initializeGrid() {
  for (i = 0; i < 6; i++)
  {
    let card = cardTemplate.content.cloneNode(true);
    cards[i] = card.children[0];
    // cards[i].id = `project-card-${i}`; // add unique id (e.g. "project-card-1") to each card
    cardGrid.appendChild(card) // add card to body
  }
  await fetchProjectData();
  updateProjectGrid();
}

let projectData;
let projectTags = new Set();

async function fetchProjectData()
{
  let response = await fetch("projects.json");
  projectData = await response.json();
}

function queryProjects(tags) // return a list of projects that include any element of the array `tags`
{
  if (tags.size == 0)
    return projectData;
  return projectData.filter(project => project.tags.some(projectTag => tags.has(projectTag)))
}

function updateProjectGridDisplay(projects) {
  projectCount = Math.min(cards.length, projects.length); // show only as many projects as there are html cards
  for (i = 0; i < cards.length; i++) { // for each card:
    let card = cards[i];
    if (i >= projectCount) { // extra card elements should be invisible
      card.classList.add("w3-hide");

    } else { // for the visible card elements
      let project = projects[i]

      // make card visible
      card.classList.remove("w3-hide");

      // display image
      card.querySelector("img").src = "img/projects/" + project.thumbnail;

      // display project name
      card.querySelector(".card-name").textContent = project.name

      // display description
      card.querySelector(".card-desc").textContent = project.desc

      // display tags
      tagContainerElement = card.querySelector(".project-tags");
      tagContainerElement.innerHTML = "";
      // hard-code data each tag because that's easy and there are only 4 tags.
      if (project.tags.includes("games"))
        tagContainerElement.innerHTML += `<i class="project-icon fa fa-gamepad"></i>`;
      if (project.tags.includes("code"))
        tagContainerElement.innerHTML += `<i class="project-icon fa fa-code"></i>`;
      if (project.tags.includes("art"))
        tagContainerElement.innerHTML += `<i class="project-icon fa fa-palette"></i>`;
      if (project.tags.includes("other"))
        tagContainerElement.innerHTML += `<i class="project-icon fa fa-frog"></i>`;

    }
  }
}

function updatePaginationDisplay()
{

}

function updateProjectGrid() {
    if (projectData) {
      let projects = queryProjects(projectTags);
      updateProjectGridDisplay(projects);
      updatePaginationDisplay(projects.length);
    }
}

function toggleTag(event, tag) {
  if (projectTags.has(tag)) {
    projectTags.delete(tag);
    event.target.classList.add("w3-light-grey");
    event.target.classList.remove("w3-black");
  }
  else {
    projectTags.add(tag);
    event.target.classList.remove("w3-light-grey");
    event.target.classList.add("w3-black");
  }
  let buttonAll = document.querySelector("#filter-all");
  if (projectTags.size == 0)
  {
    buttonAll.classList.add("w3-black");
    buttonAll.classList.remove("w3-light-grey");
  } else
  {
    buttonAll.classList.remove("w3-black");
    buttonAll.classList.add("w3-light-grey");
  }
  updateProjectGrid();
}

function enableAllTags()
{
  projectTags.clear()
  let buttonAll = document.querySelector("#filter-all")
  document.querySelectorAll(".filters > button").forEach(button => {
    button.classList.remove("w3-black");
    button.classList.add("w3-light-grey");
  })
  buttonAll.classList.add("w3-black");
  buttonAll.classList.remove("w3-light-grey");
  updateProjectGrid();
}

initializeGrid();
