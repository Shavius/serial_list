import IUserData from "../interfaces/IUserData";
import FirebaseControl from "./FirebaseControl";
import ModalAuthorization from "./ModalAuthorization";
import UserCheck from "./UserCheck";

export default class Authorization {
	modal: ModalAuthorization;

	constructor() {
		this.modal = new ModalAuthorization();
	}

	getDataFromModal(): IUserData | null {
		const userEmailText: HTMLInputElement | null = document.querySelector(".modal-authorization__email");
		const userPasswordText: HTMLInputElement | null = document.querySelector(".modal-authorization__password");

		if (userEmailText !== null && userPasswordText !== null) {
			return {
				email: userEmailText.value,
				password: userPasswordText.value,
			};
		}

		return null;
	}

	async complite(email: string, password: string): Promise<void> {
		this.modal.modalLoad("Йде перевірка зачикайте");
		try {
			const firebase = new FirebaseControl();
			const userInfo = await firebase.loginWithEmailPassword(email, password);
			if (userInfo !== null) {
				const userData: IUserData = { email, password };
				const userDataText = JSON.stringify(userData);
				localStorage.setItem("userData", userDataText);

				this.modal.modalYes("Перевірка пройшла вдало!");
				const userCeck = new UserCheck();
				userCeck.init();
			} else {
				this.modal.modalError("В доступі відмовлено!");
			}
		} catch (e) {
			console.error(e);
			this.modal.modalError("В доступі відмовлено!");
		}
	}

	init(): void {
		this.modal.addModalToPage();

		const buttonNo = document.querySelector(".modal__buttons-no");
		if (buttonNo !== null) {
			buttonNo.addEventListener("click", () => {
				this.modal.removeModalToPage();
			});
		}

		const buttonYes = document.querySelector(".modal__buttons-yes");
		if (buttonYes !== null) {
			buttonYes.addEventListener("click", (e) => {
				e.preventDefault();
				const userData: IUserData | null = this.getDataFromModal();

				if (userData !== null && userData.email !== "" && userData.password !== "") {
					this.complite(userData.email.toLocaleLowerCase(), userData.password.toLocaleLowerCase());
				}
			});
		}

		const buttonShowPassword: HTMLElement | null = document.querySelector(".modal-buttons__show-password");
		const userPasswordText: HTMLInputElement | null = document.querySelector(".modal-authorization__password");
		if (buttonShowPassword !== null && userPasswordText !== null) {
			buttonShowPassword.addEventListener("click", (e) => {
				e.preventDefault();
				if (userPasswordText.type === "password") {
					userPasswordText.type = "text";
				} else {
					userPasswordText.type = "password";
				}
			});
		}
	}
}
