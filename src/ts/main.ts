import "../index.html";
import "../404.html";
import "../scss/main.scss";
import ControlButtons from "./modules/ControlButtons";
import UserCheck from "./modules/UserCheck";
import ScrollingAfterReboot from "./modules/ScrollingAfterReboot";

const scrollingAfterReboot = new ScrollingAfterReboot();
scrollingAfterReboot.saveScrollPositionBeforeUnload();

const controlButtons = new ControlButtons();
controlButtons.init();

const userCheck = new UserCheck();
userCheck.init();
