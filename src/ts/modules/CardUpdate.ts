import ButtonPushControl from "./ButtonPushControl";
import DateControl from "./DateControl";

type params = "up" | "down";

export default class CardUpdate {
	currentCard: HTMLElement | null;
	nameCurrentSeria = ".serial-info__number-current span";
	nameAllSeria = ".serial-info__number-all span";
	nameLeftSeria = ".serial-info__number-left span";
	nameDateUpdate = ".card-date__item-update span";

	constructor(currentCard: HTMLElement | null) {
		this.currentCard = currentCard;
	}

	seriesUpdate(buttonParams: params): void {
		if (this.currentCard !== null) {
			const currentSeria: HTMLElement | null = this.currentCard.querySelector(this.nameCurrentSeria);
			const allSeria: HTMLElement | null = this.currentCard.querySelector(this.nameAllSeria);
			const leftSeria: HTMLElement | null = this.currentCard.querySelector(this.nameLeftSeria);
			const dateUpdate: HTMLElement | null = this.currentCard.querySelector(this.nameDateUpdate);

			if (currentSeria !== null && dateUpdate !== null) {
				const currentSeriaString: string = currentSeria.innerHTML;
				let currentSeriaNumber = Number(currentSeriaString);

				const currentDate = new DateControl();
				const buttonControl = new ButtonPushControl();

				if (buttonParams === "up") {
					currentSeriaNumber += 1;
				}

				if (buttonParams === "down" && currentSeriaNumber > 0) {
					currentSeriaNumber -= 1;
				}

				if (leftSeria !== null && allSeria !== null) {
					const allSeriaNumber = Number(allSeria.innerHTML);
					let leftSeriaNumber = Number(leftSeria.innerHTML);

					if (buttonParams === "up" && currentSeriaNumber <= allSeriaNumber) {
						leftSeriaNumber -= 1;
						currentSeria.innerHTML = `${currentSeriaNumber}`;
						leftSeria.innerHTML = `${leftSeriaNumber}`;

						dateUpdate.innerHTML = `${currentDate.getCurrentDate()}`;
						buttonControl.buttonEnable();
					}

					if (buttonParams === "down" && leftSeriaNumber < allSeriaNumber) {
						leftSeriaNumber += 1;
						currentSeria.innerHTML = `${currentSeriaNumber}`;
						leftSeria.innerHTML = `${leftSeriaNumber}`;

						dateUpdate.innerHTML = `${currentDate.getCurrentDate()}`;
						buttonControl.buttonEnable();
					}
				} else if (currentSeriaNumber > 0) {
					currentSeria.innerHTML = `${currentSeriaNumber}`;
					dateUpdate.innerHTML = `${currentDate.getCurrentDate()}`;
					buttonControl.buttonEnable();
				}
			}
		}
	}
}
