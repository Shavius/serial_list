import "../index.html";
import "../404.html";
import "../scss/style.scss";
import ControlButtons from "./modules/ControlButtons";
import UserCheck from "./modules/UserCheck";

const controlButtons = new ControlButtons();
controlButtons.init();

const userCheck = new UserCheck();
userCheck.init();
