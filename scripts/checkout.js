// Exercise 6
const validate = () => {
    let error = 0;
    // Get the input fields
    const fieldName = document.getElementById("fName");
    const fieldEmail = document.getElementById("fEmail");

    // Get the error elements
    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");

    // Validate fields entered by the user: name, phone, password, and email
    if (fieldName.value == "") {
        error++;
    }

    if (fieldEmail.value == "") {
        error++;
    }

    if (error > 0) {
        alert("Error");
    } else {
        alert("OK");
    }
};
