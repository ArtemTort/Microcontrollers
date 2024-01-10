document.addEventListener("DOMContentLoaded", () => {
    
    checkAuth()

    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    loginButton.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        controller('http://localhost:3000/api/auth/login', "POST", { email, password })

        console.log(
            `Login: Email - ${email}, Password - ${password}`
        ); // TODO: можно убрать или нет
    });

    registerButton.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        controller('http://localhost:3000/api/auth/register', "POST", { email, password })

        console.log(
            `Register: Email - ${email}, Password - ${password}`
        ); // TODO: можно убрать или нет
    });
});

async function controller(url, method="GET", body=null, headers={}) {
    const data = await http(url, method, body, headers)
    
    window.location.reload()

    console.log(data);
        
    localStorage.setItem("auth", JSON.stringify(data))
}

async function http(url, method="GET", body=null, headers={}) {

    try {
        if (body) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers }); 

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Request error.");
        }


        return await data;
    } catch (err) {
        console.error(`Error: ${err}`);
        throw err;
    }
}

function checkAuth() {
    const authData = JSON.parse(localStorage.getItem("auth"));
    
    if (authData && authData.token) {
        let data = fetch('http://localhost:3000/', 
        {method:"POST", body: JSON.stringify(authData), 
        headers: { "Content-Type": "application/json" }})
        .then((res) => {
          return res.text();
        })
        .then((html) => {
            document.open();
            document.write(html);
            document.close();    
            // document.getElementById('logoutBtn').addEventListener('click', () => { localStorage.removeItem("auth") }) 
        });
    }
}

function logout() {
    localStorage.removeItem('auth'); 
    window.location.reload()
}