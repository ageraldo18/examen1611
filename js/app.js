var objUsers=[];

/* LOGIN */
function login(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    
    let usersLS;
    usersLS=recoverLocalStorageU();
    
    let uEmail;
    let uPassword;

    usersLS.forEach(function(userLS){
        console.log(userLS);
        if(userLS.email===email && userLS.password===password){
            uEmail=userLS.email;
            uPassword=userLS.password;
        }
    });
    
    if(uEmail===email && uPassword===password){
        console.log("usuario encontrado");
        location.href='inicio.html';
        
    }else{
        alert("Ingrese nuevamente los datos");  
    }
}

/* REGISTRO */
function register(){
    var registerFName=document.getElementById("name").value;
    var registerLName=document.getElementById("lastName").value;
    var registerEmail=document.getElementById("email").value;
    var registerPassword=document.getElementById("password").value;
    
    var newUser={
        firstName: registerFName,
        lastName: registerLName,
        email: registerEmail,
        password: registerPassword
    }
    
    let usersLS;
    usersLS=recoverLocalStorageU();
    
    usersLS.forEach(function(userLS){
        if(userLS.email===newUser.email){
            usersLS=userLS.email;
        }
    });
    
    if(usersLS===newUser.email){
        alert("Usuario ya registrado");
        
    }else{
        addLocalStorageU(newUser);
        location.href='index.html';  
    }
}

function recoverLocalStorageU(){
    let users;
    
    if(localStorage.getItem('users')===null){
        users=[];
    }else{
        users=JSON.parse(localStorage.getItem('users'));
    }
    return users;
}

function addLocalStorageU(newUser){
    let users;
    users=recoverLocalStorageU();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

/* DESPLEGAR CARRITO DIV */ 

function displayCart(){
    const cartBtn=document.getElementsByClassName("shopping-cart")[0];
    
    
    if(cartBtn.style.display==="none"){
        cartBtn.style.display="block";
    }else{
        cartBtn.style.display="none";
    }
}


