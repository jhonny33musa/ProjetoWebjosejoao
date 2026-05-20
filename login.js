document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Proteção contra scripts: Limpamos caracteres especiais (Sanitização)
    const rawUser = document.getElementById('username').value;
    const cleanUser = rawUser.replace(/<[^>]*>?/gm, ''); // Remove tags HTML (evita XSS)
    // Simulação de credenciais seguras
    const validUser = "admin";
    const validPass = "12345";
    if (cleanUser === validUser && document.getElementById('password').value === validPass) {
        // Guardamos a sessão (sessionStorage apaga quando fechas a aba)
        sessionStorage.setItem('isLogged', 'true');
        sessionStorage.setItem('userName', cleanUser);
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});