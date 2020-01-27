let grid = {};

$(document).ready(function () {
    populate_display('display1', 4, 4);
    populate_display('display2', 6, 6);
});

function populate_display(display_id, cells_x, cells_y) {
    let cell_height = (100 / Math.max(cells_x, cells_y));
    let cell_width = (100 / Math.max(cells_x, cells_y));
    for (let i = 0; i < cells_y; i++) {
        for (let j = 0; j < cells_x; j++) {
            let id = display_id + '-cell-' + i + '-' + j;
            $('#' + display_id).append(
                '<div id="' + id + '" class="grid-cell">' + id + '</div>'
            );
            $('#' + id).css({
                'width': cell_width + '%',
                'height': cell_height + '%',
                'left': (i * cell_width) + '%',
                'top': (j * cell_height) + '%'
            });
        }
    }
}

sounds = {
    'dice-roll': new buzz.sound("dice-roll.mp3", {preload: true}),
    'win': new buzz.sound("winning.mp3", {preload: true}),
    'reset': new buzz.sound("reset.mp3", {preload: true}),
    'click': new buzz.sound("click.mp3", {preload: true})
};

function play_sound(name) {
    let sound = sounds[name];
    sound.play();
}
