let currentUser = JSON.parse(sessionStorage.getItem("selectedGuest"));

// Function to render available animals based on filters
function renderAvailableAnimals() {
  // Get filters values
  let searchByName = document.getElementById("search").value.toLowerCase();
  let weight = parseFloat(document.getElementById("weight").value) || null;
  let height = parseFloat(document.getElementById("height").value) || null;
  let color = document.getElementById("color").value.toLowerCase();
  let livingArea = document.getElementById("livingArea").value;

  // Filter animals based on criteria
  let filteredAnimals = animals.filter(function (animal) {
    return (
      animal.name.toLowerCase().includes(searchByName) &&
      (weight === null || animal.weight >= weight) &&
      (height === null || animal.height >= height) &&
      (color === "" || animal.color.toLowerCase().includes(color)) &&
      (livingArea === "" || animal.habitat === livingArea)
    );
  });

  // Render filtered animals
  const animalListContainer = document.getElementById("animal-cards");
  animalListContainer.innerHTML = "";
  filteredAnimals.forEach((animal) => {
    animalListContainer.append(getAnimalCard(animal));
  });
}

// Function to create animal card element
function getAnimalCard(animal) {
  const template = `
  <div >
    <img src=${animal.animalImg} alt="${animal.name}"/>
    <div>
      <h2> ${animal.name}</h2>
      <p >weight: ${animal.weight}</p>
      <p >height: ${animal.height}</p>
      <p >color: ${animal.color}</p>
      <p >habitat: ${animal.habitat}</p>
    </div>
  </div>`;

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card";
  cardWrapper.innerHTML = template;
  cardWrapper.addEventListener("click", () => visitAnimal(animal));

  return cardWrapper;
}

// Function to handle visiting an animal
function visitAnimal(animal) {
  // Find the visitor in the visitors array
  let visitorIndex = visitors.findIndex(
    (visitor) => visitor.name === currentUser.name
  );

  if (visitorIndex !== -1) {
    // Visitor found,than we update the visited animals array
    let visitedAnimalIndex = visitors[visitorIndex].visitedAnimals.findIndex(
      (visitedAnimal) => visitedAnimal.name === animal.name
    );

    if (visitedAnimalIndex !== -1) {
      // If animal index found - the animal has already been visited, increase the visit counter by one
      visitors[visitorIndex].visitedAnimals[visitedAnimalIndex].visitCount++;
    } else {
      // If the animal has not been visited yet, add it to the visited animals array- First visit
      visitors[visitorIndex].visitedAnimals.push({
        name: animal.name,
        visitCount: 1,
        feedCount: 0,
      });
    }

    // Save the updated visitors array to local storage
    localStorage.setItem("visitors", JSON.stringify(visitors));
    sessionStorage.setItem("visitedAnimal", JSON.stringify(animal));
    sessionStorage.setItem(
      "selectedGuest",
      JSON.stringify(visitors[visitorIndex])
    );
    // Redirect to the animal page
    window.location.href = "./animal.html";
  } else {
    // Handle error: User not found in visitors array
    console.error(
      "User not found in visitors array. Redirecting to login page."
    );
    window.location.href = "./login.html";
  }
}

// Event listeners for filter inputs
document
  .getElementById("search")
  .addEventListener("input", renderAvailableAnimals);
document
  .getElementById("weight")
  .addEventListener("input", renderAvailableAnimals);
document
  .getElementById("height")
  .addEventListener("input", renderAvailableAnimals);
document
  .getElementById("color")
  .addEventListener("input", renderAvailableAnimals);
document
  .getElementById("livingArea")
  .addEventListener("change", renderAvailableAnimals);

// Initial render
renderAvailableAnimals();
