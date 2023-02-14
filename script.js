
//initialize all possible characters
const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const nums = "0123456789";
const specs = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

//retrieve buttons and form
var buttons = document.getElementsByClassName("btn");
var displayForm = document.getElementById("password");

//display modal when page button is clicked
buttons[1].onclick = function () {
  document.getElementById("hidden").style.display = "block";
}

//generate password when form is submitted
buttons[0].onclick = function () {
  //prevent page refresh
  event.preventDefault();

  // put possible characters into an array
  var choices = [chars];
  //clear any error messages
  const errorMsg = document.getElementById("error-message");
  errorMsg.textContent = "";

  // initialize all form data
  const userForm = document.forms["user-form"];
  const charsLength = userForm["num"].value;
  const lCase = userForm["low"].checked;
  const uCase = userForm["up"].checked;
  const numsYN = userForm["numeric"].checked;
  const specsYN = userForm["spec"].checked;

  //verify form selections
  if (!lCase && !uCase || charsLength < 8 || charsLength > 128) {
    errorMsg.textContent = "characters must be between 8 and 128 inclusive. Check atleast 1 of lowercase or uppercase";
    return;
  }

  //add pools of characters to possible choices based on form input
  if (numsYN) {
    choices[choices.length] = nums;
  }
  if (specsYN) {
    choices[choices.length] = specs;
  }

  //initialize password
  var pwString;

  //this function is responsible oversees creation, validation, and rendering of passwords
  function drawPassword() {

    //this function generates a random password
    function generatePw() {
      //make sure password is empty
      pwString = "";

      //draw a random character from available pools for each character the user wants
      for (var i = 0; i < charsLength; i++) {

        const r = Math.floor(Math.random() * choices.length);
        const n = Math.floor(Math.random() * choices[r].length);
        pwString += choices[r][n];

      }
      return pwString;
    }

    //while loop continuously generates passwords until a password passes validation
    var z = true;
    while (z) {
      const pwString = generatePw();

      //if the user wants both upper and lower case,
      //there is a small chance they will randomly get only uppercase or only lowercase letters
      //there is also a small chance they randomly only get a single letter, 
      //therefore making it impossible to have both upper and lowercase
      //if this is the case, the loop continues and generates a new password
      if (lCase && uCase) {
        if (pwString === pwString.toUpperCase() || pwString === pwString.toLowerCase()) {
          continue;
        }
      }

      //if the user wanted numbers, check for numbers
      if (numsYN) {
        if (validate(nums)) {
          z = false;
        }
      }

      //if the user wanted specials, check for specials
      if (specsYN) {
        if (validate(specs)) {
          z = false;
        }
      }

      //if the user wanted letters only, no validation necessary at this point, exit loop
      if (!numsYN && !specsYN) {
        z = false;
      }

      //check if the password includes a character from the respective character pool
      function validate(x) {
        for (var i = 0; i < x.length; i++) {
          if (pwString.includes(x[i])) {
            return true;
          }
        }
        return false;
      }
    }
  }

  //call function
  drawPassword();

  //if the user does not want lowercase, make all letters uppercase
  if (!lCase) {
    pwString = pwString.toUpperCase();
  }

  //if the user does not want uppercase, make all letters lowercase
  if (!uCase) {
    pwString = pwString.toLowerCase();
  }

  //close modal and display password
  document.getElementById("hidden").style.display = "none";
  displayForm.value = pwString;
}
//


