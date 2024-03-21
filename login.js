let visitorsArrayFromLocal = JSON.parse(localStorage.getItem("visitors"));
let selectedGuest = JSON.parse(sessionStorage.getItem("selectedGuest"));
const dialog = document.querySelector("#visitor-dialog");

const getVisitorHTMLCard = (visitor) => {
  const template = `
      <div class="card" style="min-height: 360px;" >
        <img src=${visitor.userImg} alt="user profile image"/>
        <div>
          <p >${visitor.name}</p>
          <p >${visitor.coins}</p>
        </div>
      </div>`;

  const newDivCardWrapper = createWrapperCard(template);
  newDivCardWrapper.addEventListener("click", () => {
    handleVisitorClick(visitor);
  });

  return newDivCardWrapper;
};

const createWrapperCard = (cardToWrap) => {
  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = cardToWrap;

  return wrapper;
};

function loginAsVisitor(visitor) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.style.display = "flex";
  buttonWrapper.style.flexDirection = "column-reverse";
  const loginBtn = document.createElement("button");
  loginBtn.innerText = "Log In";

  loginBtn.addEventListener("click", () => {
    // Check if there is a selected guest
    if (selectedGuest) {
      let confirmDisconnect = confirm(
        "There is already a selected guest. Do you want to disconnect?"
      );
      if (confirmDisconnect) {
        localStorage.removeItem("selectedGuest");
        selectedGuest = null;
        alert("User disconnected. Try loging in again");
        dialog.close();
      }
    } else {
      selectedGuest = visitor;
      sessionStorage.setItem("selectedGuest", JSON.stringify(selectedGuest));
      dialog.close();
      window.location.href = "./zoo.html";
    }
  });

  buttonWrapper.append(loginBtn);
  return buttonWrapper;
}

function exitDialog(dialog) {
  const exitButton = document.createElement("div");
  exitButton.style.position = "absolute";
  exitButton.style.top = "0px";
  exitButton.style.right = "6px";
  exitButton.innerText = "X";

  exitButton.addEventListener("click", () => {
    dialog.close();
  });

  return exitButton;
}

const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  dialog.append(
    exitDialog(dialog),
    getVisitorHTMLCard(visitor),
    loginAsVisitor(visitor)
  );
  dialog.showModal();
};

function createSearchBox(queryInput) {
  queryInput.id = "query-input";
  queryInput.placeholder = "search";
  queryInput.className = "form-control ";
}

const getSearchBox = () => {
  const queryInput = document.createElement("input");
  createSearchBox(queryInput);
  queryInput.oninput = (e) => {
    visitorsArrayFromLocal = visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderVisitors();
  };

  return queryInput;
};

const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
    <h2>No result</h2>
    <button id="clear-filter-btn" class="btn btn-dark">Clear search</button>
    `;
  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return templateWrapper;
};

const clearSearchBox = () => {
  const input = document.getElementById("query-input");
  input.value = "";
  visitorsArrayFromLocal = [...visitors];
  renderVisitors();
};

const renderVisitors = () => {
  const visitorCards = visitorsArrayFromLocal.map(getVisitorHTMLCard);

  const visitorsPlaceholder = document.getElementById("placeholder");
  visitorsPlaceholder.innerHTML = "";

  if (!visitorCards.length) {
    visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  } else visitorsPlaceholder.append(...visitorCards);
};

const titleElement = document.querySelector("h1");
titleElement.insertAdjacentElement("afterend", getSearchBox());
window.addEventListener("load", renderVisitors);
