let computerToDeleteIndex = -1;
let computers = [];

async function fetchComputers() {
    try {
        let response = await fetch("http://127.0.0.1:5000/api/computerList", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        let data = await response.json();
        computers = data.computers;
        updateComputerList(computers);
    } catch (error) {
        console.error("Error fetching computers:", error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const allowedReferer = 'login.html';
    if (!document.referrer.includes(allowedReferer)) {
        window.location.href = 'login.html';
    }
    fetchComputers(); // טוען את רשימת המחשבים בעת טעינת העמוד
});

async function showComputersList(event) {
    event.preventDefault();
    const computerListContainer = document.getElementById('computerListContainer');
    if (computerListContainer.style.display === 'none' || computerListContainer.style.display === '') {
        computerListContainer.style.display = 'block';
        await fetchComputers();
    } else {
        computerListContainer.style.display = 'none';
    }
}

function prepareDeleteComputer(index) {
    if (computers.length > 0) {
        computerToDeleteIndex = index;
        document.getElementById("confirmationPopup").style.display = "block";
    }
}

async function confirmDelete() {
    if (computerToDeleteIndex < 0 || computerToDeleteIndex >= computers.length) return;
    let computerToDelete = computers[computerToDeleteIndex];

    try {
        await fetch("http://127.0.0.1:5000/api/computerList", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ computer: computerToDelete })
        });

        computers.splice(computerToDeleteIndex, 1);
        updateComputerList(computers);
        closePopup();
    } catch (error) {
        console.error("Error deleting computer:", error);
    }
}

function cancelDelete() {
    closePopup();
}

function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

function showOptionsPopup(computer, index) {
    const optionsPopup = document.createElement('div');
    optionsPopup.className = 'options-popup';
    optionsPopup.innerHTML = `
        <div>בחר פעולה עבור ${computer}</div>
        <button class="connect-btn" onclick="connectToComputer('${computer}')">התחבר</button>
        <button class="delete-btn" onclick="prepareDeleteComputer(${index}); closeOptionsPopup(this)">מחק</button>
        <button class="close-btn" onclick="closeOptionsPopup(this)">סגור</button>
    `;
    document.body.appendChild(optionsPopup);
    optionsPopup.style.position = 'fixed';
    optionsPopup.style.top = '50%';
    optionsPopup.style.left = '50%';
    optionsPopup.style.transform = 'translate(-50%, -50%)';
}

function connectToComputer(computer) {
    alert(`מתחבר ל-${computer}`);
    window.location.href = 'keylogger.html';
}

function closeOptionsPopup(button) {
    const optionsPopup = button.parentElement;
    document.body.removeChild(optionsPopup);
}

function updateComputerList(computers) {
    let list = document.getElementById("computers");
    list.innerHTML = "";
    computers.forEach((computer, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<button class="computer-btn" onclick="showOptionsPopup('${computer}', ${index})">${computer}</button>`;
        list.appendChild(li);
    });
}
