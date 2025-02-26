let computers = ["אשר זאב אויש", "שלמה זלמן וינד", "אריה שובר"];
let computerToDeleteIndex = -1;

// הצגת רשימת מחשבים
function showComputersList(event) {
    event.preventDefault();
    const computerListContainer = document.getElementById('computerListContainer');
    // Assuming you want to toggle the visibility of the computer list
    if (computerListContainer.style.display === 'none' || computerListContainer.style.display === '') {
        computerListContainer.style.display = 'block';
    } else {
        computerListContainer.style.display = 'none';
    }
}

// Close the computer list when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const allowedReferer = 'login.html'; // Replace with your allowed referer URL
    const referer = document.referrer;

    console.log('Referer:', referer); // Log the referer to the console

    if (!referer || !referer.includes(allowedReferer)) {
        window.location.href = 'login.html'; // Redirect to the allowed page
    }
});
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

function showOptionsPopup(computer, index) {
    const optionsPopup = document.createElement('div');
    optionsPopup.className = 'options-popup';
    optionsPopup.innerHTML = `
        <div>בחר פעולה עבור ${computer}</div>
        <button class="connect-btn" onclick="alert('מתחבר ל-${computer}'); closeOptionsPopup(this)">התחבר</button>
        <button class="delete-btn" onclick="prepareDeleteComputer(${index}); closeOptionsPopup(this)">מחק</button>
        <button class="close-btn" onclick="closeOptionsPopup(this)">סגור</button>
    `;
    document.body.appendChild(optionsPopup);

    // Center the popup on the screen
    optionsPopup.style.position = 'fixed';
    optionsPopup.style.top = '50%';
    optionsPopup.style.left = '50%';
    optionsPopup.style.transform = 'translate(-50%, -50%)';
}

function closeOptionsPopup(button) {
    const optionsPopup = button.parentElement;
    document.body.removeChild(optionsPopup);
}

function updateComputerList() {
    let list = document.getElementById("computers");
    list.innerHTML = "";

    computers.forEach((computer, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<button class="computer-btn" onclick="showOptionsPopup('${computer}', ${index})">${computer}</button>`;
        list.appendChild(li);
    });
}

// Call updateComputerList to display the default computers on page load
updateComputerList();