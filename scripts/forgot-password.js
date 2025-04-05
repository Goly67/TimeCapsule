document.addEventListener("DOMContentLoaded", () => {
  // API base URL - change this to your actual API server
  const API_BASE_URL = "https://timecap.glitch.me";

  // Get DOM elements
  const emailStep = document.getElementById("email-step")
  const verificationStep = document.getElementById("verification-step")
  const resetStep = document.getElementById("reset-step")

  const emailForm = document.getElementById("email-form")
  const verificationForm = document.getElementById("verification-form")
  const resetForm = document.getElementById("reset-form")

  const emailInput = document.getElementById("email")
  const verificationInputs = document.querySelectorAll(".verification-input")
  const newPasswordInput = document.getElementById("new-password")
  const confirmPasswordInput = document.getElementById("confirm-password")

  const emailError = document.getElementById("email-error")
  const emailSuccess = document.getElementById("email-success")
  const verificationError = document.getElementById("verification-error")
  const verificationSuccess = document.getElementById("verification-success")
  const resetError = document.getElementById("reset-error")
  const resetSuccess = document.getElementById("reset-success")

  const sendCodeBtn = document.getElementById("send-code-btn")
  const verifyCodeBtn = document.getElementById("verify-code-btn")
  const resetPasswordBtn = document.getElementById("reset-password-btn")

  const backToLoginBtn = document.getElementById("back-to-login-btn")
  const backToEmailBtn = document.getElementById("back-to-email-btn")
  const backToVerificationBtn = document.getElementById("back-to-verification-btn")

  // Store email and verification code
  let userEmail = ""
  let verificationCode = ""

  // Disable verify code button by default
  if (verifyCodeBtn) {
    verifyCodeBtn.disabled = true;
  }

  // Handle verification code inputs
  verificationInputs.forEach((input, index) => {
    // Handle input
    input.addEventListener("input", (e) => {
      const value = e.target.value

      // Only allow digits
      if (!/^\d*$/.test(value)) {
        input.value = ""
        return
      }

      // Take only the last character if multiple are pasted
      if (value.length > 0) {
        input.value = value[value.length - 1]
      }

      // Move to next input if a digit was entered
      if (value && index < verificationInputs.length - 1) {
        verificationInputs[index + 1].focus()
      }

      // Check if all inputs are filled
      checkVerificationComplete()
    })

    // Handle keyboard navigation
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        // Move to previous input on backspace if current input is empty
        verificationInputs[index - 1].focus()
      } else if (e.key === "ArrowRight" && index < verificationInputs.length - 1) {
        // Move to next input on right arrow
        verificationInputs[index + 1].focus()
      } else if (e.key === "ArrowLeft" && index > 0) {
        // Move to previous input on left arrow
        verificationInputs[index - 1].focus()
      }
    })
  })

  // Handle paste event for verification code
  verificationInputs[0].addEventListener("paste", (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is all digits
    if (/^\d+$/.test(pastedData)) {
      // Fill in the inputs with the pasted digits
      const digits = pastedData.slice(0, verificationInputs.length).split("")
      digits.forEach((digit, i) => {
        if (i < verificationInputs.length) {
          verificationInputs[i].value = digit
        }
      })

      // Focus the next empty input or the last one
      const nextEmptyIndex = Math.min(digits.length, verificationInputs.length - 1)
      verificationInputs[nextEmptyIndex].focus()

      // Check if all inputs are filled
      checkVerificationComplete()
    }
  })

  // Check if all verification inputs are filled
  function checkVerificationComplete() {
    let isComplete = true
    let code = ""

    verificationInputs.forEach((input) => {
      if (!input.value) {
        isComplete = false
      }
      code += input.value
    })

    verificationCode = code
    if (verifyCodeBtn) {
      verifyCodeBtn.disabled = !isComplete
    }
  }

  // Email form submission
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Reset messages
    emailError.style.display = "none"
    emailSuccess.style.display = "none"

    // Get email
    userEmail = emailInput.value.trim()

    // Validate email
    if (!userEmail) {
      showError(emailError, "Please enter your email address")
      return
    }

    // Show loading state
    setLoading(sendCodeBtn, true)

    try {
      // Send request to server
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      })

      const data = await response.json()

      if (data.success) {
        // Show success message
        showSuccess(emailSuccess, "Verification code sent to your email")

        // Move to verification step after a short delay
        setTimeout(() => {
          emailStep.style.display = "none"
          verificationStep.style.display = "block"
          verificationInputs[0].focus()
        }, 1500)
      } else {
        showError(emailError, data.error || "Failed to send verification code")
      }
    } catch (error) {
      console.error("Error:", error)
      showError(emailError, "An error occurred. Please try again.")
    } finally {
      setLoading(sendCodeBtn, false)
    }
  })

  // Verification form submission
  verificationForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Reset messages
    verificationError.style.display = "none"
    verificationSuccess.style.display = "none"

    // Validate code
    if (verificationCode.length !== verificationInputs.length) {
      showError(verificationError, "Please enter the complete verification code")
      return
    }

    // Show loading state
    setLoading(verifyCodeBtn, true)

    try {
      // Send request to server
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          code: verificationCode,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Show success message
        showSuccess(verificationSuccess, "Code verified successfully")

        // Move to reset password step after a short delay
        setTimeout(() => {
          verificationStep.style.display = "none"
          resetStep.style.display = "block"
          newPasswordInput.focus()
        }, 1500)
      } else {
        showError(verificationError, data.error || "Invalid verification code")
      }
    } catch (error) {
      console.error("Error:", error)
      showError(verificationError, "An error occurred. Please try again.")
    } finally {
      setLoading(verifyCodeBtn, false)
    }
  })

  // Reset password form submission
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Reset messages
    resetError.style.display = "none"
    resetSuccess.style.display = "none"

    // Get passwords
    const newPassword = newPasswordInput.value
    const confirmPassword = confirmPasswordInput.value

    // Validate passwords
    if (newPassword.length < 8) {
      showError(resetError, "Password must be at least 8 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      showError(resetError, "Passwords do not match")
      return
    }

    // Show loading state
    setLoading(resetPasswordBtn, true)

    try {
      // Send request to server
      const response = await fetch(`${API_BASE_URL}/api/auth/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          code: verificationCode,
          newPassword: newPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Show success message
        showSuccess(resetSuccess, "Password reset successfully. You can now sign in with your new password.")

        // Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = "login.html"
        }, 3000)
      } else {
        showError(resetError, data.error || "Failed to reset password")
      }
    } catch (error) {
      console.error("Error:", error)
      showError(resetError, "An error occurred. Please try again.")
    } finally {
      setLoading(resetPasswordBtn, false)
    }
  })

  // Navigation buttons
  backToLoginBtn.addEventListener("click", () => {
    window.location.href = "login.html"
  })

  backToEmailBtn.addEventListener("click", () => {
    verificationStep.style.display = "none"
    emailStep.style.display = "block"
  })

  backToVerificationBtn.addEventListener("click", () => {
    resetStep.style.display = "none"
    verificationStep.style.display = "block"
  })

  // Helper functions
  function showError(element, message) {
    element.textContent = message
    element.style.display = "block"
  }

  function showSuccess(element, message) {
    element.textContent = message
    element.style.display = "block"
  }

  function setLoading(button, isLoading) {
    const textSpan = button.querySelector(".btn-text")
    const spinner = button.querySelector(".loading-spinner")

    button.disabled = isLoading

    if (isLoading) {
      textSpan.style.display = "none"
      spinner.style.display = "inline-block"
    } else {
      textSpan.style.display = "inline-block"
      spinner.style.display = "none"
    }
  }
})