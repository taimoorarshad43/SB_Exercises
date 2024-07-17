const containerId = document.getElementById("container");
console.log(containerID);

const containerIdQs = document.querySelector("#container");
console.log(containerIdQs);

const listClassSecond = document.querySelectorAll(".second");
console.log(listClassSecond);

const olElement = document.getElementsByTagName("ol");
const innerOlElement = olElement.querySelector("li.third");
console.log(innerOlElement);

containerId.innerText = "Hello";

const footerDiv = document.querySelector("div.footer");
footerDiv.className += " main";

footerDiv.classList.remove("main");

const newLiElement = document.createElement("li");
newLiElement.innerText = "four";

const ulElement = document.getElementsByTagName("ul");
ulElement.append(newLiElement);

const olElementChildren = olElement.children;

for(child in olElementChildren){
    child.style.backgroundcolor = "green"
}

footerDiv.remove();