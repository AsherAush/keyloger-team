let user_name = document.getElementById("user-name")
let password = document.getElementById("pass")
let login = document.getElementById("login-btn")

login.addEventListener("click",async () => {
    let users = await fetch("http://127.0.0.1:5000/login")
    users = await users.json()
    if(user_name.value === users.name && password.value === users.password)
    {
        window.location.href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
    }
    else(alert("אחד מהפרטים שהזנת אינו תקין, אנא נסה שוב"))

})
