<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Signup Form</title>
  <style>
    /* High-contrast, clean styling for Lighthouse Accessibility */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #f3f4f6;
      color: #111827;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    main {
      background: #ffffff;
      width: 100%;
      max-width: 440px;
      padding: 32px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 1.75rem;
      margin-bottom: 8px;
      color: #111827;
    }

    .subtitle {
      color: #4b5563;
      margin-bottom: 24px;
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: #1f2937;
    }

    .required-star {
      color: #b91c1c; /* High contrast red */
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      font-size: 1rem;
      border: 2px solid #6b7280;
      border-radius: 6px;
      background-color: #ffffff;
      color: #111827;
    }

    /* Strong visible focus indicator for Keyboard Navigation (Tab key) */
    input:focus,
    button:focus {
      outline: 3px solid #2563eb;
      outline-offset: 2px;
      border-color: #1d4ed8;
    }

    /* Error state styling */
    input[aria-invalid="true"] {
      border-color: #b91c1c;
      background-color: #fef2f2;
    }

    .hint-text {
      display: block;
      font-size: 0.85rem;
      color: #4b5563;
      margin-top: 4px;
    }

    .error-msg {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #b91c1c;
      margin-top: 6px;
      min-height: 20px;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-top: 2px;
      accent-color: #1d4ed8;
      cursor: pointer;
    }

    .checkbox-group label {
      font-weight: 400;
      cursor: pointer;
    }

    button {
      width: 100%;
      padding: 14px;
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      background-color: #1d4ed8; /* Meets WCAG AA/AAA contrast ratio */
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #1e40af;
    }

    .success-banner {
      display: none;
      margin-top: 20px;
      padding: 14px;
      background-color: #ecfdf5;
      border: 2px solid #047857;
      color: #065f46;
      border-radius: 6px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <main>
    <h1>Create an Account</h1>
    <p class="subtitle">Fields marked with <span class="required-star" aria-hidden="true">*</span> are required.</p>

    <!-- novalidate disables default browser tooltips so custom accessible errors run -->
    <form id="signupForm" novalidate>
      
      <!-- Full Name -->
      <div class="form-group">
        <label for="fullName">Full Name <span class="required-star" aria-hidden="true">*</span></label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          autocomplete="name"
          required 
          aria-required="true"
          aria-describedby="nameError"
        >
        <span id="nameError" class="error-msg" aria-live="polite"></span>
      </div>

      <!-- Email Address -->
      <div class="form-group">
        <label for="email">Email Address <span class="required-star" aria-hidden="true">*</span></label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          autocomplete="email"
          required 
          aria-required="true"
          aria-describedby="emailError"
        >
        <span id="emailError" class="error-msg" aria-live="polite"></span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password <span class="required-star" aria-hidden="true">*</span></label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          autocomplete="new-password"
          required 
          aria-required="true"
          aria-describedby="passwordHint passwordError"
        >
        <span id="passwordHint" class="hint-text">Must be at least 8 characters long and include 1 number.</span>
        <span id="passwordError" class="error-msg" aria-live="polite"></span>
      </div>

      <!-- Terms Checkbox -->
      <div class="form-group">
        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="terms" 
            name="terms" 
            required 
            aria-required="true"
            aria-describedby="termsError"
          >
          <label for="terms">I agree to the Terms of Service and Privacy Policy <span class="required-star" aria-hidden="true">*</span></label>
        </div>
        <span id="termsError" class="error-msg" aria-live="polite"></span>
      </div>

      <button type="submit">Sign Up</button>

      <!-- Live region announces form submission to screen readers -->
      <div id="successBanner" class="success-banner" role="status" aria-live="polite"></div>
    </form>
  </main>

  <script>
    const form = document.getElementById("signupForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");
    const successBanner = document.getElementById("successBanner");

    function showError(input, errorId, message) {
      const errorElement = document.getElementById(errorId);
      input.setAttribute("aria-invalid", "true");
      errorElement.textContent = message;
    }

    function clearError(input, errorId) {
      const errorElement = document.getElementById(errorId);
      input.removeAttribute("aria-invalid");
      errorElement.textContent = "";
    }

    function validateName() {
      if (fullName.value.trim().length < 2) {
        showError(fullName, "nameError", "Please enter your full name (at least 2 characters).");
        return false;
      }
      clearError(fullName, "nameError");
      return true;
    }

    function validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError", "Please enter a valid email address (e.g., user@example.com).");
        return false;
      }
      clearError(email, "emailError");
      return true;
    }

    function validatePassword() {
      const val = password.value;
      if (val.length < 8 || !/\d/.test(val)) {
        showError(password, "passwordError", "Password must be at least 8 characters and contain at least 1 number.");
        return false;
      }
      clearError(password, "passwordError");
      return true;
    }

    function validateTerms() {
      if (!terms.checked) {
        showError(terms, "termsError", "You must agree to the terms before signing up.");
        return false;
      }
      clearError(terms, "termsError");
      return true;
    }

    // Real-time validation on blur (when user tabs out of a field)
    fullName.addEventListener("blur", validateName);
    email.addEventListener("blur", validateEmail);
    password.addEventListener("blur", validatePassword);
    terms.addEventListener("change", validateTerms);

    // Form submit handler
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      successBanner.style.display = "none";

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isTermsValid = validateTerms();

      if (isNameValid && isEmailValid && isPasswordValid && isTermsValid) {
        successBanner.textContent = "Account created successfully! Welcome aboard.";
        successBanner.style.display = "block";
        form.reset();
      } else {
        // Keyboard accessibility: move focus directly to the first invalid field
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  </script>

</body>
</html>
