// TRIVIA
// =============================

var panel = $("#quiz-area");
var countStartNumber = 30;

//Question Set
var questions = [{
    question: "Which of these albums did Phish release first?",
    answers: ["Rift", "Junta", "Hoist", "Fast Enough For You"],
    correctAnswer: "Junta",
    image: "assets/images/PhishJunta88.jpg"
},  {
    question: "Which of these foods is found on Fishman's mumu?",
    answers: ["Circle", "Dot", "Kootie-shot", "Donut"],
    correctAnswer: "Donut",
    image: "https://media.giphy.com/media/SHgX30N0E60a4/giphy.gif"
},  {
    question: "What was Jimmy's cat's name?",
    answers: ["Peaches", "Isabella", "Esther", "Poster-Nutbag"],
    correctAnswer: "Poster-Nutbag",
    image: "http://tomorrowsverse.com/upload/stories/32433.jpg"
},  {
    question: "Which of these animals did Jimmy want?",
    answers: ["Sloth", "Goldfish", "Dog", "Lizards"],
    correctAnswer: "Dog",
    image: "https://media3.giphy.com/media/ygCJ5Bul73NArGOSFN/200w.webp?cid=3640f6095c6e34d44c33763955403c23"
}]

// variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

    countdown: function() {
      this.counter--;
      $("#count-number").text(this.counter);
      if(this.counter === 0) {
          console.log("TIME UP");
          this.timeUp();
      }
    },

    loadQuestion: function() {

        timer = setInterval(this.countdown.bind(this), 1000);

        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
            panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        this.counter = window.countStartNumber;
        $("#counter-number").text(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function() {

        clearInterval(window.timer);

        $("#counter-number").text(this.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src ='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results, 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },

    results: function() {

        clearInterval(window.timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").text(this.counter);
        
        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");

    },
    
    clicked: function(e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {
        this.incorrect++;

        clearInterval(window.timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length -1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    answeredCorrectly: function() {
        clearInterval(window.timer);

        this.correct++;

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length -1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
    game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function(){
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion.bind(game)();
});


// // This code will run as soon as the page loads
// window.onload = function() {
//     $("#stop").on("click", stopwatch.stop);
//     $("#reset").on("click", stopwatch.reset);
//     $("#start").on("click", stopwatch.start);
//   };

// var stopwatch = {

//     time: 0,
  
//     reset: function() {
  
//       stopwatch.time = 0;
  
//       // DONE: Change the "display" div to "00:00."
//       $("#display").text("00:00");
  
//     },
//     start: function() {
  
//       // DONE: Use setInterval to start the count here and set the clock to running.
//       if (!clockRunning) {
//         intervalId = setInterval(stopwatch.count, 1000);
//         clockRunning = true;
//       }
//     },
//     stop: function() {
  
//       // DONE: Use clearInterval to stop the count here and set the clock to not be running.
//       clearInterval(intervalId);
//       clockRunning = false;
//     },
//     count: function() {

//         // DONE: increment time by 1, remember we cant use "this" here.
//         stopwatch.time++;
    
//         // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
//         //       and save the result in a variable.
//         var converted = stopwatch.timeConverter(stopwatch.time);
//         console.log(converted);
    
//         // DONE: Use the variable we just created to show the converted time in the "display" div.
//         $("#display").text(converted);
//       },
//       timeConverter: function(t) {
    
//         var minutes = Math.floor(t / 60);
//         var seconds = t - (minutes * 60);
    
//         if (seconds < 10) {
//           seconds = "0" + seconds;
//         }
    
//         if (minutes === 0) {
//           minutes = "00";
//         }
//         else if (minutes < 10) {
//           minutes = "0" + minutes;
//         }
    
//         return minutes + ":" + seconds;
//       }
// };
// $(document).ready(function() {

//     // When random-button is clicked...
//     $("#random-button").on("click", function() {

//       // ...create a string which will hold the lottery number.
//       var lottoNumber = "";

//       // Then create a loop that generates 9 separate numbers.
//       for (var i = 0; i < 9; i++) {
//         var random = Math.floor(Math.random() * 9) + 1;

//         // Add to the lottery number.
//         lottoNumber = random + lottoNumber;
//       }

//       // Then prepend the lotto number to the top of our random-number div.
//       $("#random-number").prepend("<br><hr>" + lottoNumber);
//     });
//   });
