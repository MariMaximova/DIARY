document.addEventListener('DOMContentLoaded', function() {
    const comeInButton = document.getElementById('submit');
    const textWelcome = document.getElementById('welcome');

    comeInButton.addEventListener('click', async () => {
        const nameInput = document.getElementById('name').value;
        const passwordInput = document.getElementById('password').value;

        if (passwordInput && nameInput) {
            textWelcome.innerHTML = "WELCOME";

            try {
                const response = await axios.post('http://localhost:5000/submit-data', {
                    userName: nameInput,
                    userPassword: passwordInput
                });

                const data = response.data;
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            if (!passwordInput || !nameInput) {
                textWelcome.innerHTML = "IT'S EMPTY";
            } else if (passwordInput.length < 4 || nameInput.length < 4) {
                textWelcome.innerHTML = "TOO SHORT";
            } else if (passwordInput.length > 8 || nameInput.length > 8) {
                textWelcome.innerHTML = "TOO LONG";
            }
        }
    });
});
    





