const reOpen = document.getElementById("return");
const highscore = document.getElementById("score");
const clear = document.getElementById("erase");

var savedScores = JSON.parse(localStorage.getItem("savedScores"));

console.log(savedScores)

if (savedScores !== null) {
    for (var i = 0; i < savedScores.lengh; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = savedScores[i].name + " " + savedScores[i].score

        
        highscore.appendChild(newLi)
    }
} 

clear.addEventListener("click", () => {
    localStorage.clear();
    localStorage.reload();
});

reOpen.addEventListener("click", function reTurn () {
    window.location.replace("./index.html")
})
