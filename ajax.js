const btn = document.querySelector(".get-spells");
btn.addEventListener("click", getSpells);
const number = document.getElementById("number");

function getSpells(e) {
    e.preventDefault();
    if (number.value.length == 0) {
        return alert("Please enter a number");
    } else {
        const https = new XMLHttpRequest();

        https.open("GET", "https://hp-api.onrender.com/api/spells", true);

        https.onload = function () {
            if (this.status === 200) {
                // console.log(this.responseText);

                const response = shuffle(JSON.parse(this.responseText));
                let output = "";
                // response.forEach(function(spell){
                //     output += `
                //         <li>Spell: ${spell.name}</li>
                //         <li>Description: ${spell.description}</li>
                //         <hr>
                //     `;
                // })
                for (let i = 0; i < response.length; i++) {
                    if (i== number.value) {break;}
                    output += `
                        <li>Spell: ${response[i].name}</li>
                        <li>Description: ${response[i].description}</li>
                        <hr>
                `;
                }

                document.querySelector(".spells").innerHTML = output;
            }
        };
        https.send();
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
