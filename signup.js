function createNewVisitor(event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value;

  console.log(fname);
  const bool = visitorExists(fname);
  if (!bool) {
    makeVisitor(fname);
    window.location.href = "./login.html";
    return;
  }
}

const imageInput = document.getElementById("image");
const profilepic = document.getElementById("profilepic");

imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    profilepic.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

const visitorExists = (name) => {
  if (localStorage.getItem("visitors")) {
    let tempVisitors = JSON.parse(localStorage.getItem("visitors"));
    const isExist = tempVisitors.some((visitor) => visitor.name === name);
    if (isExist == true) {
      alert("Sorry, this name already exists");
      return true;
    } else return false;
  }
};

const makeVisitor = (name) => {
  const visitor = {
    name: name,
    coins: 50,
    userImg: profilepic.src, // Using the src attribute of profilepic
  };
  visitors.push(visitor);
  let strVisitors = JSON.stringify(visitors);
  localStorage.setItem("visitors", strVisitors);
};

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
