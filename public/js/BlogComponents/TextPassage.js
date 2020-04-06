class TextPassage extends BlogComponent{
    text;

    constructor(text) {
        super();
        this.text = text;
    }

    get html() {
        // return '<span class="p-3">' + this.text + '</span>';
        return '<p class="text-left">' + this.text + '</p>';
    }
}
