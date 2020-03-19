$(document).ready(function () {
    let gameSettings = new GameSettings(5, 5, [new WallHuggingAI("huggie", '#0000ff')]);
    let game = new Game(gameSettings);
    let body = new ExhibitBody('foo', game, false, false);
    new Exhibit(
        random_description,
        body,
        "cover-container"
    );

    let gameSettings2 = new GameSettings(6, 6, [new WallHuggingAI("huggie", '#0000ff'), new SeekerAI("seeker", '#ff0000')]);
    let game2 = new Game(gameSettings2);
    let body2 = new ExhibitBody('baz', game2, false, false);
    new Exhibit(
        seeker_description,
        body2,
        "cover-container"
    );

    let gameSettings3 = new GameSettings(11, 11, [new SeekerAI("seeker", '#ff0000'), new PowerHungryAI("power!", '#ff00ff')]);
    let game3 = new Game(gameSettings3);
    let body3 = new ExhibitBody('tartar', game3, false, false);
    new Exhibit(
        seeker_description,
        body3,
        "cover-container"
    );
});


class Exhibit {
    description;
    body;

    constructor(description, body, parent_container_id) {
        this.description = description;
        this.body = body;
        this.parent_container_id = parent_container_id;
        this.initialize()
    }

    initialize() {
        $('#' + this.parent_container_id).append(this.description.html + this.body.html);
        this.body.initialize();
    }
}

class ExhibitDescription {
    title;
    description;
    icon_name;

    constructor(title, description, icon_name) {
        this.title = title;
        this.description = description;
        this.icon_name = icon_name;
    }
    get html() {
        let title = '<h3>' + this.title + '</h3>';
        let icon = '<img class="title-icon mx-auto mt-2" src="' + this.icon_name + '"/>';
        let description = '<span class="p-3">' + this.description + '</span>';
        return '<div class="mt-2 d-flex flex-column">' + title + icon + description + '</div>'
    }
}

class ExhibitBody {
    id;
    cells_x;
    cells_y;
    sequence;
    show_graph;
    clickable;
    animation_delay = 200;
    reset_delay = 500;

    constructor(id, game, show_graph, clickable) {
        this.id = id;
        this.game = game;
        this.cells_x = game.width;
        this.cells_y = game.height;
        this.show_graph = show_graph;
        this.clickable = clickable;
    }

    initialize() {
        this.populate();
        let sequenceGenerator = new SequenceGenerator(this.game);
        this.sequence = sequenceGenerator.generate();
        this.set_sequence(this.sequence);
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

    set_sequence(sequence) {
        let id = this.id;
        let animation_delay = this.animation_delay;
        let reset_delay = this.reset_delay;

        $('#' + this.id).on("start", function () {
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
        return '<div class="graph-display-container rounded shadow-lg bg-dark mx-auto my-5 p-2">\n' +
            '    <div id="' + this.id + '" class="graph-display container"></div>\n' +
            '</div>'
    }
}

class GridGraph {
    cells_x;
    cells_y;

    constructor(cells_x, cells_y) {
        this.cells_x = cells_x;
        this.cells_y = cells_y;
    }
}

let random_description = new ExhibitDescription(
    "Random Algorithm",
    "This algorithm starts behaving randomly when an enemy gets to close.",
    "random.png"
);

let seeker_description = new ExhibitDescription(
    "Seeker Algorithm",
    "This algorithm seeks out its enemies by calculating the shortest path.",
    "target.png"
);

