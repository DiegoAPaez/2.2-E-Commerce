// Exercise 6
(() => {
    'use strict'
    const form = document.querySelector('.needs-validation')

    form.addEventListener('submit', (event) => {
        const pass = document.querySelector('#fPassword').value;
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,}$/;
        const passIsValid = regex.test(pass);

        if (!form.checkValidity() || !passIsValid) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
})();
