import "../index.html";
import "../scss/style.scss";
import ControlButtons from "./modules/ControlButtons";
import UserCheck from "./modules/UserCheck";

console.log("Hello");

const controlButtons = new ControlButtons();
controlButtons.init();

const userCheck = new UserCheck();
userCheck.init();
