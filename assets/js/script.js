/*jshint esversion: 7 */
/**
 * DOM elements of interest for calculations
 */
const ageInput = document.getElementById('age');
const femaleButton = document.querySelector('.btn.gender.female');
const maleButton = document.querySelector('.btn.gender.male');
const maritalStatusDropDown = document.getElementById('marital-status');
const coverageAmount = document.getElementById("coverage");
const outputCoverageAmount = document.getElementById("coverage-value");
const termAmount = document.getElementById("term");
const outputTermAmount = document.getElementById("coverage-term");
const dataOutput = document.querySelector('.data-output');
const submitButton = document.getElementById("submit-button");
const premiumTable = document.getElementById('premium-table');
const premiumTableBody = document.getElementById('table-body');
const collButton = document.getElementById("collapser");
const profileSpan = document.getElementById("result-profile");
const errorsAge = document.getElementById("errors-age");
const errorsGender = document.getElementById("errors-gender");
const errorsMaritalStatus = document.getElementById("errors-marital-status");
const errorsHealth = document.getElementById("errors-health");
const errorsPremiumProfile = document.getElementById("errors-premium-profile");


/**
 * Factors for calculation
 */
let factors = {
  genderFactor: 0,
  maritalFactor: 0,
  healthFactor: 0,
  expectedValueCoverage: 0,
  premium: 0,
  totalPremium: 0,
  d: 0,
  currentYear: 0,
  premiumDate: 0,
  premiumFactor: 0,
  averagePremium: 0,
}

/** initial errors for page */
let errors = {
  age: "",
  gender: "",
  maritalStatus: "",
  health: "",
  premiumProfile: "",
};

/**
 * Variables based on user input
 */

let age = "";
let gender = "";
let maritalStatus = "";
let health = "";
let premiumProfile = "";
let term = "";

/**
 * Premium Schedule Object
*/
let premiumSchedule = [];




/**
 * Range slider updates
 * code inspired by https://www.w3schools.com/howto/howto_js_rangeslider.asp 
 */

outputCoverageAmount.innerHTML = coverageAmount.value; //display the default slider value
// Update the current slider value (each time you drag the slider handle)
coverageAmount.oninput = function() {
  outputCoverageAmount.innerHTML = this.value;
}

outputTermAmount.innerHTML = termAmount.value; //display the default slider value
// Update the current slider value (each time you drag the slider handle)
termAmount.oninput = function() {
  outputTermAmount.innerHTML = this.value;
}


// Wait for the DOM to finish loading before running the calculation
// Add event listener to the gender and submit button
document.addEventListener("DOMContentLoaded", function() {
  
  //female button
  femaleButton.addEventListener('click', function(e) {
    e.preventDefault();
    gender = "female";
    femaleButton.classList.add("selected");
    if (maleButton.classList.contains('selected')) {
      maleButton.classList.remove("selected");
    }
  });


  //male button
  maleButton.addEventListener('click', function(e) {
    e.preventDefault();
    gender = "male";
    maleButton.classList.add("selected");
    if (femaleButton.classList.contains("selected")) {
      femaleButton.classList.remove("selected");
    }
  });

  //submit button
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    checkInputs();
  });

  // collapse button
  collButton.addEventListener('click', function() {
    if (premiumTable.classList.contains('hide')) {
      premiumTable.classList.remove('hide');
    } else {
      premiumTable.classList.add('hide');
    }
  });
  
});


function setFactors() {
  if (gender == "male") {
    factors.genderFactor = 1.1;
  } else {
    factors.genderFactor = 0.9;
  }
  if (maritalStatus == "married") {
    factors.maritalFactor = 0.95;
  } else {
    factors.maritalFactor = 1.05;
  }
  if (health == "good") {
    factors.healthFactor = 0.7;
  } else if (health == "medium") {
    factors.healthFactor = 1;
  } else {
    factors.healthFactor = 1.3;
  }
  if (premiumProfile == "constant") {
    premiumFactor = 0;
  } else if (premiumProfile == "increasing") {
    premiumFactor = -0.5;
  } else {
    premiumFactor = 0.5;
  }
}

function calculateExpectedValue() {
  const coverage = coverageAmount.value;
  term = termAmount.value;
  const finalAge = parseFloat(age) + parseFloat(term);
  setFactors();
  const constant1 = 3 * factors.genderFactor * factors.maritalFactor * factors.healthFactor;
  const constant2 = 3.5;
  
  // Weibull formula on final age
  const pSurvival = 2.718282 ** (-constant1 * (finalAge / 100) ** (constant2));
  expectedValueCoverage = coverage * (1-pSurvival);
}

function premiumPlan() {
  d = new Date();
  currentYear = d.getFullYear();
  premiumDate = new Date(currentYear, 11, 31);
  totalPremium = 0;
  
  while (premiumTableBody.hasChildNodes()) {  
    premiumTableBody.removeChild(premiumTableBody.firstChild);
  }

  for (let i = 0; i < parseFloat(term); i++) {
    premium = expectedValueCoverage / term * (1 + premiumFactor);
    premiumDate = new Date(currentYear, 11, 31);
    premiumSchedule.push({'date': premiumDate, 'premium': premium})
    currentYear = parseFloat(currentYear) + 1;

    row = premiumTableBody.insertRow();
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = premiumDate.toLocaleDateString();
    cell2.innerHTML = premium.toLocaleString("en-US", {style:"currency", currency:"USD"});

    if (premiumProfile == "constant") {
      // do nothing
    } else if (premiumProfile == "increasing") {
      premiumFactor = premiumFactor + 1 / (term - 1); 
    } else {
      premiumFactor = premiumFactor - 1 / (term - 1);
    }
    
    totalPremium = totalPremium + premium;
  }

  row = premiumTableBody.insertRow();
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.innerHTML = "<strong>Total</strong>";
  cell2.innerHTML = "<strong>" + totalPremium.toLocaleString("en-US", {style:"currency", currency:"USD"}) + "</strong>";
  
  averagePremium = totalPremium / term;

}

function planDescription() {
  profileSpan.innerHTML = "Your premium life insurance plan consists in <strong>" + term + " " + premiumProfile + " payments </strong> for a total of <strong>" 
  + totalPremium.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits: 0}) + "</strong> and an average premium of <strong>" 
  + averagePremium.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits: 0}) + "</strong>.";
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
    maritalStatus: "",
    health: "",
    premiumProfile: "",
  };
  let has_errors = false;

  // validate age
  age = ageInput.value;
  if (parseInt(age) && age !== "" && (parseInt(age) >= 18 && parseInt(age) <= 60)) {
    // all good
    errors.age = "";
  } else {
    has_errors = true;
    errors.age = "Please enter a number between 18 and 60";
  }
  errorsAge.innerHTML = errors.age;
  
  // validate gender
  if (gender === "") {
    errors.gender = "Please select a gender";
    has_errors = true;
  } else {
    errors.gender = "";
  }
  errorsGender.innerHTML = errors.gender;

  //validate marital status
  maritalStatus = maritalStatusDropDown.value;
  if (maritalStatus !== "") {
    errors.maritalStatus = "";
  } else {
    errors.maritalStatus = "Please select a marital status";
    has_errors = true;
  }
  errorsMaritalStatus.innerHTML = errors.maritalStatus;

  // validate health_status
  health = document.querySelector('input[name="health"]:checked');
  if (health) {
    health = health.value;
    errors.health = "";
  } else {
    errors.health = "Please select a health status";
    has_errors = true;
  }
  errorsHealth.innerHTML = errors.health;

  // premium profile
  premiumProfile = document.querySelector('input[name="premium-profile"]:checked');
  if (premiumProfile) {
    premiumProfile = premiumProfile.value;
    errors.premiumProfile = "";
  } else {
    errors.premiumProfile = "Please select a Premium Profile option";
    has_errors = true;
  }
  errorsPremiumProfile.innerHTML = errors.premiumProfile;

  showResults = !has_errors;

  if (showResults) {
    // do the calculation
    calculateExpectedValue();
    premiumPlan();
    planDescription();
    dataOutput.classList.remove('hide');
    dataOutput.scrollIntoView();
  } else {
    dataOutput.classList.add('hide');
  }
}