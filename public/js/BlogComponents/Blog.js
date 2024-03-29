class Blog {
    elements = [];

    constructor(elements) {
        for (let i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
    }

    addElement(element) {
        this.elements.push(element);
    }

    get html() {
        let string = "";
        for (let i = 0; i < this.elements.length; i++) {
            string += this.elements[i].html;
        }
        return string;
    }

    initialize() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].initialize();
        }
    }
}
// let blog = new Blog();
//
// let passage_welcome_1 = new TextPassage(
//     "In this interactive Article I would love to show you - step by step - the core ideas and insights that led" +
//     "to the development of an Algorithm for the game Tron like the one you see below:"
// );
//
// let gameSettings_advanced = new GameSettings(5, 5, [new WallHuggingAI("huggie", '#0000ff')]);
// let showcase_welcome = new Exhibit('welcome', gameSettings_welcome, false, false);
//
// let passage_welcome_2 = new TextPassage(
//     "Whenever you see an Exhibit like this one, feel free to click anywhere on the grid to change" +
//     "the playing field and see how the different algorithms react!"
// );
//
// let passage_welcome_3 = new TextPassage(
//     "The final algorithm can be a bit daunting, as is often the case with ideas and products that" +
//     "have gone through many iterations of development." +
//     "But I promise you will understand all of it and might come out a smarter person at the end."
// );
//
// let passage_welcome_4 = new TextPassage(
//     "So lets start at the very beginning."
// );
//
// let header_nothing = new Header(
//     "The Nothing Algorithm",
//     "random.png"
// );
//
// let passage_nothing_1 = new TextPassage(
//     "What is the easiest thing we can do to start off? Well, nothing really. " +
//     "We just start of going in a random direction until we run into a wall and die."
// );
//
// let gameSettings_nothing = new GameSettings(5, 5, [new NothingAI("", '#999999')]);
// let showcase_nothing = new Exhibit('nothing', gameSettings_nothing, false, false);
//
// let passage_nothing_2 = new TextPassage(
//     "So how do we avoid running into walls?"
// );
//
// let header_basic = new Header(
//     "The Basic Algorithm",
//     "random.png"
// );
//
// let passage_basic_1 = new TextPassage(
//     "To avoid running into walls," +
//     "we just turn left or right at will whenever there is a wall directly in front of us!" +
//     "Let's see that in action."
// );
//
// let gameSettings_basic = new GameSettings(5, 5, [new NothingAI("", '#009999')]);
// let showcase_basic = new Exhibit('basic', gameSettings_basic, false, false);
//
// let passage_basic_2 = new TextPassage(
//     "As you can see this works great when the field is empty, but let's see what happens when we introduce some obstacles\n" +
//     "into the mix."
// );
//
// blog.addElement(passage_welcome_1);
// blog.addElement(showcase_welcome);
// blog.addElement(passage_welcome_2);
// blog.addElement(passage_welcome_3);
// blog.addElement(passage_welcome_4);
// blog.addElement(header_nothing);
// blog.addElement(passage_nothing_1);
// blog.addElement(showcase_nothing);
// blog.addElement(passage_nothing_2);
// blog.addElement(header_basic);
// blog.addElement(passage_basic_1);
// blog.addElement(showcase_basic);
// blog.addElement(passage_basic_2);



// let random_description = new ExhibitDescription(
//     "Random Algorithm",
//     "This algorithm starts behaving randomly when an enemy gets to close.",
//     "random.png"
// );
//
// let seeker_description = new ExhibitDescription(
//     "Seeker Algorithm",
//     "This algorithm seeks out its enemies by calculating the shortest path.",
//     "target.png"
// );

