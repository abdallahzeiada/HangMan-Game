//Create The Letters Container
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
  let letterElement = `<span class="letter-box">${letter}</span>`;
  lettersContainer.innerHTML += letterElement;
});
async function fetchData() {
  const dataFile = "js/data.json";
  let data = await fetch(dataFile);
  try {
    data = await data.json();
  } catch {
    console.log("Error");
  }
  //Generate Random Data
  let randomCategory = Math.floor(Math.random() * Object.keys(data).length);
  let randomCategoryValue = Object.keys(data)[randomCategory];
  let category = document.querySelector(".category span");
  category.innerHTML = `${randomCategoryValue}`;
  let randomCategoryValueAraay = data[randomCategoryValue];
  let chosenWordIndex = Math.floor(
    Math.random() * randomCategoryValueAraay.length
  );
  let chosenWordValue = randomCategoryValueAraay[chosenWordIndex].toLowerCase()
  console.log(chosenWordValue)
  // Create Spans of Letters Guess Container
  let mistakes = document.querySelector(".mistakes span");
  let win = "";
  let lettersGuessContainer = document.querySelector(".letters-guess");
  chosenWordValue.split("").forEach((ele, index) => {
    let span = `<span class="guess-${index}"><span/>`;
    lettersGuessContainer.innerHTML += span;
    if (ele === " ") {
      document.querySelector(`.guess-${index}`).classList.add("space");
    }
  });
  let mistakesAttemp = 0;
  let theDraw = document.querySelector(".the-draw");
  lettersContainer.addEventListener("click", (e) => {
    let status = false;
    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");
      let clickedLetter = e.target.innerHTML.toLowerCase();
      chosenWordValue.split("").forEach((letter, index) => {
        if (clickedLetter === letter) {
          status = true;
          document.querySelector(`.guess-${index}`).innerHTML = `${letter}`;
        }
      });
      if (status !== true) {
        mistakesAttemp++;
        theDraw.classList.add(`wrong-${mistakesAttemp}`);
        mistakes.innerHTML = mistakesAttemp;
        document.getElementById("fail").play();
        if (mistakesAttemp === 8) {
          endGame(chosenWordValue);
          document.getElementById("finalfail").play();
        }
      } else {
        document.getElementById("success").play();
        let spans = document.querySelectorAll(".letters-guess span");
        spans.forEach((ele) => {
          win += ele.textContent;
        });
        let res = "";
        let slice = -spans.length;
        if (chosenWordValue.includes(" ")) {
          slice = -spans.length + 2;
        }
        res = win.slice(slice);
        if (res === chosenWordValue.replace(" ", "")) {
          document.getElementById("finalsucsess").play();
          winner();
        }
      }
    }
  });
  function endGame(word) {
    lettersContainer.classList.add("finished");
    let end = `<div class="game-over">game over the word is "${word}" <br> <button class="btn" onclick="location.reload()">try again</button></div>`;
    document.querySelector(".container").innerHTML += end;
  }
  function winner() {
    lettersContainer.classList.add("finished");
    let winner = `<div class="winner">Congratulation, Your mistaker are (${mistakesAttemp})<br> <button class="btn" onclick="location.reload()">play again</button></div>`;
    document.querySelector(".container").innerHTML += winner;
  }
}
fetchData();
/*

*/
