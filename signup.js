document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // SIGNUP FORM
    // ============================================================

    const signupForm =
        document.getElementById("signup-form");

    if (!signupForm) {
        console.error("Signup form not found.");
        return;
    }


    // ============================================================
    // INPUTS
    // ============================================================

    const nameInput =
        document.getElementById("name-input");

    const roleInput =
        document.getElementById("role-input");

    const emailInput =
        document.getElementById("signup-email-input");

    const passwordInput =
        document.getElementById("signup-password-input");

    const submitButton =
        document.getElementById("signup-submit-btn");


    // ============================================================
    // CHECK INPUTS
    // ============================================================

    if (
        !nameInput ||
        !roleInput ||
        !emailInput ||
        !passwordInput ||
        !submitButton
    ) {

        console.error(
            "One or more signup elements were not found."
        );

        return;
    }


    // ============================================================
    // SIGNUP
    // ============================================================

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // Get values
            const username =
                nameInput.value.trim();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value;

            const role =
                roleInput.value;


            // ====================================================
            // VALIDATION
            // ====================================================

            if (!username) {

                alert("Please enter your name.");

                nameInput.focus();

                return;
            }


            if (!email) {

                alert("Please enter your email.");

                emailInput.focus();

                return;
            }


            if (!password) {

                alert("Please enter your password.");

                passwordInput.focus();

                return;
            }


            // Optional password length check
            if (password.length < 6) {

                alert(
                    "Password must be at least 6 characters."
                );

                passwordInput.focus();

                return;
            }


            // ====================================================
            // DISABLE BUTTON
            // ====================================================

            submitButton.disabled = true;

            submitButton.textContent =
                "Creating Account...";


            try {

                console.log(
                    "Sending signup request..."
                );


                // =================================================
                // SEND TO FASTAPI
                // =================================================

                const response = await fetch(
                    "/api/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            username: username,

                            email: email,

                            password: password

                            // Role is currently NOT sent
                            // because your FastAPI User model
                            // doesn't have a role field.

                        })
                    }
                );


                // =================================================
                // READ RESPONSE
                // =================================================

                const data =
                    await response.json();


                console.log(
                    "Signup status:",
                    response.status
                );

                console.log(
                    "Signup response:",
                    data
                );


                // =================================================
                // DUPLICATE EMAIL
                // =================================================

                if (response.status === 400) {

                    alert(
                        data.detail ||
                        "This email is already registered."
                    );

                    emailInput.focus();

                    return;
                }


                // =================================================
                // VALIDATION ERROR
                // =================================================

                if (response.status === 422) {

                    console.error(
                        "FastAPI validation error:",
                        data
                    );

                    alert(
                        "Please check your signup information."
                    );

                    return;
                }


                // =================================================
                // OTHER SERVER ERROR
                // =================================================

                if (!response.ok) {

                    console.error(
                        "Signup failed:",
                        data
                    );

                    alert(
                        data.detail ||
                        data.message ||
                        "Signup failed. Please try again."
                    );

                    return;
                }


                // =================================================
                // SUCCESS
                // =================================================

                console.log(
                    "Account created successfully!"
                );


                alert(
                    "Account created successfully!"
                );


                // Reset form
                signupForm.reset();


                // Close modal
                const modal =
                    document.getElementById("auth-modal");

                if (modal) {
                    modal.classList.remove("open");
                }

            }

            // ====================================================
            // NETWORK ERROR
            // ====================================================

            catch (error) {

                console.error(
                    "Signup request error:",
                    error
                );

                alert(
                    "Could not connect to the FastAPI server.\n\n" +
                    "Make sure your backend is running on " +
                    ""/api/register""
                );

            }

            // ====================================================
            // ENABLE BUTTON AGAIN
            // ====================================================

            finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Create Account";
            }

        }
    );


    console.log(
        "signup.js loaded successfully."
    );

});