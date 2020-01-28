$(document).ready(function () {
    new Exhibit(
        random_description,
        new ExhibitBody('foo', 4, 4),
        "cover-container"
    );
    new Exhibit(
        seeker_description,
        new ExhibitBody('bar', 10, 10),
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
                    '<div id="' + cell_id + '" class="grid-cell"></div>'
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

    run() {

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

