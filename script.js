function checkPassword() {
  const password = document.getElementById("admin-password").value;
  if (password === "mangaQadmin") {
    document.getElementById("admin-panel").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
    document.getElementById("error-msg").textContent = "كلمة المرور خاطئة!";
  }
}
