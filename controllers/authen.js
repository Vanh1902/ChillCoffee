
let signUp = function()  {
    let email = document.getElementById("exampleInputEmail1").value
    let password = document.getElementById("exampleInputPassword1").value
    console.log(email+" day la email");
    console.log(password+" day la password");
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            //var user = userCredential.user;
            // ...
            //console.log(userCredential)
            alert("Success")
            
        })
        .catch((error) => {
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ..
            //console.log(error)
            alert(error.message)
        })


}
    


let signIn = function(){
    let email = document.getElementById("exampleInputEmail1").value
    let password = document.getElementById("exampleInputPassword1").value

    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((Success) => {
        // Signed in    
        //var user = userCredential.user;
        // ...
        //console.log(userCredential)
        alert("Success")
    })
    .catch((error) => {
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ..
        //console.log(error)
        alert(error.message)
    })
}
export{signUp, signIn}