export default class HeaderHeight {
	header: HTMLElement | null;
	wrapperBottom: HTMLElement | null;
	static initEnable = false;

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
		if (HeaderHeight.initEnable === false) {
			HeaderHeight.initEnable = true;

			this.changeHeaderHeight();
			this.resizeHeader();
		}
	}
}
