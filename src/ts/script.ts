import "../index.html";
import "../scss/style.scss";
import CreateFormCard from "./modules/CreateFormCard";

console.log("Hello");

const pageBody: HTMLElement | null = document.querySelector("body");
const pageButtonCreateSerial: HTMLElement | null = document.querySelector(".header__create-serial");

const createCard = new CreateFormCard(pageBody, pageButtonCreateSerial);
createCard.activate();
