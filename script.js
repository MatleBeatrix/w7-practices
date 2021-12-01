/*
function functionName(parameter){
    parameter === "Argument as a string";
};

functionName("Argument as a string");


const argument = "Argument saved in a variable";
const functionName = function (parameter){
    parameter === "Argument saved in a variable";
};

functionName(argument);

//////Arrow function
const functionName = (parameter1,parameter1) => {
    parameter1 === 1;
    parameter2 === 2;
};

functionName(1,2);


Különbség a cost és nem cost fgv-ek között: 
    - const-hoz nem férünk hozzá mielőtt leírtuk
*/

/*
const inputElement = `
    <input type="text">

    </input>
`;
*/
const inputElement = (type, name, title) => {
    return `
        <div>
            <label>${title}</label>
            <input type="${type}" name="${name}">
        </div>
    `;
}

const selectElement = (type, name, title, options) => {
    let optionsToSelect = "";
    for (const o of options) {
        optionsToSelect += `
            <option>
                ${o}
            </option>
        `;
    }

    //Itt: ${type} == select
    return `
        <div>
            <label>${title}</label>
            <${type} name="${name}">
                ${optionsToSelect}
            </${type}>
        </div>
    `;
}



/*
const formElement = "<form> + inputElement{"text", "firstName"} + inputElement{"file", "profilPicture"} + inputElement{"email", "personalEmail"} + inputElement{"radio", "newsLetter"} + inputElement{"checkbox", "terms"} + "</form>"; 
*/
const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("file", "profilPicture", "Profilképed")}
        ${inputElement("email", "personalEmail", "Email címed")}
        ${inputElement("checkbox", "newsLetter", "Hírlevelet szeretnél kapni")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        ${selectElement("select", "where", "Hol hallottál rólunk?", ["interneten", "ismerőstől", "egyéb"])}
        <button>Ok</button>
    </form>
`;



/*
Cél: ne rakja bele az adatokat az URL-be és ne töltödjön újra az oldal
*/

const formSubmit = (event) => {
    event.preventDefault();
    const et = event.target;
    console.log(et);
    et.classList.add('submitted');
    let selectValue = et.querySelector(`select[name="where"]`).value;   //backtick Fontos!!!
    console.log(selectValue);
}

//const document = "hello";

//Feltétel: ha aktuális input mező neve firstName akkor fusson le!
//Segítség: gettAttribute
const inputUpdate = (event) => {
    /*
    if (event.target.getAttribute("name") === "firstName"){
        document.getElementById('inputValue').innerHTML = event.target.value;   
    }
    console.log(event.target.closest("#form"));          //parentNode nem jó! closest megy felfele
*/
}

function loadEvent() {
    console.log(`Az oldal betöltödött.`);
    const root = document.getElementById("root");
    root.insertAdjacentHTML("afterbegin", formElement);
    root.insertAdjacentHTML("afterbegin", `
        <div id="inputValue"></div>
    `);


    const form = document.getElementById("form");

    //Nincs formSubmit után () , hogy csak akkor fusson le, ha tényleg megtörténik
    //Formban lévő gombok mint submitok!!!!!!!!!!
    form.addEventListener("submit",formSubmit);


    //Adatok kinyerése a formból
    const inputList = form.querySelectorAll("input", inputUpdate);

    /*
    Tömböt kapunk
    */
    //focus: ha belekattintunk
    //blur: ha kikattintunk
    //change: ha az érték változik
    //input: LEGJOBB mert biztos hogy minden esetben meghívódik
    for (const input of inputList) {
        input.addEventListener('input', inputUpdate);
    }
    
}

window.addEventListener("load", loadEvent);