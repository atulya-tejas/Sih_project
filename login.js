document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // LOGIN FORM
    // ============================================================

    const loginForm =
        document.getElementById("login-form");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }


    // ============================================================
    // INPUTS
    // ============================================================

    const emailInput =
        document.getElementById("login-email-input");

    const passwordInput =
        document.getElementById("login-password-input");

    const submitButton =
        document.getElementById("login-submit-btn");


    // ============================================================
    // CHECK INPUTS
    // ============================================================

    if (
        !emailInput ||
        !passwordInput ||
        !submitButton
    ) {

        console.error(
            "One or more login elements were not found."
        );

        return;
    }


    // ============================================================
    // LOGIN
    // ============================================================

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // Get values
            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value;


            // ====================================================
            // VALIDATION
            // ====================================================

            if (!email) {

                alert(
                    "Please enter your email."
                );

                emailInput.focus();

                return;
            }


            if (!password) {

                alert(
                    "Please enter your password."
                );

                passwordInput.focus();

                return;
            }


            // ====================================================
            // DISABLE BUTTON
            // ====================================================

            submitButton.disabled = true;

            submitButton.textContent =
                "Logging in...";


            try {

                console.log(
                    "Sending login request..."
                );


                // =================================================
                // SEND REQUEST TO FASTAPI
                // =================================================

                const response = await fetch(
                    "/api/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );


                // =================================================
                // READ RESPONSE
                // =================================================

                const data =
                    await response.json();


                console.log(
                    "Login status:",
                    response.status
                );

                console.log(
                    "Login response:",
                    data
                );


                // =================================================
                // INVALID EMAIL / PASSWORD
                // =================================================

                if (response.status === 401) {

                    alert(
                        data.detail ||
                        "Invalid email or password."
                    );

                    passwordInput.focus();

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
                        "Please enter a valid email and password."
                    );

                    return;
                }


                // =================================================
                // OTHER SERVER ERROR
                // =================================================

                if (!response.ok) {

                    console.error(
                        "Login failed:",
                        data
                    );

                    alert(
                        data.detail ||
                        data.message ||
                        "Login failed. Please try again."
                    );

                    return;
                }


                // =================================================
                // CHECK TOKEN
                // =================================================

                if (!data.access_token) {

                    console.error(
                        "No access token received:",
                        data
                    );

                    alert(
                        "Login failed. The server did not return a token."
                    );

                    return;
                }


                // =================================================
                // SAVE JWT TOKEN
                // =================================================

                localStorage.setItem(
                    "access_token",
                    data.access_token
                );


                console.log(
                    "Login successful!"
                );


                // =================================================
                // SUCCESS
                // =================================================

                alert(
                    "Login successful!"
                );


                // Reset form
                loginForm.reset();


                // Close modal
                const modal =
                    document.getElementById("auth-modal");

                if (modal) {
                    modal.classList.remove("open");
                }


                // =================================================
                // OPTIONAL REDIRECT
                // =================================================

                // If you have a dashboard page,
                // uncomment this:
                //
                // window.location.href = "dashboard.html";

            }

            // ====================================================
            // NETWORK ERROR
            // ====================================================

            catch (error) {

                console.error(
                    "Login request error:",
                    error
                );

                alert(
                    "Could not connect to the FastAPI server.\n\n" +
                    "Make sure your backend is running on " +
                    "/api/login"
                );

            }

            // ====================================================
            // ENABLE BUTTON AGAIN
            // ====================================================

            finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Login";
            }

        }
    );


    console.log(
        "login.js loaded successfully."
    );

});