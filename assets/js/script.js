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


/**
 * Factors for calculation
 */
let factors = {
  genderFactor: 0,
  maritalFactor: 0,
  healthFactor: 0,
}

/** initial errors for page */
let errors = {
  age: "",
  gender: "",
  marital_status: "",
  health: "",
  premium_profile: "",
};

/**
 * Variables based on user input
 */

let age = "";
let gender = "";
let marital_status = "";
let health = "";
let premium_profile = "";
let term = "";

/**
 * Variables for premium Schedule
 */
let expectedValueCoverage = "";
let premium = "";
let d = "";
let currentYear = "";
let premiumDate = "";
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
  })
});


function setFactors() {
  if (gender == "male") {
    factors.genderFactor = 1.1;
  } else {
    factors.genderFactor = 0.9;
  }
  if (marital_status == "married") {
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
}

function calculatePremium() {
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
  
  while (premiumTableBody.hasChildNodes()) {  
    premiumTableBody.removeChild(premiumTableBody.firstChild);
  }

  for (let i = 0; i < parseFloat(term); i++) {
    premium = expectedValueCoverage / term;
    premiumDate = new Date(currentYear, 11, 31);
    premiumSchedule.push({'date': premiumDate, 'premium': premium})
    currentYear = parseFloat(currentYear) + 1;

    row = premiumTableBody.insertRow();
    cell1 = row.insertCell(0)
    cell2 = row.insertCell(1)

    cell1.innerHTML = premiumDate;
    cell2.innerHTML = premium;
  }
  console.log(premiumSchedule);
}





function buildScheduleHTML(payments) {

  let premiumSchedule = document.getElementById('premium-schedule');

  // empty out exsiting element incase they already did a calculation
  premiumSchedule.firstChild.remove();

  // loop through payments and make the table body 
  /// need to either update innerHTML with the new stuff
  payments.forEach((payment, index) => {
    premiumSchedule.append(`<tr> <td> ${payment.year} </td><td>${payment.payment}</td></tr>`);

  })
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
    premiumPlan();
    dataOutput.classList.remove('hide');
    dataOutput.scrollIntoView();
  } else {
    dataOutput.classList.add('hide');
    console.log(errors);
  }
}