let cree = "";
let english = "";
let exportText = "";
let url = window.location.href;
let buttonDefault = "padding: 10px 10px;";
let exportable = false;

const container = document.createElement("div");
container.setAttribute("id", "div-container");
container.style =
  "position:fixed;z-index:99;cursor:pointer;padding:5px;" +
  "top:20px;right:0px;display:flex;";
document.body.appendChild(container);

const buttonCree = document.createElement("Button");
buttonCree.setAttribute("id", "get-cree");
buttonCree.innerHTML = "Save Cree";
buttonCree.style = buttonDefault;
buttonCree.onclick = function () {
  getCree();
};
container.appendChild(buttonCree);

const buttonEnglish = document.createElement("Button");
buttonEnglish.setAttribute("id", "get-english");
buttonEnglish.innerHTML = "Save English";
buttonEnglish.style = buttonDefault;
buttonEnglish.onclick = function () {
  getEnglish();
};
container.appendChild(buttonEnglish);

const buttonAdd = document.createElement("Button");
buttonAdd.setAttribute("id", "log-text");
buttonAdd.innerHTML = "Log";
// buttonAdd.style = "background-color: #5e5a5a;";
buttonAdd.onclick = function () {
  addToList();
};
container.appendChild(buttonAdd);

const buttonExport = document.createElement("Button");
buttonExport.setAttribute("id", "export-text");
buttonExport.innerHTML = "Export";
// buttonExport.style = "background-color: #5e5a5a;";
// Need to add a disabled class on button Export that disables it until it is enabled with a call from buttonAdd (#log-text)
// document.getElementById("Button").disabled = true;
buttonExport.onclick = function () {
  export2Anki();
};
container.appendChild(buttonExport);

const buttonQuit = document.createElement("Button");
buttonQuit.setAttribute("id", "button-quit");
buttonQuit.innerHTML = "X";
buttonQuit.style =
  "margin-bottom: 0;font-size: 8px;font-weight: 400;white-space: nowrap;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;padding: 2px 2px;font-size: 8px;text-align: center;outline: none;color: #fff;background-color: #0099cc;border: none;border-radius: 15px;box-shadow: 0 2px #999;transition: 0.4s;align-self: flex-start;";
buttonQuit.onclick = function () {
  quitting();
};
container.appendChild(buttonQuit);

let btnBaseCss = document.createElement("style");
btnBaseCss.type = "text/css";
btnBaseCss.innerHTML =
  ".cssClass { margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;padding: 10px 15px;font-size: 14px;text-align: center;outline: none;color: #fff;background-color: #0099cc;border: none;border-radius: 15px;box-shadow: 0 4px #999;transition: 0.4s; }";
document.getElementsByTagName("head")[0].appendChild(btnBaseCss);
document.getElementById("get-cree").className = "cssClass";
document.getElementById("get-english").className = "cssClass";

let btnDisabled = document.createElement("style");
btnDisabled.type = "text/css";
btnDisabled.innerHTML =
  ".cssClassDisabled { margin-bottom: 0;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;padding: 10px 15px;font-size: 14px;text-align: center;outline: none;color: #fff;background-color: #5e5a5a;border: none;border-radius: 15px;box-shadow: 0 4px #999; }";
document.getElementsByTagName("head")[0].appendChild(btnDisabled);
document.getElementById("export-text").className = "cssClassDisabled";
document.getElementById("log-text").className = "cssClassDisabled";

function getSelectionText() {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

function getCree() {
  cree = getSelectionText();
  if (cree != "") {
    buttonCree.style = "background-color:#4CAF50;";
    console.log("Current Cree Queue: ", cree);
    if (english != "") {
      document.getElementById("log-text").className = "cssClass";
      document.getElementById("log-text").classList.remove("cssClassDisabled");
    }
  }
}

function getEnglish() {
  english = getSelectionText();
  if (english != "") {
    buttonEnglish.style = "background-color:#4CAF50;";
    console.log("Current English Queue: ", english);
    if (cree != "") {
      document.getElementById("log-text").className = "cssClass";
      document.getElementById("log-text").classList.remove("cssClassDisabled");
    }
  }
}

function addToList() {
  if (cree != "" && english != "") {
    exportText += `${cree}\|${english}\|${url}\n`;
    buttonCree.style = buttonDefault;
    buttonEnglish.style = buttonDefault;
    buttonAdd.style = "background-color: #5e5a5a;";
    document.getElementById("export-text").classList.remove("cssClassDisabled");
    document.getElementById("export-text").className = "cssClass";
    // document.getElementById("export-text").disabled = false;
    console.log(`Added to Log: \n ${cree}\|${english}\|${url}\n`);
    cree = "";
    english = "";
    exportable = true;
  } else {
    alert(
      "You must save both Cree Text and English Text in order to be able to log the data."
    );
  }
}

function export2Anki() {
  if (exportable == true) {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(exportText)
    );
    element.setAttribute("download", "cardsForAnki.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    exportable = false;
    document.getElementById("export-text").className = "cssClass";
    document.getElementById("export-text").classList.remove("cssClassDisabled");
  }
}

function quitting() {
  document.getElementById("get-cree").remove();
  document.getElementById("get-english").remove();
  document.getElementById("log-text").remove();
  document.getElementById("export-text").remove();
  document.getElementById("button-quit").remove();
  document.getElementById("div-container").remove();
  delete window.cree;
  delete window.english;
  delete window.exportText;
  delete window.url;
  delete window.buttonDefault;
  delete window.btnBaseCss;
}

// function getFilename() {
//   const url = window.location.href;
//   filenameOne = /.net\/(.+)/.exec(url)[1];
//   filenameTwo = /([^.]+)/.exec(filenameOne)[1];
//   filename = `${filenameTwo}.txt`;
//   return filename;
// }
