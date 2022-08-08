const register = document.getElementById("register") 
if(register){
  register.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    if(email.value !== confirmEmail.value){
      alertForm("o Email precisa ser igual ao campo confirmar Email")
      return false
    }
  
    if(password.value !== confirmPassword.value){
      alertForm("a senha precisa ser igual ao campo confirmar senha")
      return false
    }
  
    let users = localStorage.getItem("users")
    if(!users){
      users = []
    }else{
      users = JSON.parse(users)
    }
  
    let userVerify = users.filter(value => value.email === email.value)[0]
    if(userVerify ){
      alertForm("Usuário já cadastrado")
      return false
    }
  
    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
    }
  
    users.push(user)
    users = JSON.stringify(users)
    localStorage.setItem("users", users)
  
    alertForm("Usuário cadastrado com sucesso!", "success")
  
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000)
  })
  
}

const login = document.getElementById("login")

if(login){
  login.addEventListener("submit", (e)=>{
    e.preventDefault()
  
    let users = localStorage.getItem("users")
    if(!users){
      users = []
    }else{
      users = JSON.parse(users)
    }
  
    let userVerify = users.filter(user => user.email === email.value && user.password === password.value)[0]
    if(!userVerify){
      alertForm("Usuário ou senha inválida")
      return false
    }

    userVerify = JSON.stringify(userVerify)
    sessionStorage.setItem("userLogged", userVerify)
  
    alertForm("Usuário logado com sucesso!", "success")
  
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000)
  })
}

const logout = document.getElementById("logout")
if(logout){
  logout.addEventListener("click", (e)=>{
    sessionStorage.removeItem("userLogged")
  })
}

const alertForm = (msg, type="danger") =>{
  const alert = `
  <div class="alert alert-${type}" role="alert">
    <div>
      ${msg}
    </div>
  </div>
  `
  alerts.innerHTML = alert
}

const nameLogged = document.getElementById("nameLogged")
if(nameLogged){
  let user = sessionStorage.getItem("userLogged")

  if(user){
    user = JSON.parse(user)
  
    nameLogged.textContent = user.username
  }else{
    window.location.href = "login.html";
  }

  
}





