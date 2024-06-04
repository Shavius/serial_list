import "../index.html";
import "../scss/style.scss";
import CreateFormCard from "./modules/CreateFormCard";
import CardControlButtons from "./modules/CardControlButtons";

console.log("Hello");

const pageBody: HTMLElement | null = document.querySelector("body");
const pageButtonCreateSerial: HTMLElement | null = document.querySelector(".header__create-serial");
const mainContent: HTMLElement | null = document.querySelector(".main__content");

const createCard = new CreateFormCard(pageBody, pageButtonCreateSerial);
createCard.buttonInit();

const cardControlButtons = new CardControlButtons(mainContent);
cardControlButtons.init();
