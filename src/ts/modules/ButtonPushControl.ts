export default class ButtonPushControl {
	static buttonPush = false;
	static buttonName = "header__push-serial";
	static buttonNameActive = "header__push-serial--active";

	static findButton(buttonName: string): HTMLElement | null {
		const button: HTMLElement | null = document.querySelector(`.${buttonName}`);

		if (button !== null) {
			return button;
		}

		return null;
	}

	static buttonEnable(): void {
		this.buttonPush = true;
		const button = ButtonPushControl.findButton(ButtonPushControl.buttonName);

		if (button !== null) {
			button.classList.remove(`${this.buttonName}`);
			button.classList.add(`${this.buttonNameActive}`);
			button.innerHTML = "Зберегти";
		}
	}

	static buttonDisable(): void {
		this.buttonPush = false;
		const button = ButtonPushControl.findButton(ButtonPushControl.buttonNameActive);

		if (button !== null) {
			button.classList.remove(`${this.buttonNameActive}`);
			button.classList.add(`${this.buttonName}`);
			button.innerHTML = "----";
		}
	}

	static init(): void {
		ButtonPushControl.buttonEnable();
	}
}
