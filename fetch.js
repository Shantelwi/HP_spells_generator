const btn = document.querySelector(".get-spells");
btn.addEventListener("click", getSpells);
const number = document.getElementById("number");
const url = "https://hp-api.onrender.com/api/spells";

function getSpells(e){
    e.preventDefault();
    if (number.value.length == 0) {
        return alert("Please enter a number");
    } else {
        fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(data) {
            // console.log(JSON.stringify(data));
            data = shuffle(data);

            let output = "";

            for (let i = 0; i < data.length; i++) {
                if (i== number.value) {break;}
                output += `
                    <li>Spell: ${data[i].name}</li>
                    <li>Description: ${data[i].description}</li>
                    <hr>
                `;
            }
            document.querySelector(".spells").innerHTML = output;
        })
    }
}

//FUNCTION TO SHUFFLE SPELLS
function shuffle(spells) {
    let CI = spells.length, tempValue, randomIndex;

    // WHILE ELEMETS EXIST IN THE ARRAY
    while (CI > 0) {
        randomIndex = Math.floor(Math.random() * CI);
        // DECREASE THE CURRENT INDEX BY 1
        CI--;
        // SWAP THE LAST ELEMENTS WITH CI
        tempValue = spells[CI];
        spells[CI] = spells[randomIndex];
        spells[randomIndex] = tempValue;
    }
    return spells;
}
