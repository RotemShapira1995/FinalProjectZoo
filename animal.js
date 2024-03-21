//We get the current visitor (the loggen in visitor) and the current animal from session storage to track the user and animals interactions
let currentAnimal = JSON.parse(sessionStorage.getItem("visitedAnimal"));
let currentVisitor = JSON.parse(sessionStorage.getItem("selectedGuest"));
/*************************************/
//Function that inkoves when page loded - rendering the selected animal and ite related animals by habitate .
function renderAnimal() {
  //Validation check - we inssure there is an animal in the session storage - means:>>
  //>> User has clicked a spesific animal to visit - which is being saved in sessionStorage
  if (!currentAnimal || !currentVisitor) {
    alert("No animal or user in session storage.");
    //redirect to login page - 'login'
    window.location.href = "./login.html";
    return;
  }
  if (!currentAnimal) {
    alert("No animal in session storage.");
    //redirect to main page - 'Zoo'
    window.location.href = "./zoo.html";
    return;
  }

  //We 'catch' the image div place holder to render the current animal picture, the one is being visited
  const animalPic = document.getElementById("image");
  animalPic.innerHTML = `<img src="${currentAnimal.animalImg}" alt="${currentAnimal.name} pic" />`;
  //We catch the reast of animal details selector
  const animalName = document.getElementById("name");
  const animalWeight = document.getElementById("weight");
  const animalHeight = document.getElementById("height");
  const animalColor = document.getElementById("color");
  const animalHabitat = document.getElementById("habitat");
  const isAnimalPred = document.getElementById("isPredator");

  //Updating selectors to the current animal details - which is saved in session storage
  //Assigning the values from current animal object
  animalName.textContent = currentAnimal.name;
  animalWeight.textContent = "Weight: " + currentAnimal.weight;
  animalHeight.textContent = "Height: " + currentAnimal.height;
  animalColor.textContent = "Color: " + currentAnimal.color;
  animalHabitat.textContent = "Habitat: " + currentAnimal.habitat;
  isAnimalPred.textContent = "Is Predator: " + currentAnimal.isPredator;

  renderRelatedAnimals();

  const feedBtn = document.getElementById("feed-animal");
  feedBtn.addEventListener("click", feedAnimal);
}

/*************************************/
//Function that finds the current visitor in the original visitors array from local
function findVisitorIndexInVisitorsArray() {
  //Find visitor index from within the visitors array in local
  let currentVisitorIndex = visitors.findIndex(
    (visitor) => visitor.name === currentVisitor.name
  );
  return currentVisitorIndex;
}

/*************************************/
//Function to update the visitors coins in case of feeding animal - decrease its coins by 2 (price of feeing animal)
function updateCoinsAndSaveToLocal(animalIndex) {
  //Find the current visitor index in the vistors array that is saved in local storage
  let currentVisitorIndex = findVisitorIndexInVisitorsArray();

  //If visitor index was found - this is what supposed to always be done at this point -
  // - >> We update the visitors array, by updating the current visitor cell , using the visitor original index
  if (currentVisitorIndex !== -1) {
    // Update the visitor's coins
    visitors[currentVisitorIndex].coins -= 2;
    let coinsNavBarUpdate = document.getElementById("coins");
    coinsNavBarUpdate.textContent = visitors[currentVisitorIndex].coins;
    // Update the visitors array in local storage
    localStorage.setItem("visitors", JSON.stringify(visitors));
    //Update the current user object in sessionStorage to keep track his visit
    sessionStorage.setItem(
      "selectedGuest",
      JSON.stringify(visitors[currentVisitorIndex])
    );
    if (animalIndex >= 0)
      sessionStorage.setItem(
        "visitedAnimal",
        JSON.stringify(
          visitors[currentVisitorIndex].visitedAnimals[animalIndex]
        )
      );
  } else {
    alert("'currentVisitorIndex' not found - update failed");
    window.location.href = "./signup.html";
    return;
  }
}

/*************************************/
//Function to render all reltaed animal - condition: have the same living area(habitate) as visited animal
function renderRelatedAnimals() {
  const relatedAnimalsContainer = document.getElementById("related-animals");
  animals.forEach(function (animal) {
    if (
      animal.habitat === currentAnimal.habitat &&
      animal.name !== currentAnimal.name
    ) {
      relatedAnimalsContainer.appendChild(getAnimalCard(animal));
    }
  });
}

/*************************************/
//Function to create new animal card ,of animal object - to render and display at the animal page
const getAnimalCard = (animal) => {
  const template = `
    <div class="animalCard" style="min-height: 360px;">
      <img src="${animal.animalImg}" alt="${animal.name} image" />
      <div>
        <h2>${animal.name}</h2>
        <p>Weight: ${animal.weight}</p>
        <p>Height: ${animal.height}</p>
        <p>Color: ${animal.color}</p>
        <p>Habitat: ${animal.habitat}</p>
        <p>Is predator: ${animal.isPredator}</p>
      </div>
    </div>`;

  const newDivCardWrapper = createWrapperCard(template);
  newDivCardWrapper.addEventListener("click", () =>
    visitAnimalFromAnimal(animal)
  );
  return newDivCardWrapper;
};

/*************************************/
//Function to create wrapper- parent node element to each card that is sent to function
//arguments : html element . Output: new Html element - parent and chils - card to wrap.
const createWrapperCard = (cardToWrap) => {
  const wrapper = document.createElement("div");
  wrapper.className = "card";
  wrapper.innerHTML = cardToWrap;
  return wrapper;
};

/*************************************/
//Function to handle user click on an animal card - invokes visit animal
//The visit counter of the animal (which is being visited) increases by one
function visitAnimalFromAnimal(animal) {
  //Find the index of the animal in the visitor array of visited animal
  //If not found - user has not been visiting this animal: We create new visit and push it to visitors' array 'visitedAnimals' to track his visitings
  let visitedAnimalIndex = currentVisitor.visitedAnimals.findIndex(
    (visitedAnimal) => visitedAnimal.name === animal.name
  );

  let currentVisitorIndex = findVisitorIndexInVisitorsArray();
  //Index found - It means the visitor has been at this animal page at least ont - we increase visit counter by one (another visit to the same animal)
  if (visitedAnimalIndex !== -1) {
    visitors[currentVisitorIndex].visitedAnimals[visitedAnimalIndex]
      .visitCount++;
  }
  ///Animal index was'nt fount - We create new visit-the first one- and push it to visitors' visiting array
  else {
    visitors[currentVisitorIndex].visitedAnimals.push({
      name: animal.name,
      visitCount: 1,
      feedCount: 0,
    });
  }

  //Save and Update Local and Session storage
  localStorage.setItem("visitors", JSON.stringify(visitors));
  sessionStorage.setItem(
    "selectedGuest",
    JSON.stringify(visitors[currentVisitorIndex])
  );
  sessionStorage.setItem("visitedAnimal", JSON.stringify(animal));

  window.location.href = "./animal.html";
}

/*************************************/
//Function to handled ' feed me' button click
//If user has above 2 coins he is able to feed the animal.
//The cost is deducted from the currency quota according to the price of animal feed
function feedAnimal() {
  let currentVisitorIndex = findVisitorIndexInVisitorsArray();
  //Validation check to inssure there is a visitor in this visit
  if (currentVisitorIndex === -1) {
    alert("No visitor selected.");
    window.location.href = "./login.html";
    return;
  }
  //Check the current number of visitor coins - It has to be 2 and up.
  //Feed cost = 2 coins.
  if (visitors[currentVisitorIndex].coins >= 2) {
    //Search the animal index in the visited animals array of the user
    let feededAnimalIndex = visitors[
      currentVisitorIndex
    ].visitedAnimals.findIndex((animal) => currentAnimal.name === animal.name);

    //Index found - It means the visitor has been at the animal page - we increase visit counter by one (another visit to the same animal)
    //Logically this is always supposed to be true because only when visiting an animal the user has the option to feed it
    if (feededAnimalIndex !== -1) {
      visitors[currentVisitorIndex].visitedAnimals[feededAnimalIndex]
        .feedCount++;
    } else {
      visitors[currentVisitorIndex].visitedAnimals.push({
        name: currentAnimal.name,
        visitCount: 1,
        feedCount: 1,
      });
    }
    updateCoinsAndSaveToLocal(feededAnimalIndex);

    showModal("Thank you for feeding the animal! God bless you");

    //End Of first IF- user has coins>= 2.
  }
  //The other case - Visitor got eaten or animal escaped
  else {
    if (currentAnimal.isPredator) {
      visitorGotEaten();
    } else {
      animalEscaped();
    }
  }
}

/*************************************/
//Function to handle the case visitor has not enough coins and animal is predator - he has been eaten
//Remove visitor from visitors array and from session stroge
function visitorGotEaten() {
  showModal("The animal has devoured a guest!");
  let newVisitors = visitors.filter(
    (visitor) => visitor.name !== currentVisitor.name
  );
  visitors = newVisitors;
  localStorage.setItem("visitors", JSON.stringify(visitors));
  sessionStorage.clear();
  setTimeout(() => {
    window.location.href = "./login.html"; // Redirect to the specified URL after 2000 milliseconds
  }, 2000);
}

function animalEscaped() {
  showModal("The animal has escaped from the zoo! Ohhh Nooooooo");
  let newAnimals = animals.filter(
    (animal) => animal.name !== currentAnimal.name
  );
  animals = newAnimals;
  localStorage.setItem("animals", JSON.stringify(animals));
  sessionStorage.removeItem("visitedAnimal");
  setTimeout(() => {
    window.location.href = "./zoo.html"; // Redirect to the specified URL after 2000 milliseconds
  }, 2000);
}

/*************************************/
//Function to handle the case visitor has not enough coins and animal is not predator - he has been eaten
//Remove visitor from visitors array and from session stroge
function showModal(message) {
  let modal = document.getElementById("modal");
  let modalMessage = document.getElementById("modalMessage");
  let escapeModal = document.getElementsByName("escapeModal");
  modalMessage.innerText = message;
  modal.style.display = "block";
  console.log(escapeModal);
  escapeModal.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

window.addEventListener("load", renderAnimal);
