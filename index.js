window.addEventListener("load", init);
function init() {
  const logInBtn = document.getElementById("loginbt");
  const su = document.getElementById("signup");
  logInBtn.addEventListener(
    "click",
    () => (window.location.href = "./login.html")
  );
  su.addEventListener("click", () => (window.location.href = "./signup.html"));
  return;
}
