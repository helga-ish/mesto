export default class Section {
    constructor({ renderItems }, containerSelector) {
        this._renderItems = renderItems;
        this._container = document.querySelector(containerSelector);
    }
    renderCards(items) {
        items.reverse().forEach(item => {
            this._renderItems(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

    render(element) {
        this.addItem(element);
    }
};