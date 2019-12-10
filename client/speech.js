var texts = ["Once upon a time ", "The problem was ", "Thankfully ", "In the end "];
var minute = 60000;

var lookingForAnswer = false;
var oldStories = [];
var story = "";
var progress = -1;
var intervalDuration = 20000;

var oldStory;

var interval;

var engage = {

    indexes: [
        "old", "new"
    ], // These spoken words will trigger the execution of the command
    action: function (i)
    {
        if (i == 0)
        {
            TellAStory();
        }
        else if (i == 1)
        {
            progress = 0;
            AskForInput();
        }
    }
};

document.getElementById("btn").addEventListener("click", function ()
{
    console.log("It7");
    AskForInput();
}, true);

function AskForOldOrNew()
{
    clearInterval(interval);
    artyom.say("Would you like to hear an old story or create new ones?",
    {
        onStart: function ()
        {
            console.log("Fatality");
            artyom.fatality();
        },

        onEnd: function ()
        {
            startContinuousArtyom();
            setTimeout(function ()
            {
                interval = setInterval(AskForInput, intervalDuration);
            }, 250);
        }

    });
}

function AskForInput()
{
    clearInterval(interval);


    if (progress >= 0)
    {
        var words = "And now continue the story: " + texts[progress];

        if (story != "")
        {
            words = "The story so far: " + story + " . And now continue the story: " + texts[progress];
        }

        artyom.say(words,
        {
            onStart: function ()
            {
                console.log("Fatality");
                artyom.fatality();
            },
            onEnd: function ()
            {
                startContinuousArtyom();
                setTimeout(function ()
                {
                    lookingForAnswer = true;
                    console.log("Looking");
                    interval = setInterval(AskForInput, intervalDuration);
                }, 250);
            }
        });


    }
    else
    {
        AskForOldOrNew();
    }
}
function TellAStory()
{
    GetCultData();
    artyom.say(oldStory,
    {
        onStart: function ()
        {
            console.log("Fatality");
            artyom.fatality();
        },
        onEnd: function ()
        {
            startContinuousArtyom();
            setTimeout(function ()
            {
                console.log("Looking");
                interval = setInterval(AskForInput, intervalDuration);
            }, 250);
        }
    });

    // if (oldStories.length > 0) {
    // artyom.say("No stories yet maty");
    // } else {
    // var index = Math.floor(Math.random() * oldStories.length);
    // artyom.say(oldStories[index]);
    // //after this, go back to asking for new/old
    // }
}

artyom.addCommands(engage);


function ProcessAnswer(input)
{
    clearInterval(interval);
    story += ". " + texts[progress] + input;
    HandleProgress();
    AskForInput();
}

function HandleProgress()
{
    progress++;
    if (progress > texts.length - 1)
    { // oldStories.push(story);
        SetCultData(story);
        Reset();
    }

}

function Reset()
{
    story = "";
    progress = -1;
}

artyom.redirectRecognizedTextOutput(function (recognized, isFinal)
{
    if (isFinal)
    { // If EVA is looking for an answer, process it
        console.log("Output: " + recognized);

        if (lookingForAnswer)
        {
            console.log("Looking for answer!");
            ProcessAnswer(recognized);
            lookingForAnswer = false;
        }
    }
    else
    { // console.log("# " + recognized);
    }
});

function startContinuousArtyom()
{
    artyom.fatality(); // use this to stop any of
    console.log("start artyom");

    setTimeout(function ()
    { // if you use artyom.fatality , wait 250 ms to initialize again.
        artyom.initialize(
            {
                lang: "en-GB", // A lot of languages are supported. Read the docs !
                continuous: true, // Artyom will listen forever
                listen: true, // Start recognizing
                debug: false, // Show everything in the console
                speed: 0.8 // talk normally
            }
        ).then(function ()
        {
            console.log("Ready to work !");
            var commands = artyom.getAvailableCommands();
            console.log("Number of commands: " + commands.length);
        });
    }, 250);
}
