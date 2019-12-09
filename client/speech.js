var texts = [
  "Once upon a time ",
  "The problem was ",
  "Thankfully ",
  "In the end "
];
var lookingForAnswer = false;
var oldStories = [];
var story = "";
var progress = 0;

var oldStory;

var engage = {
  indexes: ["old", "new"], // These spoken words will trigger the execution of the command
  action: function(i) {
    //If old
    if (i == 0) {
      TellAStory();

      //If new
    } else if (i == 1) {
      console.log("progress: " + progress);
      if (story != "") {
        artyom.say("The story so far: " + story);
      }
      artyom.say("And now continue the story. " + texts[progress], {
        onStart: function() {
          console.log("Fatality");
          artyom.fatality();
        },
        onEnd: function() {
          startContinuousArtyom();
          setTimeout(function() {
            lookingForAnswer = true;
            console.log("Looking");
          }, 250);
        }
      });
    }
  }
};

function TellAStory() {
  GetCultData();
  artyom.say(oldStory);
  // if (oldStories.length > 0) {
  //   artyom.say("No stories yet maty");
  // } else {
  //   var index = Math.floor(Math.random() * oldStories.length);
  //   artyom.say(oldStories[index]);
  //   //after this, go back to asking for new/old
  // }
}

artyom.addCommands(engage);

function startContinuousArtyom() {
  artyom.fatality(); // use this to stop any of
  console.log("start artyom");

  setTimeout(function() {
    // if you use artyom.fatality , wait 250 ms to initialize again.
    artyom
      .initialize({
        lang: "en-GB", // A lot of languages are supported. Read the docs !
        continuous: true, // Artyom will listen forever
        listen: true, // Start recognizing
        debug: false, // Show everything in the console
        speed: 0.8 // talk normally
      })
      .then(function() {
        console.log("Ready to work !");
        var commands = artyom.getAvailableCommands();
        console.log("Number of commands: " + commands.length);
      });
  }, 250);
}

document.getElementById("btn").addEventListener(
  "click",
  function() {
    artyom.say("Would you like to hear an old story or create new ones?", {
      onStart: function() {
        console.log("Fatality");
        artyom.fatality();
      },

      onEnd: function() {
        startContinuousArtyom();
      }
    });
  },
  true
);

function ProcessAnswer(input) {
  story += ". " + texts[progress] + input;
  HandleProgress();
}

function HandleProgress() {
  progress++;
  if (progress > texts.length) {
    // oldStories.push(story);
    SetCultData(story);
    Reset();
  }
}

function Reset() {
  story = "";
  progress = 0;
}

artyom.redirectRecognizedTextOutput(function(recognized, isFinal) {
  if (isFinal) {
    // If EVA is looking for an answer, process it
    console.log("Output: " + recognized);

    if (lookingForAnswer) {
      console.log("Looking for answer!");
      ProcessAnswer(recognized);
      lookingForAnswer = false;
    }
  } else {
    // console.log("# " + recognized);
  }
});
