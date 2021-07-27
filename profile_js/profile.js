function profile(){
    let input_name1 = document.getElementById("1-name").value
    let input_name2 = document.getElementById("2-name").value
    let input_email = document.getElementById("email").value
    let input_phone = document.getElementById("phone").value

    let caseblock = document.getElementById("checkCase")

    if(input_name1 == "" || input_name2 == "" || input_email == "" || input_phone == "" ){
        console.log("ERROR")
        caseblock.innerHTML = "Check all your information"
        caseblock.style.color = "red"
    }else if (input_email.value.includes("@gmail") == true && input_phone.length >9) {
        console.log("Success")
        caseblock.innerHTML = "Success"
        caseblock.style.color = "green"
        location.replace("finish.html")
}
}