import DateControl from "./DateControl";

type params = "up" | "down";

export default class CardUpdate {
	currentCard: HTMLElement | null;
	nameCurrentSeria: string = ".serial-info__number-current span";
	nameAllSeria: string = ".serial-info__number-all span";
	nameLeftSeria: string = ".serial-info__number-left span";
	nameDateUpdate: string = ".card-date__item-update span";

	constructor(currentCard: HTMLElement | null) {
		this.currentCard = currentCard;
	}

	seriesUpdate(buttonParams: params): void {
		if (this.currentCard !== null) {
			const currentSeria: HTMLElement | null = this.currentCard.querySelector(this.nameCurrentSeria);
			const allSeria: HTMLElement | null = this.currentCard.querySelector(this.nameAllSeria);
			const leftSeria: HTMLElement | null = this.currentCard.querySelector(this.nameLeftSeria);
			const dateUpdate: HTMLElement | null = this.currentCard.querySelector(this.nameDateUpdate);

			if (currentSeria !== null) {
				const currentSeriaString: string = currentSeria.innerHTML;
				let currentSeriaNumber: number = Number(currentSeriaString);

				if (dateUpdate !== null) {
					const currentDate = new DateControl().getCurrentDate();
					dateUpdate.innerHTML = `${currentDate}`;
				}

				if (buttonParams === "up") {
					currentSeriaNumber += 1;
				}

				if (buttonParams === "down" && currentSeriaNumber > 0) {
					currentSeriaNumber -= 1;
				}

				currentSeria.innerHTML = `${currentSeriaNumber}`;

				if (leftSeria !== null && allSeria !== null) {
					const allSeriaNumber: number = Number(allSeria.innerHTML);

					const left = allSeriaNumber - currentSeriaNumber;

					if (left >= 0) {
						leftSeria.innerHTML = `${left}`;
					}

					if (currentSeriaNumber > allSeriaNumber) {
						currentSeria.innerHTML = `${allSeriaNumber}`;
					}
				}
			}
		}
	}
}