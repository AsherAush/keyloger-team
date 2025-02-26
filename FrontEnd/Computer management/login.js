let user_name = document.getElementById("user-name")
let password = document.getElementById("pass")
let login = document.getElementById("login-btn")

login.addEventListener("click", async () => {
    let response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: user_name.value,
            password: password.value
        })
    });

    let result = await response.json();

    if (response.ok) {
        window.location.href = "htmlCode.html";
    } else {
        alert("אחד מהפרטים שהזנת אינו תקין, אנא נסה שוב");
    }
});
