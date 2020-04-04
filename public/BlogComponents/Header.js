class Header extends BlogComponent {
    title;
    icon_name;

    constructor(title, icon_name) {
        super();
        this.title = title;
        this.icon_name = icon_name;
    }
    get html() {
        let title = '<h3>' + this.title + '</h3>';
        let icon = '<img class="title-icon mx-auto mt-2" src="' + this.icon_name + '"/>';
        return '<div class="mt-2 d-flex flex-column">' + title + icon + '</div>'
    }
}
