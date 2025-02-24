let computers = [];
let computerToDeleteIndex = -1;

// הצגת רשימת מחשבים
function showComputersList(event) {
    event.stopPropagation();
    let listDiv = document.getElementById("computerListContainer");
    let formDiv = document.getElementById("addComputerForm");

    if (formDiv.style.display === "block") {
        formDiv.style.display = "none";
    }

    if (listDiv.style.display === "block") {
        listDiv.style.display = "none";
    } else {
        updateComputerList();
        listDiv.style.display = "block";
    }
}

// הצגת טופס הוספת מחשב
function addComputer(event) {
    event.stopPropagation();
    let formDiv = document.getElementById("addComputerForm");
    let listDiv = document.getElementById("computerListContainer");

    if (listDiv.style.display === "block") {
        listDiv.style.display = "none";
    }

    formDiv.style.display = formDiv.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function(event) {
    let listDiv = document.getElementById("computerListContainer");
    let formDiv = document.getElementById("addComputerForm");

    if (!listDiv.contains(event.target) && !formDiv.contains(event.target)) {
        listDiv.style.display = "none";
        formDiv.style.display = "none";
    }
});

function saveComputer() {
    let input = document.getElementById("computerName");
    let newComputer = input.value.trim();

    if (newComputer) {
        computers.push(newComputer);
        input.value = "";
        document.getElementById("addComputerForm").style.display = "none";
        updateComputerList();
    } else {
        alert("אנא הכנס שם מחשב תקין!");
    }
}

function prepareDeleteComputer(index) {
    if (computers.length > 0) {
        computerToDeleteIndex = index;
        document.getElementById("confirmationPopup").style.display = "block";
    }
}

function confirmDelete() {
    computers.splice(computerToDeleteIndex, 1);
    updateComputerList();
    closePopup();
}

function cancelDelete() {
    closePopup();
}

function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

function updateComputerList() {
    let list = document.getElementById("computers");
    list.innerHTML = "";

    computers.forEach((computer, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<div>${computer}</div>
                        <br>
                        <div>
                            <button class="connect-btn" onclick="alert('מתחבר ל-${computer}')">התחבר</button>
                            <button class="delete-btn" onclick="prepareDeleteComputer(${index})">מחק</button>
                            </div>`;

        list.appendChild(li);
    });
}