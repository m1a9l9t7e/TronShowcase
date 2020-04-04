class Exhibit extends BlogComponent {
    id;
    cells_x;
    cells_y;
    show_graph;
    clickable;
    animation_delay = 200;
    reset_delay = 500;

    constructor(id, gameSettings, show_graph, clickable) {
        super();
        this.id = id;
        this.game = new Game(gameSettings);
        this.cells_x = this.game.width;
        this.cells_y = this.game.height;
        this.show_graph = show_graph;
        this.clickable = clickable;
    }

    initialize() {
        this.populate();
        this.setGame(this.game);
        $('#' + this.id).trigger("start");
    }

    populate() {
        let cell_height = (100 / Math.max(this.cells_x, this.cells_y));
        let cell_width = (100 / Math.max(this.cells_x, this.cells_y));
        for (let x = 0; x < this.cells_x; x++) {
            for (let y = 0; y < this.cells_y; y++) {
                let cell_id = this.id + '-cell-' + x + '-' + y;
                $('#' + this.id).append(
                    // '<div id="' + cell_id + '" class="grid-cell">' + x + '|' + y + '</div>'
                    '<div id="' + cell_id + '" class="grid-cell grid-cell-' + this.id +'"></div>'
                );
                $('#' + cell_id).css({
                    'width': cell_width + '%',
                    'height': cell_height + '%',
                    'left': (x * cell_width) + '%',
                    'top': (y * cell_height) + '%'
                });
            }
        }
    }

    setGame(game) {
        let id = this.id;
        let animation_delay = this.animation_delay;
        let reset_delay = this.reset_delay;

        $('#' + this.id).on("start", function () {
            game.initialize();
            let sequenceGenerator = new SequenceGenerator(game);
            let sequence = sequenceGenerator.generate();
            for (let i = 0; i < sequence.length; i++) {
                let changes = sequence[i].changes;
                $('#' + id).delay(animation_delay);
                for (let j = 0; j < changes.length; j++) {
                    let change = changes[j];
                    let x = change.x;
                    let y = change.y;
                    let color = change.color;
                    let cell_id = id + '-cell-' + x + '-' + y;
                    // console.log("Step " + i + ": changing cell with id "+ cell_id + " at coordinates " + x + "," + y + " to this color " + color);
                    $('#' + id)
                        .queue(function (next) {
                            $('#' + cell_id).css('background-color', color);
                            next();
                        });

                }
            }
            $('#' + id)
                .delay(reset_delay)
                .queue(function (next) {
                    $('.grid-cell-' + id).css('background-color', '#ffffff');
                    $('#' + id).trigger("start");
                    next();
                })
        });
    }



    get html() {
        return '<div class="graph-display-container rounded shadow-lg mx-auto my-5 p-2">\n' +
            '    <div id="' + this.id + '" class="graph-display container"></div>\n' +
            '</div>'
    }
}
