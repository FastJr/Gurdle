window.onload = function() {
    setTimeout(function() {makeElementAppear("direction_text-1")}, 500);
    setTimeout(function() {fill_page_with_starting_buttons()}, 1250);
    if(document.getElementById("direction_text-2") != null){
        setTimeout(function() {makeElementAppear("direction_text-2")}, 6000);
    }
};

function fill_page_with_starting_buttons(){
    var container = document.getElementById('word-length-buttons');

    for (let i = 0; i < 7; i++) {
        (function(i) {
            setTimeout(function() {
                let button = document.createElement("button");
                button.className = "btn letter-length-btns text-center btn-secondary p-5 m-2 animate__animated animate__tada";
                button.id = "length-button-" + (i + 3);
                button.onclick = function() { selectWordLength(i + 3); };
                let number = document.createElement("h1");
                number.textContent = i + 3;
                button.appendChild(number);
                if(i == 2){
                    let easter_egg = document.createElement("div");
                    easter_egg.textContent = "^Classic";
                    button.appendChild(easter_egg);
                }
                container.appendChild(button);
            }, i * 600); // Delay each button creation
        })(i);
    }
}

function create_keyboard(data){
    var word = data.word;
    var row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    var row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    var row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<-'];
    var rows = [row1, row2, row3];
    var container = document.getElementById('word-container');
    var keyboard_container = document.createElement('div');
    keyboard_container.className = "container";
    keyboard_container.id = "keyboard";

    for (let i = 0; i < rows.length; i++) {
        var row = document.createElement("div");
        row.className = "row";
        keyboard_container.appendChild(row);
        for (let j = 0; j < rows[i].length; j++) {
            var letter_button = document.createElement("button");
            letter_button.className = "btn keyboard-btns col btn-secondary m-1";
            letter_button.textContent = rows[i][j];
            letter_button.id = rows[i][j];
            if(rows[i][j] != 'ENTER' && rows[i][j] != '<-') {
                letter_button.onclick = function() { enterLetter(rows[i][j], word.length); };
            }
            else if(rows[i][j] == 'ENTER' ){
                letter_button.onclick = function() { checkWord(data); };
            }
            else if(rows[i][j] == '<-' ){
                letter_button.onclick = function() { removeLetter(word); };
            }
            row.appendChild(letter_button);
        }
    }
    window.addEventListener('keydown', function(event) {
        const isLetter = (event.key >= 'a' && event.key <= 'z');
        console.log(event.key);
        if(isLetter){
            enterLetter(event.key.toUpperCase(), word.length);
        }
        else if(event.key == "Backspace"){
            removeLetter(word);
        }
        else if(event.key == "Enter"){
            checkWord(data);
        }
    });
    container.appendChild(keyboard_container);
}

function selectWordLength(length) {
    fetch(`/get_random_word_at_length/${length}/`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("current_word", data.word)
            // Clear existing word container
            document.getElementById('word-container').innerHTML = '';
            // Display empty letter slots for the word
            for (let j = 0; j < length + 1; j++) {
                if(j > 6){
                    break;
                }
                const row = document.createElement('div');
                row.className = "row attempt-row justify-content-center"
                document.getElementById('word-container').appendChild(row);
                for (let i = 0; i < length; i++) {
                    const input = document.createElement('div');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.className = "letter pt-3"
                    input.id = `letter-${j}-${i}`;
                    row.appendChild(input);
                }
            }
            create_keyboard(data);
            localStorage.setItem("current-letter_slot-id", "letter-0-0");
            localStorage.setItem("current-entered-word", "");
        });
}

function enterLetter(letter, word_length){
    const currentLetterSlotId = localStorage.getItem("current-letter_slot-id");
    const currentEnteredWord = localStorage.getItem("current-entered-word");
    let letter_slot = currentLetterSlotId.substring(9);
    let int_letter_slot = parseInt(letter_slot);
    if(int_letter_slot < word_length){
        document.getElementById(currentLetterSlotId).textContent = letter;
        localStorage.setItem("current-entered-word", currentEnteredWord + letter);
        //Logic for pointer
        if(int_letter_slot < word_length){
            int_letter_slot += 1;
            localStorage.setItem("current-letter_slot-id", currentLetterSlotId.substring(0, 9) + int_letter_slot);
        }
    }
    console.log(localStorage.getItem("current-letter_slot-id"));
}

function removeLetter(word) {
    const currentLetterSlotId = localStorage.getItem("current-letter_slot-id");
    const currentEnteredWord = localStorage.getItem("current-entered-word");
    console.log("Trying to remove at id:" + currentLetterSlotId);
    console.log(currentLetterSlotId);
    let letter_slot = currentLetterSlotId.substring(9);
    let int_letter_slot = parseInt(letter_slot);
    if(int_letter_slot > -1){
        //Logic for pointer
        if(int_letter_slot != 0){
            int_letter_slot -= 1;
            localStorage.setItem("current-letter_slot-id", currentLetterSlotId.substring(0, 9) + int_letter_slot);
        }
        document.getElementById(localStorage.getItem("current-letter_slot-id")).textContent = "";
        localStorage.setItem("current-entered-word", currentEnteredWord.substring(0, currentEnteredWord.length-1));
    }
}

function checkWord(data) {
    //NOTE: Alter word checker to delete characters from target word each time its letter is entered for the duration of the for loop
    var word = data.word;
    const currentLetterSlotId = localStorage.getItem("current-letter_slot-id");
    const currentEnteredWord = localStorage.getItem("current-entered-word");
    currentEnteredWordLow = currentEnteredWord.toLowerCase();
    var lettersLogged = [];
    let rowNum = currentLetterSlotId.substring(7,8);
    console.log(currentEnteredWordLow + " VS " + word);
    if(isRealWord(currentEnteredWordLow, data.decoded_words)){
        if(currentEnteredWordLow.length == word.length){
            for (let i = 0; i < word.length; i++) {
                (function(i) {
                setTimeout(function() {
                    let letterDiv = document.getElementById("letter-" + rowNum + "-" + i);
                    letterDiv.classList.add('animate__animated', 'animate__flipInX');
                    if(currentEnteredWordLow.charAt(i) == word.charAt(i)){
                        lettersLogged.push(currentEnteredWordLow.charAt(i));
                        letterDiv.style.backgroundColor = "#19a811";
                        document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor = "#19a811";
                        for (let j = 0; j < word.substring(0, i).length; j++) {
                            if(currentEnteredWordLow.charAt(i) == currentEnteredWordLow.charAt(j) && document.getElementById("letter-" + rowNum + "-" + j).style.backgroundColor != "rgb(25, 168, 17)"){
                                document.getElementById("letter-" + rowNum + "-" + j).style.backgroundColor = "gray";
                            }
                        }
                    }
                    else if(!lettersLogged.includes(currentEnteredWordLow.charAt(i)) && word.includes(currentEnteredWordLow.charAt(i).toString())){
                        lettersLogged.push(currentEnteredWordLow.charAt(i));
                        console.log(lettersLogged);
                        letterDiv.style.backgroundColor = "#c7c11c";
                        if(document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor != "#19a811")
                            document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor = "#c7c11c";
                    }
                    else{
                        letterDiv.style.backgroundColor = "gray";
                        if(document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor != "rgb(199, 193, 28)" && document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor != "rgb(25, 168, 17)"){
                            console.log(document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor);
                            document.getElementById(currentEnteredWordLow.charAt(i).toUpperCase()).style.backgroundColor = "#42464a";
                        }
                    }
                        }, i * 200);
                })(i);
            }
            lettersLogged = [];
            let rowNumInt = parseInt(rowNum);
            rowNumInt += 1;
            localStorage.setItem("current-letter_slot-id", "letter-" + rowNumInt + "-" + 0)
            localStorage.setItem("current-entered-word", "");

            if(currentEnteredWordLow == word){
                setTimeout(function() {
                    alert("Correct!");
                    window.location.href = ''; // If homepage URL is '/'
                }, 300 * word.length);
            }
            else if(rowNumInt > word.length || rowNumInt > 6){
                setTimeout(function() {
                    alert("You Lose! The word was: " + word);
                    window.location.href = ''; // If homepage URL is '/'
                }, 300 * word.length);
            }
        }
    }
    else{
        alert("Not a real word");
    }
}

function isRealWord(word, word_list){
    for (let i = 0; i < word_list.length; i++) {
        if(word == word_list[i]){
            return true;
        }
    }
    return false;
}

function makeElementAppear(elementId){
    document.getElementById(elementId).style.display = "";
}