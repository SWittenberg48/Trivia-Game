var score = 0;
var currentQuestion = 0;
var gameClock = 60;

var questions = [
  {
    title: "Who was nicknamed 'The Fridge'?",
    answers: [
      "Walter Payton",
      "William Perry",
      "Brian Urlacher",
      "Khalil Mack"
    ],
    correctAnswer: 1
  },
  {
    title: "When did the Bears last win a Super Bowl title?",
    answers: ["2005", "1998", "1985", "2016"],
    correctAnswer: 2
  },

  {
    title: "Which QB owns the most Franchise passing records?",
    answers: ["Jay Cutler", "Erik Kramer", "Jim McMahon", "Tom Brady"],
    correctAnswer: 0
  },

  {
    title: "What is the name of the Bears Mascot?",
    answers: ["Wally", "Benny", "Fred", "Staley"],
    correctAnswer: 3
  }
];

$(document).ready(function() {
  $("#start").on("click", run, function() {
    event.preventDefault();
    $("#start").hide();
    $(".quiz").show();
    showQuestion();
  });
  function showQuestion() {
    var question = questions[currentQuestion];
    $(".quiz h2").text(question.title);
    $(".quiz ul").html("");
    for (var i = 0; i < question.answers.length; i++) {
      $(".quiz ul").append(
        "<li id='" + i + "' >" + question.answers[i] + "</li>"
        // "<li id='" input type= "radio" + i + "' >" + question.answers[i] + "</li>"
      );
    }
  }
  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
  function decrement() {
    gameClock--;
    $("#timer").html("<h3>" + gameClock + "</h3>");
    if (gameClock === 0) {
      stop();
      alert("Wah Wah Game Over!");
    }
  }
  console.log("countdown", run);

  //   function shotClock() {
  //     var timer = setInterval("#timer", 60000);
  //     timer.html(gameClock - 1000);

  //     function countDown() {
  //       counter--;
  //       timer.html(gameClock - counter);
  //       if (counter == gameClock) {
  //         alert("Final Horn: Game Over");
  //         clearInterval(clear);
  //         counter = 0;
  //         console.log("whaat", countDown);
  //       }
  //     }
  //     setInterval(countDown, 1000);
  //   }

  $(".quiz ul").on("click", "li", function() {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
  });
  $(".quiz a").click(function(event) {
    event.preventDefault();
    if ($("li.selected").length) {
      var guess = parseInt($("li.selected").attr("id"));
      console.log(guess);
      checkAnswer(guess);
    }
  });
  //   setTimeout(timer, 60000);

  $(".summary restartQuiz").click(function(event) {
    event.preventDefault();
    restartQuiz();
  });

  function checkAnswer(guess) {
    var question = questions[currentQuestion];
    if (question.correctAnswer === guess) {
      score++;
      alert("Bear Down You got it Right");
    } else {
      alert("FLAG: Unsuccessful Answering!");
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showSummary();
    } else {
      showQuestion();
    }
  }
  function showSummary() {
    $(".quiz").hide();
    $(".summary").text(
      "Congrats, you scored a TD " + score + " out of 4 times!!!"
    );
  }
  function restartQuiz() {
    $(".summary").hide();
    $(".quiz").show();
    score = 0;
    currentQuestion = 0;
    showQuestion();
  }
});
