// Tutorial Steps Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Tutorial Steps Navigation
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    
    const nextStep1 = document.getElementById('next-step-1');
    const prevStep2 = document.getElementById('prev-step-2');
    const nextStep2 = document.getElementById('next-step-2');
    const prevStep3 = document.getElementById('prev-step-3');
    const completeTutorial = document.getElementById('complete-tutorial');

    // Function to update step indicators
    function updateStepIndicators(currentStep) {
      // Reset all indicators
      document.querySelectorAll('.step-number').forEach((el, index) => {
        el.classList.remove('active', 'completed');
        document.querySelectorAll('.step-label')[index].classList.remove('active');
      });
      
      document.querySelectorAll('.step-connector').forEach(el => {
        el.classList.remove('active');
      });
      
      // Update indicators based on current step
      for (let i = 1; i < currentStep; i++) {
        document.getElementById(`step-indicator-${i}`).classList.add('completed');
        document.getElementById(`connector-${i}`).classList.add('active');
      }
      
      document.getElementById(`step-indicator-${currentStep}`).classList.add('active');
      document.getElementById(`step-label-${currentStep}`).classList.add('active');
    }

    // Function to show a specific step
    function showStep(stepNumber) {
      // Hide all steps
      [step1, step2, step3].forEach(step => {
        step.classList.remove('active', 'prev');
      });
      
      // Show the requested step
      if (stepNumber === 1) {
        step1.classList.add('active');
      } else if (stepNumber === 2) {
        step1.classList.add('prev');
        step2.classList.add('active');
      } else if (stepNumber === 3) {
        step2.classList.add('prev');
        step3.classList.add('active');
      }
      
      // Update step indicators
      updateStepIndicators(stepNumber);
    }

    // Add event listeners if elements exist
    if (nextStep1) {
      nextStep1.addEventListener('click', () => {
        showStep(2);
      });
    }

    if (prevStep2) {
      prevStep2.addEventListener('click', () => {
        showStep(1);
      });
    }

    if (nextStep2) {
      nextStep2.addEventListener('click', () => {
        showStep(3);
      });
    }

    if (prevStep3) {
      prevStep3.addEventListener('click', () => {
        showStep(2);
      });
    }

    if (completeTutorial) {
      completeTutorial.addEventListener('click', () => {
        // Redirect to home page
        window.location.href = 'index.html';
      });
    }
  });