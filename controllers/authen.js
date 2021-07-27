
let signUp = function()  {
    let email = document.getElementById("iEmail").value
    let password = document.getElementById("iPassword").value

    document.getElementById("btnSignUpNew").addEventListener('click', function(){
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
    })

}
    


let signIn = function(){
    let email = document.getElementById("iEmail").value
    let password = document.getElementById("iPassword").value

    
    firebase.auth().signInWithEmailAndPassword(email, password)//Đăng nhập băng email và password
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