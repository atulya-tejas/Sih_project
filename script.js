document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // MOBILE MENU
    // ============================================================

    const mobileMenuBtn =
        document.getElementById("mobile-menu-btn");

    const mobileMenu =
        document.getElementById("mobile-menu");


    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });


        mobileMenu.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });

        });
    }


    // ============================================================
    // AUTH MODAL
    // ============================================================

    const modal =
        document.getElementById("auth-modal");

    const modalHeading =
        document.getElementById("modal-heading");

    const modalSubheading =
        document.getElementById("modal-subheading");

    const modalCloseBtn =
        document.getElementById("modal-close-btn");


    const signupForm =
        document.getElementById("signup-form");

    const loginForm =
        document.getElementById("login-form");


    if (!modal) {
        console.error("Auth modal not found.");
        return;
    }


    // ============================================================
    // OPEN SIGNUP / LOGIN
    // ============================================================

    const openModal = (mode) => {

        // ----------------------------------------
        // SIGNUP
        // ----------------------------------------

        if (mode === "signup") {

            modalHeading.textContent =
                "Sign Up for SkillBridge";

            modalSubheading.textContent =
                "Select your role and create an account to begin.";


            if (signupForm) {
                signupForm.classList.remove("hidden");
            }

            if (loginForm) {
                loginForm.classList.add("hidden");
            }
        }


        // ----------------------------------------
        // LOGIN
        // ----------------------------------------

        if (mode === "login") {

            modalHeading.textContent =
                "Login to SkillBridge";

            modalSubheading.textContent =
                "Enter your credentials to access your dashboard.";


            if (signupForm) {
                signupForm.classList.add("hidden");
            }

            if (loginForm) {
                loginForm.classList.remove("hidden");
            }
        }


        // Open modal
        modal.classList.add("open");
    };


    // ============================================================
    // SIGNUP BUTTONS
    // ============================================================

    document
        .querySelectorAll(".open-signup-modal")
        .forEach((button) => {

            button.addEventListener("click", (event) => {

                event.preventDefault();

                openModal("signup");
            });

        });


    // ============================================================
    // LOGIN BUTTONS
    // ============================================================

    document
        .querySelectorAll(".open-login-modal")
        .forEach((button) => {

            button.addEventListener("click", (event) => {

                event.preventDefault();

                openModal("login");
            });

        });


    // ============================================================
    // CLOSE MODAL
    // ============================================================

    const closeModal = () => {

        modal.classList.remove("open");


        // Reset signup form
        if (signupForm) {
            signupForm.reset();
        }


        // Reset login form
        if (loginForm) {
            loginForm.reset();
        }
    };


    // Close button
    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeModal
        );
    }


    // Close when clicking outside modal
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });


    // ============================================================
    // SIGNUP PASSWORD SHOW / HIDE
    // ============================================================

    const signupPassword =
        document.getElementById(
            "signup-password-input"
        );

    const signupToggle =
        document.getElementById(
            "signup-toggle-password"
        );

    const signupEyeOpen =
        document.getElementById(
            "signup-eye-open"
        );

    const signupEyeClosed =
        document.getElementById(
            "signup-eye-closed"
        );


    if (
        signupPassword &&
        signupToggle &&
        signupEyeOpen &&
        signupEyeClosed
    ) {

        signupToggle.addEventListener(
            "click",
            () => {

                const isPassword =
                    signupPassword.type === "password";


                if (isPassword) {

                    signupPassword.type = "text";

                    signupEyeOpen.classList.add("hidden");

                    signupEyeClosed.classList.remove(
                        "hidden"
                    );

                    signupToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    signupToggle.setAttribute(
                        "title",
                        "Hide password"
                    );

                } else {

                    signupPassword.type = "password";

                    signupEyeOpen.classList.remove(
                        "hidden"
                    );

                    signupEyeClosed.classList.add(
                        "hidden"
                    );

                    signupToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    signupToggle.setAttribute(
                        "title",
                        "Show password"
                    );
                }

            }
        );
    }


    // ============================================================
    // LOGIN PASSWORD SHOW / HIDE
    // ============================================================

    const loginPassword =
        document.getElementById(
            "login-password-input"
        );

    const loginToggle =
        document.getElementById(
            "login-toggle-password"
        );

    const loginEyeOpen =
        document.getElementById(
            "login-eye-open"
        );

    const loginEyeClosed =
        document.getElementById(
            "login-eye-closed"
        );


    if (
        loginPassword &&
        loginToggle &&
        loginEyeOpen &&
        loginEyeClosed
    ) {

        loginToggle.addEventListener(
            "click",
            () => {

                const isPassword =
                    loginPassword.type === "password";


                if (isPassword) {

                    loginPassword.type = "text";

                    loginEyeOpen.classList.add(
                        "hidden"
                    );

                    loginEyeClosed.classList.remove(
                        "hidden"
                    );

                    loginToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    loginToggle.setAttribute(
                        "title",
                        "Hide password"
                    );

                } else {

                    loginPassword.type = "password";

                    loginEyeOpen.classList.remove(
                        "hidden"
                    );

                    loginEyeClosed.classList.add(
                        "hidden"
                    );

                    loginToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    loginToggle.setAttribute(
                        "title",
                        "Show password"
                    );
                }

            }
        );
    }


    // ============================================================
    // RESET PASSWORD VISIBILITY WHEN MODAL CLOSES
    // ============================================================

    const resetPasswordInputs = () => {

        // Signup
        if (signupPassword) {

            signupPassword.type = "password";
        }

        if (signupEyeOpen) {

            signupEyeOpen.classList.remove(
                "hidden"
            );
        }

        if (signupEyeClosed) {

            signupEyeClosed.classList.add(
                "hidden"
            );
        }

        if (signupToggle) {

            signupToggle.setAttribute(
                "aria-label",
                "Show password"
            );

            signupToggle.setAttribute(
                "title",
                "Show password"
            );
        }


        // Login
        if (loginPassword) {

            loginPassword.type = "password";
        }

        if (loginEyeOpen) {

            loginEyeOpen.classList.remove(
                "hidden"
            );
        }

        if (loginEyeClosed) {

            loginEyeClosed.classList.add(
                "hidden"
            );
        }

        if (loginToggle) {

            loginToggle.setAttribute(
                "aria-label",
                "Show password"
            );

            loginToggle.setAttribute(
                "title",
                "Show password"
            );
        }
    };


    // Reset whenever modal closes
    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            resetPasswordInputs
        );
    }


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            resetPasswordInputs();
        }

    });


    // ============================================================
    // ESC KEY CLOSE
    // ============================================================

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeModal();
            resetPasswordInputs();
        }

    });


    console.log("script.js loaded successfully.");

});

