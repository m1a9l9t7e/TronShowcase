let blog = new Blog();

let header_basic = new Header(
    "The Basic Algorithm",
    "random.png"
);

let gameSettings_basic = new GameSettings(10, 10, [new BasicAI("", '#009999')], new RectangularObstaclesGrid(40), new FairMirrored());
// let gameSettings_basic = new GameSettings(5, 5, [new BasicAI("", '#009999')], new EmptyGrid(), new FairMirrored());
let showcase_basic = new Exhibit('basic', gameSettings_basic, false, false);

blog.addElement(header_basic);
blog.addElement(showcase_basic);

$(document).ready(function () {
    let parent_container_id = "cover-container";
    $('#' + parent_container_id).append(blog.html);
    blog.initialize();
});
