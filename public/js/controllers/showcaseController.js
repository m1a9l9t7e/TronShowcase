let gameSettings_advanced = new GameSettings(
    11, 11,
    [new SeekerAI("seeker", '#ff0000'), new PowerHungryAI("power", '#ffd700')],
    4,
    new RectangularObstaclesDecorator(new NullDecorator(), 20),
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
let gameSettings_spaceLoving = new GameSettings(
    5, 5,
    [new SpaceLovingAI("space", '#ffc0cb')],
    -1,
    new RandomObstaclesDecorator(new NullDecorator(), 4),
    new FairMirrored()
);
let gameSettings_spaceWallLoving = new GameSettings(
    5, 5,
    [new SpaceWallLovingAI("space", '#ffc0cb')],
    -1,
    new RandomObstaclesDecorator(new NullDecorator(), 4),
    new FairMirrored()
);
let gameSettings_basic_vs_space = new GameSettings(
    7, 7,
    [new BasicAI("", '#009999'), new SpaceWallLovingAI("space", '#ffc0cb')],
    4,
    new NullDecorator(),
    new FairMirrored()
);
let gameSettings_space_vs_seeker = new GameSettings(
    7, 7,
    [new SpaceWallLovingAI("space", '#ffc0cb'), new SeekerAI("seeker", '#ff0000')],
    4,
    new NullDecorator(),
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
    "stupid.png"
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
    "we just turn left or right randomly whenever there is a wall directly in front of us! " +
    "Let's see that in action."
    ),
    new Exhibit('basic', gameSettings_basic, false, false),
    new TextPassage(
    "As you can see this works reasonably well when the field is empty, but let's see what happens when we introduce some obstacles " +
    "into the mix."
    ),
    new Exhibit('basic2', gameSettings_basic_2, false, false),
    new TextPassage(
        "Sadly our algorithm is not very good at dealing with dead ends and finds itself dead a lot of the time :(. " +
        "You might also have noticed that it is not very efficient in using up the space it has and often makes choices that " +
        "cost it a lot of available space."
    ),
    new TextPassage(
      "So let's deal with these two problems one by one:"
    ),
    new List([
        "Avoid dead ends",
        "Use space more efficiently"
    ]),
    new Header(
        "The Space Loving Algorithm",
        "rocket.png"
    ),
    new TextPassage(
      "So how do we fix the first problem? How do we avoid the dead ends? " +
        "The answer is the Space Loving Algorithm. " +
        "How does it work? At each step, the algorithm checks which move (left, right, forward) leads to it having the most space " +
        "and goes there. " +
        "Since dead ends usually have very little space, the algorithm is very good at avoiding them.\n" +
        "Let's watch it in action."
    ),
    new Exhibit('space', gameSettings_spaceLoving, false, false),
    new TextPassage(
        "Ok, so we got the dead end problem squared away, how do we tackle the space efficiency? " +
        "It turns out, there is a small tweak we can use to boost our efficiency a whole lot. " +
        "We tell our algorithm to stick to as many walls as possible and never go out in the open." +
        "This wall hugging behavior will help us be less wasteful!"
    ),
    new TextPassage(
        "Let's see what happens when we tweak our space loving algorithm with the new mechanic."
    ),
    new Exhibit('spaceWall', gameSettings_spaceWallLoving, false, false),
    new Header(
        "Now Fight!",
        "sword.png"
    ),
    new TextPassage(
        "Let's make things a bit more interesting shall we? " +
        "Let's put our two Algorithms in a cage and duke it out. " +
        "Ladies & Gentlemen, please put your hands together for Basic Algorithm vs Space Loving Algorithm."
    ),
    new Exhibit('basic-vs-space', gameSettings_basic_vs_space, false, false),
    new TextPassage(
        "As of right now our algorithms are basically ignoring each others existence. Let's change that!"
    ),
    new Header(
        "The Seeker Algorithm",
        "target.png"
    ),
    new TextPassage(
        "This algorithm seeks out the enemy like a heat seeking missile. " +
        "Let's see how it performs against our space loving algorithm."
    ),
    new Exhibit('space-vs-seeker', gameSettings_space_vs_seeker, false, false),
]);

$(document).ready(function () {
    let parent_container_id = "cover-container";
    $('#' + parent_container_id).append(blog.html);
    blog.initialize();
});
