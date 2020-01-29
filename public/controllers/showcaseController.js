let players = {
    "player1": {color: "#0000ff"},
    "player2": {color: "#ff0000"}
};

$(document).ready(function () {
    let body = new ExhibitBody('foo', 5, 5);
    let body2 = new ExhibitBody('baz', 4, 4);
    new Exhibit(
        random_description,
        body,
        "cover-container"
    );
    new Exhibit(
        seeker_description,
        body2,
        "cover-container"
    );
    $('#dev-button').click(function () {
        let sequence = (new SequenceGenerator(["player1", "player2"])).generate();
        body.run(sequence);
        body2.run(sequence);
    })
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
        this.body.populate();
    }

    run() {

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
    show_graph;
    obstacle_generator;
    clickable;
    animation_delay = 200;
    reset_delay = 500;

    constructor(id, cells_x, cells_y, show_graph, obstacle_generator, clickable) {
        this.id = id;
        this.cells_x = cells_x;
        this.cells_y = cells_y;
        this.show_graph = show_graph;
        this.obstacle_generator = obstacle_generator;
        this.clickable = clickable;

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

    get html() {
        return '<div class="graph-display-container rounded shadow-lg bg-dark mx-auto my-5 p-2">\n' +
               '    <div id="' + this.id + '" class="graph-display container"></div>\n' +
               '</div>'
    }

    run(sequence) {
        let last_step = 0;
        for (let i = 0; i < sequence.length; i++) {
            let step = sequence[i].step;
            let moves = sequence[i].moves;
            for (let j = 0; j < moves.length; j++) {
                let move = moves[j];
                let player = move.player;
                let x = move.x;
                let y = move.y;
                let cell_id = this.id + '-cell-' + x + '-' + y;
                $('#' + cell_id)
                    .delay(step * this.animation_delay)
                    .queue(function (next) {
                        $(this).css('background-color', players[player].color);
                        next();
                    });
            }
            last_step = step;
        }
        let this_function = this.run;
        $('#' + this.id)
            .delay(last_step * this.animation_delay + this.reset_delay)
            .queue(function (next) {
                $('.grid-cell').css('background-color', '#ffffff');
                next();
            });

        // this needs to be executed after last_step * this.animation_delay + this.reset_delay
        // setTimeout(this.run, last_step * this.animation_delay + this.reset_delay, sequence);
        // $('#cover-container').animate(undefined, last_step * this.animation_delay + this.reset_delay, undefined, this.run(sequence))
        // this.run(sequence)
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

