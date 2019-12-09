///         ///
// RAW data ///
///         ///

// const artyom = new Artyom();
var password = "banana";
var progress = 0;
var engagedInConversation = false;
var lookingForAnswer = false;

var proclamations = [
  ["We are so alone!"],
  ["All hail ", ", our glorious leader!"],
  ["We are all ", ". All hail our glorious leader ", " !"]
];
var questions = [
  "What is your name, oh great leader?",
  "What are we subjects called?",
  "What is our purpose?"
];

var responses = [
  ["All hail ", ", our glorious leader!"],
  ["We are all ", " !"],
  ["We ", " !"]
];

var answer = "";

var commandPassword = {
  indexes: ["old", "new"], // These spoken words will trigger the execution of the command
  action: function(i) {
    console.log("password action");
    // Action to be executed when a index match with spoken word
    if (!engagedInConversation) {
      InitiateConversation();
    }
  }
};

artyom.addCommands(commandPassword); // Add the command with addCommands method. Now

function InitiateConversation() {
  engagedInConversation = true;
  console.log("initiate conversation");

  //Structure
  // - Proclamation
  artyom.say(proclamations[progress][0], {
    onStart: function() {
      artyom.dontObey();
    },
    onEnd: function() {
      artyom.obey();
    }
  });
  // - Question
  artyom.say(questions[progress], {
    onStart: function() {
      artyom.dontObey();
    },
    onEnd: function() {
      artyom.obey();
      lookingForAnswer = true;
    }
  });

  // - Response
  // - Exit
}

function startContinuousArtyom() {
  artyom.fatality(); // use this to stop any of
  console.log("start artyom");

  setTimeout(function() {
    // if you use artyom.fatality , wait 250 ms to initialize again.
    artyom
      .initialize({
        lang: "en-GB,en-GB", // A lot of languages are supported. Read the docs !
        continuous: true, // Artyom will listen forever
        listen: true, // Start recognizing
        debug: false, // Show everything in the console
        speed: 0.8 // talk normally
      })
      .then(function() {
        console.log("Ready to work !");
      });
  }, 250);
}

document.getElementById("btn").addEventListener(
  "click",
  function() {
    artyom.say("Hello World !");
    startContinuousArtyom();
  },
  true
);

function ProcessAnswer(input) {
  artyom.say(responses[progress][0] + input + responses[progress][1]);
  console.log("Answer processed: " + input);
  // Last thing that happens
  // Progress should increment, and conversation should terminate
}

artyom.redirectRecognizedTextOutput(function(recognized, isFinal) {
  if (isFinal) {
    var arr = recognized.split(" ", -1);

    //sort out empty empty spaces in array
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "") {
        arr.splice(i, 1);
        i--;
      }
    }

    console.log("First: " + arr[0] + " all:" + recognized);

    // If EVA is looking for an answer, process it
    if (lookingForAnswer) {
      console.log("Looking for answer!");
      ProcessAnswer(arr[0]);
      lookingForAnswer = false;
    }
  } else {
    // console.log(recognized);
  }
});
