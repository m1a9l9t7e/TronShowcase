class List extends BlogComponent {
    items;

    constructor(items) {
        super();
        this.items = items;
    }

    get html() {
        let html = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            html += "<li>" + this.items[i] + "</li>"
        }
        html += "</ul>";
        return html;
    }
}