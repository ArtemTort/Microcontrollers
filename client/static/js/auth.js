document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

// localStorage.removeItem(storageName)

// const data = JSON.parse(localStorage.getItem(storageName))

    loginButton.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const [token, userId] = http('http://localhost:3000/api/auth/login', "POST", { email, password })
        localStorage.setItem("auth", JSON.stringify({ userId, token }))

        console.log(
            `Login: Email - ${email}, Password - ${password}`
        ); // TODO: можно убрать или нет
    });

    registerButton.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const data = http('http://localhost:3000/api/auth/register', "POST", { email, password })
        console.log(data);
        localStorage.setItem("auth", JSON.stringify(data))

        console.log(
            `Register: Email - ${email}, Password - ${password}`
        ); // TODO: можно убрать или нет
    });
});

async function http(url, method="GET", body=null, headers={}) {

    try {
        if (body) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers }); 

        
        console.log(response);

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Request error.");
        }

        console.log(data);

        return await data;
    } catch (err) {
        console.error(`Error: ${err}`);
        throw err;
    }
}


