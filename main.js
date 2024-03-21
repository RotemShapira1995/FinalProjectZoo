// מערכים גלובלים שישמשו אותנו בכל העמודים

let visitors = [
  {
    name: "John Smith",
    coins: 50,
    userImg: "./images/JohnSmith.png",
    visitedAnimals: [],
  },
  {
    name: "Emily Johnson",
    coins: 50,
    userImg: "./images/EmilyJohnson.png",
    visitedAnimals: [],
  },
  {
    name: "Michael Williams",
    coins: 50,
    userImg: "./images/MichaelWilliams.png",
    visitedAnimals: [],
  },
  {
    name: "Jessica Brown",
    coins: 50,
    userImg: "./images/JessicaBrown.png",
    visitedAnimals: [],
  },
  {
    name: "Christopher Jones",
    coins: 50,
    userImg: "./images/ChristopherJones.png",
    visitedAnimals: [],
  },
  {
    name: "Ashley Davis",
    coins: 50,
    userImg: "./images/AshleyDavis.png",
    visitedAnimals: [],
  },
  {
    name: "Matthew Miller",
    coins: 50,
    userImg: "./images/MatthewMiller.png",
    visitedAnimals: [],
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    userImg: "./images/AmandaWilson.png",
    visitedAnimals: [],
  },
  {
    name: "David Moore",
    coins: 50,
    userImg: "./images/DavidMoore.png",
    visitedAnimals: [],
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    userImg: "./images/SarahTaylor.png",
    visitedAnimals: [],
  },
  {
    name: "James Anderson",
    coins: 50,
    userImg: "./images/JamesAnderson.png",
    visitedAnimals: [],
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    userImg: "./images/JenniferThomas.png",
    visitedAnimals: [],
  },
  {
    name: "Robert Jackson",
    coins: 50,
    userImg: "./images/RobertJackson.png",
    visitedAnimals: [],
  },
  {
    name: "Elizabeth White",
    coins: 50,
    userImg: "./images/ElizabethWhite.png",
    visitedAnimals: [],
  },
  {
    name: "Daniel Harris",
    coins: 50,
    userImg: "./images/DanielHarris.png",
    visitedAnimals: [],
  },
  {
    name: "Melissa Martin",
    coins: 50,
    userImg: "./images/MelissaMartin.png",
    visitedAnimals: [],
  },
  {
    name: "William Thompson",
    coins: 50,
    userImg: "./images/WilliamThompson.png",
    visitedAnimals: [],
  },
  {
    name: "Linda Garcia",
    coins: 50,
    userImg: "./images/LindaGarcia.png",
    visitedAnimals: [],
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    userImg: "./images/JosephMartinez.png",
    visitedAnimals: [],
  },
  {
    name: "Karen Robinson",
    coins: 50,
    userImg: "./images/KarenRobinson.png",
    visitedAnimals: [],
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/lion.jpg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    animalImg: "./images/elephant.png",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/Giraffe.png",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/tiger.png",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/monkey.png",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/kangroo.png",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    animalImg: "./images/penguin.png",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/zebra.png",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImg: "./images/Cheetah.png",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }
}
generateDataset();

//****/**/****************** */
/*function logout() {
  if (sessionStorage.getItem("selectedGuest")) {
    const logOutBtn = document.createElement("button");
    logOutBtn.textContent = "Log Out";
    logOutBtn.classList.add("navbarBtn");
    logOutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("selectedGuest");
      logOutBtn.classList.remove("navbarBtn");
      logOutBtn.classList.add("navbarBtnHide");
    });

    // Check if the user is logged in and toggle classes accordingly
    const isLoggedIn = sessionStorage.getItem("selectedGuest") !== null;
    if (isLoggedIn) {
      logOutBtn.classList.remove("navbarBtnHide");
    } else {
      logOutBtn.classList.add("navbarBtnHide");
    }

    document.body.appendChild(logOutBtn); // Adding the button to the document
  }
}*/
