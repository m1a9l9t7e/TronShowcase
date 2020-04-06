let gameSettings_advanced = new GameSettings(
    11, 11,
    [new SeekerAI("seeker", '#40e0d0'), new PowerHungryAI("power", '#ffd700')],
    5,
    new RandomObstaclesDecorator(new NullDecorator(), 5),
    new FairMirrored()
);
let gameSettings_nothing = new GameSettings(
    5, 5,
    [new NothingAI("", '#333333')],
    -1,
    new NullDecorator(),
    new FairMirrored()
);
let gameSettings_basic = new GameSettings(
    5, 5,
    [new BasicAI("", '#009999')],
    -1,
    new NullDecorator(),
    new FairMirrored()
);
let gameSettings_basic_2 = new GameSettings(
    5, 5,
    [new BasicAI("", '#009999')],
    -1,
    new RandomObstaclesDecorator(new NullDecorator(), 6),
    new FairMirrored()
);

let blog = new Blog([
    new TextPassage(
        "In this interactive Article I would love to show you - step by step - the core ideas and insights that led " +
        "to the development of an Algorithm for the game Tron like the one you see below:"
    ),
    new Exhibit('welcome', gameSettings_advanced, false, false),
    new TextPassage(
        "Whenever you see an Exhibit like this one, feel free to click anywhere on the grid to change " +
        "the playing field and see how the different algorithms react!"
    ),
    new TextPassage(
        "The final algorithm can be a bit daunting, as is often the case with ideas and products that " +
        "have gone through many iterations of development. " +
        "But I promise you will understand all of it and might come out a smarter person at the end."
    ),
    new TextPassage(
        "So lets start at the very beginning."
    ),
    new Header(
    "The Nothing Algorithm",
    "random.png"
    ),
    new TextPassage(
    "What is the easiest thing we can do to start off? Well, nothing really. " +
    "We just start by going in a random direction until we run into a wall and die."
    ),
    new Exhibit('nothing', gameSettings_nothing, false, false),
    new TextPassage(
    "So how do we avoid running into walls?"
    ),
    new Header(
    "The Basic Algorithm",
    "random.png"
    ),
    new TextPassage(
    "To avoid running into walls," +
    "we just turn left or right at will whenever there is a wall directly in front of us! " +
    "Let's see that in action."
    ),
    new Exhibit('basic', gameSettings_basic, false, false),
    new TextPassage(
    "As you can see this works great when the field is empty, but let's see what happens when we introduce some obstacles " +
    "into the mix."
    ),
    new Exhibit('basic', gameSettings_basic, false, false)
]);

$(document).ready(function () {
    let parent_container_id = "cover-container";
    $('#' + parent_container_id).append(blog.html);
    blog.initialize();
});
