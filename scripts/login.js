document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            await loginUser(email, password);
        });
    }
});

async function loginUser(email, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        setCookie('token', data.access_token, 7);
        window.location.href = 'index.html';
    } else {
        const errorData = await response.json();
        alert('Login failed: ' + (errorData.msg || response.statusText));
    }
}
