const login = async () => {
    const user = document.querySelector(`[name='user']`).value
    const password = document.querySelector(`[name='password']`).value
    console.log(password)

   const resp = await fetch('login/log', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password })
      })

   
      if(resp.status === 404) {
        throw ("Usuario inválido")
        } else if(resp.status === 401) {
        throw ("Password incorrecto")
        }
        const data =await resp.json()
        localStorage.setItem("jwt-token", data.token);
console.log("todo ok!!")
        window.location.href="/main"
  
}