window.addEventListener("load", function () {
  const visitorsList = JSON.parse(localStorage.getItem("visitors"));
  const currentVisitor = JSON.parse(sessionStorage.getItem("selectedGuest"));
  const userName = document.getElementById("visitor-name");
  const userCoins = document.getElementById("coins");
  const resetBtn = document.getElementById("reset");
  initNav(visitorsList, currentVisitor, userName, userCoins);

  const dropDown = document.getElementById("visitorsList");
  dropDown.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    const visitorIndex = visitorsList.findIndex(
      (visitor) => visitor.name === selectedOption
    );
    userName.textContent = visitorsList[visitorIndex].name;
    userCoins.textContent = visitorsList[visitorIndex].coins;
  });
  resetBtn.addEventListener("click", function () {
    if (visitorsList) {
      localStorage.clear();
    }
    if (currentVisitor) {
      sessionStorage.clear();
    }
    window.location.href = "./login.html";
  });
});
function initNav(visitorsArr, currentVisitor, userName, userCoins) {
  if (currentVisitor) {
    userName.textContent = currentVisitor.name;
    userCoins.textContent = currentVisitor.coins;
  }

  renderToVisitorsDropDownList(visitorsArr);
}

function renderToVisitorsDropDownList(arr) {
  const parentSelect = document.getElementById("visitorsList");
  arr.forEach(function (visitor) {
    let newOption = document.createElement("option");
    newOption.value = visitor.name;
    newOption.textContent = visitor.name;
    newOption.id = visitor.name;

    parentSelect.appendChild(newOption);
  });
}
