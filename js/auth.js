/* ==========================================
   FOODRUSH AUTHENTICATION
========================================== */


/* ================= REGISTER ================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim().toLowerCase();


            const phone =
                document.getElementById(
                    "registerPhone"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            /* PHONE VALIDATION */

            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit phone number."
                );

                return;

            }


            /* PASSWORD VALIDATION */

            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /* CONFIRM PASSWORD */

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            /* GET EXISTING USERS */

            const users =
                getData("users", []);


            /* CHECK DUPLICATE EMAIL */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;

            }


            /* CREATE USER */

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                password:
                    password,

                role:
                    "customer",

                createdAt:
                    new Date().toISOString()

            };


            /* SAVE USER */

            users.push(newUser);

            saveData(
                "users",
                users
            );


            alert(
                "Account created successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

}



/* ================= LOGIN ================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            /* GET USERS */

            const users =
                getData("users", []);


            /* FIND USER */

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            if (!user) {

                alert(
                    "Invalid email or password."
                );

                return;

            }


            /* SAVE CURRENT USER */

            saveData(
                "currentUser",
                user
            );


            alert(
                "Login successful!"
            );


            /* REDIRECT */

            if (user.role === "admin") {

                window.location.href =
                    "admin/dashboard.html";

            }

            else {

                window.location.href =
                    "customer/home.html";

            }

        }
    );

}



/* ================= DEMO ADMIN ================= */

function createDefaultAdmin() {

    const users =
        getData("users", []);


    const adminExists =
        users.some(
            user =>
                user.email ===
                "admin@foodrush.com"
        );


    if (!adminExists) {

        users.push({

            id: 1,

            name: "FoodRush Admin",

            email:
                "admin@foodrush.com",

            phone:
                "9999999999",

            password:
                "admin123",

            role:
                "admin",

            createdAt:
                new Date().toISOString()

        });


        saveData(
            "users",
            users
        );

    }

}


createDefaultAdmin();