const LoggedUser = JSON.parse(sessionStorage.getItem("selectedGuest"));
const visitedAnimals = LoggedUser.visitedAnimals;

function generateTheData() {
  init(visitedAnimals, LoggedUser);
}

// Function to filter the original array of animals based on animals visited by the guest
function filterVisitedAnimals(visitedAnimals, allAnimals) {
  const filteredAnimals = [];
  // Iterate through each animal visited by the guest
  visitedAnimals.forEach((visitedAnimal) => {
    // Search for the visited animal in the original array of animals
    const foundAnimal = allAnimals.find(
      (animal) => animal.name === visitedAnimal.name
    );

    // If a match is found, add the entire object to the filtered array
    if (foundAnimal) {
      filteredAnimals.push(foundAnimal);
    }
  });

  return filteredAnimals;
}
function filteredFeededAnimals(visitedAnimals, allAnimals) {
  const filteredAnimals = [];
  // Iterate through each animal visited by the guest
  visitedAnimals.forEach((visitedAnimal) => {
    if (visitedAnimal.feedCount > 0) {
      filteredAnimals.push(visitedAnimal);
    }
  });
  const feededToRender = filterVisitedAnimals(filteredAnimals, animals);
  return feededToRender;
}

//Funtion to reder all visited animals of user
function showVisitedAnimals(animalsArray) {
  const visitedAnimalsListContainer =
    document.getElementById("visited-animals");
  console.log(visitedAnimalsListContainer);
  animalsArray.forEach(function (animalInTheArray) {
    visitedAnimalsListContainer.appendChild(
      getAnimalCardNoBtn(animalInTheArray)
    );
  });
}

function createWrapperCard(cardToWrap) {
  const wrapper = document.createElement("div");
  wrapper.className = "card";
  wrapper.innerHTML = cardToWrap;
  return wrapper;
}

//Function that creates the user card
function getDashBoredCard(visitor) {
  const template = `
      <div class="card" style="min-height: 360px;" >
        <img src=${visitor.userImg} alt="${visitor.name} profile image"/>
        <div>
          <p >${visitor.name}</p>
          <p >${visitor.coins}</p>
        </div>
      </div>`;

  const visitordiv = document.getElementById("visitorDah");
  visitordiv.innerHTML = template;
}

function showFeededAnimals(animalArray) {
  const feededAnimalsOfUser = document.getElementById("feeded-animals");
  feededAnimalsOfUser.innerHTML = `<h1>Feeded animals : </h1>`;

  animalArray.forEach((animal) => {
    feededAnimalsOfUser.appendChild(getAnimalCardNoBtn(animal));
  });
}

function showFavoriteAnimal(animalArray) {
  let maxVisit = 0;
  let tempFavName = "";
  const favorite = document.getElementById("favorite-animal"); //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
  animalArray.forEach((animal) => {
    if (animal.visitCount > maxVisit) {
      maxVisit = animal.visitCount;
      tempFavName = animal.name;
    }
  });

  let favTextContent = `<h1>Favorite animal is ${tempFavName}</h1>`;
  favTextContent += `<p>Has been visited the most number of times wich is ${maxVisit} visits</p>`;
  favorite.innerHTML = favTextContent;
  console.log(favorite);
  alert(favorite);
  favorite.append(GetFavAnimalCard(tempFavName));
}

function GetFavAnimalCard(nameOfFavorite) {
  let favor = animals.find((animal) => animal.name == nameOfFavorite);
  return getAnimalCardNoBtn(favor);
}

function getAnimalCardNoBtn(animal) {
  console.log(animal);
  const cardOfAnimal = document.createElement("div");
  cardOfAnimal.classList.add("card");
  const template = `<img src="${animal.animalImg}" alt="${animal.name}"/>
    <div>
      <h2> ${animal.name}</h2>
      <p >weight: ${animal.weight}</p>
      <p >height: ${animal.height}</p>
      <p >color: ${animal.color}</p>
      <p >habitat: ${animal.habitat}</p>
    </div>`;
  cardOfAnimal.innerHTML = template;
  console.log(cardOfAnimal);
  return cardOfAnimal;
}

function init(animalArr, visitor) {
  if (visitor) {
    getDashBoredCard(visitor);
    let originAnimalsToRender = filterVisitedAnimals(animalArr, animals);
    let feededOriginAnimal = filteredFeededAnimals(animalArr, animals);
    showVisitedAnimals(originAnimalsToRender);
    showFeededAnimals(feededOriginAnimal);
    showFavoriteAnimal(animalArr);
  }
}

/*************************************/
//originAnimalsToRender
window.addEventListener("load", generateTheData);
