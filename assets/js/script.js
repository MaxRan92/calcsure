/**
 * DOM elements of interest for calculations
 */
const ageInput = document.getElementById('age');
const femaleButton = document.querySelector('.btn.gender.female');
const maleButton = document.querySelector('.btn.gender.male');
const maritalStatusDropDown = document.getElementById('marital-status');
const coverageAmount = document.getElementById("coverage");
const outputCoverageAmount = document.getElementById("coverage-value");
const dataOutput = document.querySelector('.data-output');


/** initial errors for page */
let errors = {
  age: "",
  gender: "",
  marital_status: "",
  health: "",
  premium_profile: "",
};


/*code inspired by https://www.w3schools.com/howto/howto_js_rangeslider.asp */
var sliderAmount = document.getElementById("coverage");
var outputAmount = document.getElementById("coverage-value");
outputAmount.innerHTML = sliderAmount.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderAmount.oninput = function() {
  outputAmount.innerHTML = this.value;
}

var sliderTerm = document.getElementById("term");
var outputTerm = document.getElementById("coverage-term");
outputTerm.innerHTML = sliderTerm.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderTerm.oninput = function() {
  outputTerm.innerHTML = this.value;
}

// Wait for the DOM to finish loading before running the calculation
// Add event listener to the submit button
document.addEventListener("DOMContentLoaded", function() {
  let submit = document.getElementById("submit-button");
  
  submit.addEventListener("click", calculatePremium);
   
  let buttons = document.getElementsByTagName("button");

  
  for (let button of buttons){
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "male") {
              gender = "male";
          }  else  {
              gender = "female";
          }    
      })
  }
})

function healthConditions () {
  if(document.getElementById('good-health').checked) {
    health = document.getElementById('good-health').value;
  }else if(document.getElementById('medium-health').checked) {
    health = document.getElementById('medium-health').value;
  }else if(document.getElementById('poor-health').checked) {
    health = document.getElementById('poor-health').value;
  }
}

function premiumProfile() {
  if(document.getElementById('increasing').checked) {
    premiumStyle = document.getElementById('increasing').value;
  }else if(document.getElementById('constant').checked) {
    premiumStyle = document.getElementById('constant').value;
  }else if(document.getElementById('decreasing').checked) {
    premiumStyle = document.getElementById('decreasing').value;
  }
}

function factors() {
  if (gender == "male") {
    genderFactor = 1.1;
  } else {
    genderFactor = 0.9;
  }
  let maritalStatus = document.getElementById("marital-status").value;
  if (maritalStatus == "married") {
    maritalFactor = 0.95;
  } else {
    maritalFactor = 1.05;
  }

  if (health == "good") {
    healthFactor = 0.7;
  } else if (health == "medium") {
    healthFactor = 1;
  } else {
    healthFactor = 1.3;
  }
}

function calculatePremium() {
  premiumProfile();
  healthConditions();
  let age = document.getElementById("age").value;
  let coverage = sliderAmount.value;
  let term = document.getElementById("term").value;
  let finalAge = parseFloat(age) + parseFloat(term);
  factors();
  let constant1 = 3 * genderFactor * maritalFactor * healthFactor;
  let constant2 = 3.5;

  // Weibull formula on final age
  let pSurvival = 2.718282**(-constant1*(finalAge/100)**(constant2));
  
  let expectedValueCoverage = coverage * (1-pSurvival);

  console.log(pSurvival);
  console.log(expectedValueCoverage);
}

function checkInputs(){
  /**
     *  check inputs that are required are valid  or not
     *  This is triggered by the submit button on the form
     *
     * 1. check age between 0 and 100
     * 2. check gender is selected
     * 3. check marital status selected
     * 4. check health condition selected
     * 5. check premium profile selected
     */

  // Reset errors to blank
  errors = {
    age: "",
    gender: "",
    marital_status: "",
    health: "",
    premium_profile: "",
  };
  let has_errors = false;

  // validate age
  age = ageInput.value;
  if (parseInt(age) && age !== "" && (parseInt(age) >= 0 && parseInt(age) <= 100)) {
    // all good
    errors.age = "";
  } else {
    has_errors = true;
    errors.age = "Please enter a number between 0 and 100";
  }
  
  // validate gender
  if (gender === "") {
    errors.gender = "Please select a gender";
    has_errors = true;
  } else {
    errors.gender = "";
  }

  //validate marital status
  marital_status = maritalStatusDropDown.value;
  if (marital_status !== "") {
    errors.marital_status = "";
  } else {
    errors.marital_status = "Please select a marital status";
    has_errors = true;
  }

  // validate health_status
  health = document.querySelector('input[name="health"]:checked');
  if (health) {
    health = health.value;
    errors.health = "";
  } else {
    errors.health = "Please select a health status";
    has_errors = true;
  }

  // premium profile
  premium_profile = document.querySelector('input[name="premium-profile"]:checked');
  if (premium_profile) {
    premium_profile = premium_profile.value;
    errors.premium_profile = "";
  } else {
    errors.premium_profile = "Please select a Premium Profile option";
    has_errors = true;
  }

  showResults = !has_errors;

  if (showResults) {
    // do the calculation
    calculatePremium();
    dataOutput.classList.remove('hide');
    dataOutput.scrollIntoView();
  } else {
    dataOutput.classList.add('hide');
    console.log(errors);
  }
}