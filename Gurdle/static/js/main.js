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

function create_keyboard(){
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
            row.appendChild(letter_button);
        }
    }

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
                    input.className = "letter"
                    input.id = `letter-${j}-${i}`;
                    row.appendChild(input);
                }
            }
            create_keyboard();
        });
}

function makeElementAppear(elementId){
    document.getElementById(elementId).style.display = "";
}