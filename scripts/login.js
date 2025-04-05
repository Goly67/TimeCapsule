document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const loginForm = document.getElementById("login-form")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const loginError = document.getElementById("login-error")
  const loginBtn = document.getElementById("login-btn")

  // Login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Reset error message
    loginError.style.display = "none"

    // Get form values
    const email = emailInput.value.trim()
    const password = passwordInput.value

    // Validate form
    if (!email || !password) {
      showError("Please enter both email and password")
      return
    }

    // Show loading state
    setLoading(true)

    try {
      // Send login request to server
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to dashboard on success
        window.location.href = "index.html"
      } else {
        // Show error message
        showError(data.error || "Invalid email or password")
      }
    } catch (error) {
      showError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  })

  // Helper functions
  function showError(message) {
    loginError.textContent = message
    loginError.style.display = "block"
  }

  function setLoading(isLoading) {
    const textSpan = loginBtn.querySelector(".btn-text")
    const spinner = loginBtn.querySelector(".loading-spinner")

    loginBtn.disabled = isLoading

    if (isLoading) {
      textSpan.style.display = "none"
      spinner.style.display = "inline-block"
    } else {
      textSpan.style.display = "inline-block"
      spinner.style.display = "none"
    }
  }
})

