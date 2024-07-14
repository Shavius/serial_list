/* eslint-disable class-methods-use-this */

export default class HeaderHeight {
	header: HTMLElement | null;
	wrapperBottom: HTMLElement | null;

	constructor() {
		this.header = document.querySelector("header");
		this.wrapperBottom = document.querySelector(".wrapper--bottom");
	}

	changeHeaderHeight(): void {
		if (this.header !== null && this.wrapperBottom !== null) {
			const headerHeight = window.getComputedStyle(this.header).height;
			const headerHeightNumber = parseInt(headerHeight.replace("px", ""), 10);

			this.wrapperBottom.style.marginTop = `${headerHeightNumber + 10}px`;
		}
	}

	resizeHeader(): void {
		window.addEventListener("resize", () => {
			this.changeHeaderHeight();
		});
	}

	init(): void {
		this.changeHeaderHeight();
		this.resizeHeader();
	}
}
