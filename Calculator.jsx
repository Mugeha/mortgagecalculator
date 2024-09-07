import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import validate from 'validate.js';

const Calculator = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [rate, setRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [total, setTotal] = useState(null);
  const [mortgageType, setMortgageType] = useState('Replacement'); // New state to track mortgage type
  // const [errors, setErrors] = useState({});

  // Validation constraints for form fields
  /*
  const constraints = {
    amount: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: { greaterThan: 0, message: "must be a positive number" }
    },
    term: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: { greaterThan: 0, message: "must be a valid number of years" }
    },
    rate: {
      presence: { allowEmpty: false, message: "is required" },
      numericality: { greaterThan: 0, message: "must be a positive interest rate" }
    },
    mortgageType: {
      presence: { message: "must be selected" }
    }
  };

*/
  const calculateRepayments = () => {

     // Form values to validate
     // const formValues = {
      //amount,
    //  term,
      // rate,
      // mortgageType
    // };

    // Perform validation
    // const validationErrors = validate(formValues, constraints);

    const P = parseFloat(amount); // Loan Amount
    const annualInterestRate = parseFloat(rate) / 100; // Convert to decimal
    const r = annualInterestRate / 12; // Monthly interest rate
    const n = parseFloat(term) * 12; // Total number of payments (term in months)

     // Formula to calculate monthly repayments
      // Clear errors if valid
      // Proceed with mortgage calculation
      if(mortgageType === 'Replacement'){
        const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        if (!isNaN(M)) {
          setMonthlyPayment(M.toFixed(2)); // Set the monthly payment, rounded to 2 decimal places
          setTotal((M * n).toFixed(2))
        } else {
          setMonthlyPayment('Invalid input'); // Handle invalid inputs
          setTotal('Invalid input')
        }
       } else if (mortgageType === 'Interest Only') {
             // Interest Only Mortgage Formula (monthly payment is interest only)
             const interestOnlyPayment = P * r;
             if (!isNaN(interestOnlyPayment) && interestOnlyPayment > 0) {
               setMonthlyPayment(interestOnlyPayment.toFixed(2)); // Set the interest-only payment
               setTotal((interestOnlyPayment * n).toFixed(2))
             } else {
               setMonthlyPayment('Invalid input');
               setTotal('Invalid input')
             }
           }
     
     
     }
   
    
    // Function to clear all fields and the result
    const clearAll = () => {
      setAmount('');
      setTerm('');
      setRate('');
      setMonthlyPayment(null);
      setTotal(null);
      // setErrors({});
      setMortgageType('');
    };
  
  return (
    
    <div className="mainDiv">
    <div className="App">
      <div className="Div1">
      <h3>Mortgage Calculator</h3>
      <p onClick={clearAll}>Clear All</p>
      </div>
      <div className="div1">
      <label htmlFor="amount">Mortgage Amount</label>
      <br></br>
   <div className="input-container">
   <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
   id="input-field" required  autofocus />
   <span className="input-addon">€</span>
    
   </div>
     
      </div>
     
      <div className="divider">
        <div>
        <label htmlFor="mortgage-term" >Mortgage Term</label>
        <div className="input-container">
        <input type="number" value={term} onChange={(e) => setTerm(e.target.value)}  id="input-field2" required/>
        <span className="input-addon2">years</span>
        
        </div>
       
        </div>
      <div>
      <label htmlFor="interest-rate" >Interest Rate</label>
      <div className="input-container">
      <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} id="input-field3"required/>
      <span className="input-addon3">%</span>
      
      </div>
    
      </div>
   
      </div>
      
      <div className="labels">
        <p>Mortgage Type</p>
        <label className="custom-radio-label">
          <input type="radio" name="mortgage-type" value="Replacement"
          checked={mortgageType === 'Replacement'}
          onChange={(e) => setMortgageType(e.target.value)} 
          className="custom-radio-input"/><span className="custom-radio"></span> Repayment
        </label>
        <label className="custom-radio-label">
          <input type="radio" name="mortgage-type" value="Interest Only"
          checked={mortgageType === 'Interest Only'}
          onChange={(e) => setMortgageType(e.target.value)}
          className="custom-radio-input"/>  <span className="custom-radio"></span> Interest Only
        </label>
        
        </div>
      
      <button onClick={calculateRepayments}>
        <FontAwesomeIcon icon={faCalculator} /> Calculate Repayments
      </button>
  
    </div>

   {monthlyPayment !== null ? (
      
         <div className="Div4">
    <h3>Your results</h3>
    <p>Your results are shown below based on the information your provided. To adjust the result, edit the form and click "Calculate Repayments" again.</p>
    <div className="Div5">
 Your monthly repayments
 <div>{monthlyPayment}</div>
 <hr />
 Total you'll repay over the Term<br/>
 <div className="total">{total}</div>
    </div>

     </div>
      
 
    ) : (
<div className="Div3" id="results">
      <FontAwesomeIcon icon={faSquarePollHorizontal} size="6x" className="custom-icon"/>
      <h3>Results are shown here</h3>
      <p>Complete the form and press Calculate repayments to see what your monthly repayments are.</p>

    </div>
    )}
  </div>
  );
  
};

export default Calculator;
