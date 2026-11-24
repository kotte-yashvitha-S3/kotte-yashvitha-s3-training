<!DOCTYPE html>
<html>
<head>
    <title>Fetch API - User Cards</title>

    <style>
        body {
            font-family: Arial;
            background-color: #f2f2f2;
            text-align: center;
        }

        h1 {
            color: darkblue;
        }

        #container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }

        .card {
            background: white;
            width: 250px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px gray;
        }

        .card h3 {
            color: blue;
        }

        .card p {
            color: #444;
        }

        #loading {
            color: blue;
        }

        #error {
            color: red;
        }

        button {
            padding: 10px 20px;
            background: blue;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
    </style>
</head>

<body>

    <h1>User Details</h1>

    <button onclick="getUsers()">Load Users</button>

    <h3 id="loading"></h3>
    <h3 id="error"></h3>

    <div id="container"></div>

    <script>

        async function getUsers() {

            const container =
                document.getElementById("container");

            const loading =
                document.getElementById("loading");

            const error =
                document.getElementById("error");

            // Clear previous data
            container.innerHTML = "";
            error.innerHTML = "";

            try {

                // Loading message
                loading.innerHTML = "Loading...";

                // Fetch API data
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                // Check response
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                // Convert response into JSON
                const users = await response.json();

                // Remove loading message
                loading.innerHTML = "";

                // Display users
                users.forEach(function(user) {

                    const card =
                        document.createElement("div");

                    card.className = "card";

                    card.innerHTML = `
                        <h3>${user.name}</h3>
                        <p><b>Username:</b> ${user.username}</p>
                        <p><b>Email:</b> ${user.email}</p>
                        <p><b>Phone:</b> ${user.phone}</p>
                        <p><b>City:</b> ${user.address.city}</p>
                    `;

                    container.appendChild(card);

                });

            }

            catch (err) {

                loading.innerHTML = "";

                error.innerHTML =
                    "Something went wrong: " + err.message;

            }

        }

        // Load users automatically
        getUsers();

    </script>

</body>
</html>
