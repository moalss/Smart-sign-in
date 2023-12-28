let infosFeld = [];
let allInfos = "allInfos";
/*Start Welcome */
let welcomeName = document.querySelector(".navbar-brand");
/*End Welcome */

/*Start Login */
let inLoginMail = document.getElementById("validationTooltipEmailLogin");
let inLoginPass = document.getElementById("validationTooltipPassLogin");
let allLoginValid = document.querySelector(".acoInfoLogin");
let failSingIn = document.querySelector("#failSingIn");
let btnLogin = document.querySelector(".btnLogin");
let formL = document.querySelector("form");
/*End Login */

/*Start Sing Up */
let sucssesSingUp = document.getElementById("sucssesSingUp");
let allInputsAreRequired = document.getElementById("allRequird");
let mailRequired = document.getElementById("mailRequird");
let nameRequired = document.getElementById("nameRequird");
let PassRequird = document.getElementById("passRequird");
let inSingUpName = document.getElementById("validationTooltipNameSingUp");
let inSingUpMail = document.getElementById("validationTooltipEmailSingUp");
let inSingUpPass = document.getElementById("validationTooltipPassSingUp");
let allSingUpValid = document.querySelector(".acoInfoSingUp");
let btnSingUp = document.querySelector(".btnSingUp");

/*End Sing Up */

/* Start Localstorage */
// get from Localstorage
if (localStorage.getItem(allInfos)) {
  infosFeld = JSON.parse(localStorage.getItem(allInfos));
}
// set in Localstorage
function setToLocalStorage() {
  localStorage.setItem(allInfos, JSON.stringify(infosFeld));
}
/* End Localstorage */

/* Start Functions */

/*Add  */
console.log(infosFeld);
function addSingUpInfos() {
  let singUpInfos = {
    singUpName: inSingUpName.value,
    singUpMail: inSingUpMail.value,
    singUpPass: inSingUpPass.value,
  };

  if (isEmptySingUp()) {
    noneToBlock(allInputsAreRequired);

    return;
  }
  if (isMailExist(inSingUpMail.value)) {
    //clearInputs();
    noneToBlock(mailRequired);
    return;
  }
  if (!passValidation(inSingUpPass.value)) {
    noneToBlock(PassRequird);
    return;
  }
  if (!nameValidation(inSingUpName.value)) {
    noneToBlock(nameRequired);
    return;
  }

  if (!maileValidation(inSingUpMail.value)) {
    noneToBlock(mailRequired);
    return false;
  } else {
    blockToNone(mailRequired);
    blockToNone(PassRequird);
    blockToNone(nameRequired);
    blockToNone(allInputsAreRequired);
    infosFeld.push(singUpInfos);
    setToLocalStorage();
    clearInputs();
    sucssesSingUp.classList.replace("d-none", "d-block");
  }
}

function noneToBlock(target) {
  target.classList.replace("d-none", "d-block");
}
function blockToNone(target) {
  target.classList.replace("d-block", "d-none");
}

function isEmptySingUp() {
  if (
    inSingUpName.value !== "" &&
    inSingUpMail.value !== "" &&
    inSingUpPass.value !== ""
  ) {
    return false;
  }

  return true;
}
function isEmptySingIn() {
  if (inLoginMail.value !== "" && inLoginPass.value !== "") {
    return false;
  }

  return true;
}
function clearInputs() {
  inSingUpMail.value = "";
  inSingUpName.value = "";
  inSingUpPass.value = "";
}
//removeFeld(infosFeld)
function removeFeld(feld) {
  feld.splice(0, feld.length);
  localStorage.removeItem(allInfos);
}

function nameValidation(name) {
  let erg = /^\D([a-zA-Z\_])+([0-9]{0,})$/.test(name);

  return erg;
}

function maileValidation(mail) {
  let erg = /^\D[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);

  return erg;
}
function passValidation(pass) {
  //Der reguläre Ausdruck foo(?=bar) würde mit "foo" übereinstimmen, wenn es von "bar" gefolgt wird, aber "bar" wäre nicht Teil der tatsächlichen Übereinstimmung.
  //  let erg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass);
  let erg = /^([a-zA-Z0-9)]){8,}$/.test(pass);

  return erg;
}

function isMailExist(mail) {
  for (let i = 0; i < infosFeld.length; i++) {
    if (infosFeld[i].singUpMail.toLowerCase() === mail.toLowerCase()) {
      return true;
    }
  }
  return false;
}
function stopReForm(form) {
  form.preventDefault();
}

function isMailAndPass(mail, pass) {
  for (let i = 0; i < infosFeld.length; i++) {
    if (
      infosFeld[i].singUpMail.toLowerCase() === mail.value &&
      infosFeld[i].singUpPass.toLowerCase() === pass.value.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}
/* End Functions */

/* Start Events */
if (btnSingUp !== null) {
  btnSingUp.addEventListener("click", function (e) {
    addSingUpInfos();

    e.preventDefault();
  });
}

if (btnLogin !== null) {
  btnLogin.addEventListener("click", function (e) {
    if (isEmptySingIn()) {
      noneToBlock(allLoginValid);
    }
    if (isMailAndPass(inLoginMail, inLoginPass)) {
      blockToNone(allLoginValid);
      window.open("welcome.html", "_self");
    } else if (!isMailAndPass(inLoginMail, inLoginPass)) {
      noneToBlock(failSingIn);
      blockToNone(allLoginValid);
    }

    e.preventDefault();
  });
}

/* End Events */
