/**
 * Imediately Invoked Function (IIF) gets called as soon as it is declared.
 * Sets event listeners for the form
 */
(function () {
    document.getElementById('form-submit').addEventListener('click', formSubmit);
})();

/**
 * Driver for the form submission. Calls functions to check the validity of input fields. 
 * If all fields are valid, sends the message to the appropriate areas.
 */
function formSubmit() {
    let inputObjects = document.querySelectorAll('.form-check');

    let message = "";
    let validFlag = true;
    let email = "";

    //checks all form inputs
    for (x of inputObjects) {
        x.addEventListener('input', inputChange);

        if (validInput(x)) {
            x.classList.remove('form-error');
            message += "*" + x.title + ":* " + x.value + "\n";
            if (x.title == "email") email = x.value;
        } else {
            validFlag = false;
            x.classList.add('form-error');
        }
    }

    if (!validCheckGroup(document.querySelectorAll('.required-check'))) validFlag = false;

    if (validFlag) sendForm(message);
}
/**
 * Checks if the trimmed input value is valid or not. Valid input is not empty, and if the input 
 * is an email it must contain "@" and "." characters (to ensure it's an email entered).
 * @param {Node} x input field node
 * @returns {boolean} true if all of the input fields are valid, false if one or more input fields are invalid.
 */
function validInput(x) {
    if (x.value.trim() === "") return false
    if (x.title === "Email") {
        if (x.value.indexOf("@") === -1 || x.value.indexOf(".") === -1) return false;
    }
    return true;
}

/**
 * Sends the form data to a slack webhook. The message will be posted in website-activity. 
 * @param {string} message the slack formatted message containing all input from the form
 */
function sendForm(message) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            //posting message was successful
            displayStatusMessage('success');
            clearForm();
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            //posting message was unsuccessful
            //TODO: catch errors from Slack and from our API - set up email
            displayStatusMessage('error');
            clearForm();
        }
    }

    xhttp.open("POST", '/api/contact');
    xhttp.send(JSON.stringify(message));
}

/**
 * Checks whether the form input needs to be displayed as invalid or not. 
 * @param {event} event the event object passed when an event fires
 */
function inputChange(event) {

    if (event.target.value !== "") {
        event.target.classList.remove('form-error');
    } else {
        event.target.classList.add('form-error');
    }

}
/**
 * Clears the form of any entered information.
 */
function clearForm() {

    removeForm();

    let inputs = document.querySelectorAll('.form-check');

    for (x of inputs) {
        x.value = "";
    }

}
/**
 * Displays either a status or error message to the user. Inserted before div with ID "form-submit"
 * @param {string} message flag to identify if success or error message should be displayed. "success" for success, anything else for failure.
 */
function displayStatusMessage(message) {

    let button = document.getElementById('form-submit');
    let parent = button.parentNode.parentNode.parentNode;

    if (message === "success") {
        alertMessage = "Message successfully sent!";
        css = "success-message";
    } else {
        alertMessage = "There was an issue sending your message. \nA notification has been sent to Badgerloop.";
        css = "failure-message";
    }

    let newNode = document.createElement("div");
    newNode.setAttribute('class', 'alert ' + css);
    newNode.innerHTML = "<div class='status-content'>" + alertMessage + "</div><div class='status-close' onclick='closeStatusMessage(this)'><img src='/images/x.svg'></img></div>";
    parent.parentNode.insertBefore(newNode, parent);

}
/**
 * Removes status message from the DOM. When the x button is clicked it should be removed from the DOM.
 * @param {DOM Node} obj UI status message x button that was clicked
 */
function closeStatusMessage(obj) {
    obj.parentNode.parentNode.removeChild(obj.parentNode);
}
