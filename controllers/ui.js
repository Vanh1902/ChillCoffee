import { signUp,signIn, resetPassword} from "./authen.js";
// Bước 1: Khởi tạo các thành phần
var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');
var shop_footer = document.createElement('footer');
//shop_footer.style.cssText="position: fixed;left: 0;bottom: 0;width: 100%;";
window.onload = function() {
  shop_menu.id = 'shop_menu';
  document.body.appendChild(shop_menu);
  shop_content.id = 'shop_content';
  document.body.appendChild(shop_content);
  shop_footer.id = 'shop_footer'
  document.body.appendChild(shop_footer);
  getMenu()
  loadHome()
  renderCoffee()  
  loadFooter()
}

let getMenu = async function() {
  let response = await fetch("./views/nav-bar.html");
  let result = await response.text()
  shop_menu.innerHTML = result;

  document.getElementById('btnHome').addEventListener('click', ()=>{
      // this.prev_image();   
      console.log('pressed Home');
      loadHome()
      renderCoffee()
  });
  
  
  document.getElementById('btnCategory').addEventListener('click', ()=>{
    // this.prev_image();   
    console.log('pressed Category');
    loadBill()
    loadCart()
});
  
document.getElementById('btnAboutus').addEventListener('click', ()=>{
  // this.prev_image();   
  console.log('pressed About us');
  loadAboutus()
});

  document.getElementById('btnSupport').addEventListener('click', ()=>{
    // this.prev_image();   
    console.log('pressed Support');
    loadSupport() 
});


  document.getElementById('btnLogIn').addEventListener('click', async ()=>{
      // this.prev_image();   
      console.log('pressed Log In');
      await loadLogIn()
      signIn()
  });



  document.getElementById('btnSignUp').addEventListener('click', async ()=>{
      // this.prev_image();   
      console.log('pressed Sign Up');
      await loadSignUp()
      signUp()
  });

  
}

let loadHome = async function() {
  let response = await fetch("./views/home.html");
  let result = await response.text()
  shop_content.innerHTML = result
}

let loadFooter = async function() {
  let response = await fetch("./views/footer.html");
  let result = await response.text()
  shop_footer.innerHTML = result
}

let loadBill = async function() {
  let response = await fetch("./views/cart.html");
  let result = await response.text()
  shop_content.innerHTML = result;

}

let loadAboutus = async function() {
  let response = await fetch("./views/Aboutus.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadSupport = async function() {
  let response = await fetch("./views/Support.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadLogIn = async function() {
  let response = await fetch("./views/login.html");
  let result = await response.text()
  shop_content.innerHTML = result;
  document.getElementById('logInBtn').addEventListener('click', ()=>{
  signIn();
});
  document.getElementById('btnForgotPassword').addEventListener('click', async ()=>{
    // this.prev_image();   
    console.log('pressed Forgot Password');
    await resetPassword()
  });
}

let loadSignUp = async function() {
  let response = await fetch("./views/signup.html");
  let result = await response.text()
  shop_content.innerHTML = result;
  document.getElementById('signUpBtn').addEventListener('click', ()=>{
    signUp();
});
}
let loadCard = async function() {
  let response = await fetch("./views/card.html");
  return response.text()
}

let renderProfile = async function() {
  let response = await fetch("./views/profile.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let renderCoffee = async function() {
  let responseCard = await fetch("./views/card.html"); //Mot card
  let resultCard = await responseCard.text()
  let responseAPI = await fetch("https://vanh1902.github.io/json/coffee.json"); // Danh sach san pham
  let resultAPI = await responseAPI.json()
  let data = resultAPI['data']
  data.map(function(item){ 
      let card = resultCard.replace('{#name}', item['name']).replace('{#infor}', item['mota']).replace('{#image}',item['img']).replace('{#price}',item['price']+' VNĐ').replace('{#btnId}',item['id']) // Thay tung san pham, vao card
      let Danhmuc = item['type']
      let nothing = undefined;
      if(Danhmuc.localeCompare("Cà phê") ==  0){
        document.getElementById('lstCard').innerHTML += card
      }
      if(Danhmuc.localeCompare("món ăn") == 0){
        document.getElementById('3stCard').innerHTML += card
        delete "undefined"
      }
      if(Danhmuc.localeCompare("other") == 0){
        document.getElementById('2stCard').innerHTML += card
      }
      
  })
  data.map(function(item){ 
    document.getElementById("btnBuy"+item['id']).addEventListener('click', function() {
      alert('Sản phẩm đã thêm vào giỏ hàng '+item['name']+' : '+item['price']+'vnđ')
      localStorage.setItem(item['id'],JSON.stringify(item));

    })
  })
}

let loadCart = async function() {
  let responseCard = await fetch("./views/item.html"); //Mot card
  let resultCard = await responseCard.text()
  for(var i =0; i < localStorage.length; i++){
    let text =  localStorage.key(i);
    let retrievedObject = localStorage.getItem(text);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    let item =JSON.parse(retrievedObject); 
    let cart = resultCard.replace('{#name}',item['name']).replace('{#price}',item['price'])
    .replace('{#number}',i+1).replace('{#image}', item['img']).replace('{#btnAmount}',item['id'])
    .replace('{#idPrice}' , item['id']).replace('{#idDelete}' , item['id']).replace('{#btnId}', item['id'])
    document.getElementById('product').innerHTML += cart
  }
  for(var i =0; i < localStorage.length; i++) {
    let text =  localStorage.key(i);
    let retrievedObject = localStorage.getItem(text);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    let item =JSON.parse(retrievedObject);
    document.getElementById("btnAmount"+localStorage.key(i)).addEventListener('change', function(event) {
      //alert(document.getElementById("btnAmount"+localStorage.key(i)).value)
      if (event.target.value < 1) {
        event.target.value = 0
      }
      if (event.target.value > 10) {
        event.target.value = 10
      }
      let total = event.target.value * item['price']
      document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
      //let totalBill = 
      //document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
      
    })
    document.getElementById("btnAmount"+localStorage.key(i)).addEventListener('keyup', function(event) {
      //alert(document.getElementById("btnAmount"+localStorage.key(i)).value)
      if (event.target.value < 1) {
        event.target.value = 0
      }
      if (event.target.value > 10) {
        event.target.value = 10
      }
      let total = event.target.value * item['price']
      document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
      //let totalBill = 
      //document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
      
    })
    document.getElementById('btn-delete' + item['id']).addEventListener('click', function(){
      localStorage.removeItem(item['id'])
      document.getElementById('line'+item['id']).innerHTML = ""
    })
  }
  document.getElementById('btn-next').addEventListener('click', function(){
    let total = 0
    for(var i=0; i < localStorage.length; i++){
      let text =  localStorage.key(i);
      let retrievedObject = localStorage.getItem(text);
      console.log('retrievedObject: ', JSON.parse(retrievedObject));
  
      let item =JSON.parse(retrievedObject);
      total = total + item['price'] * document.getElementById('btnAmount' + item['id']).value
      document.getElementById('btnAmount' + item['id']).disabled = true
      document.getElementById('btn-delete' + item['id']).disabled = true

    }
    document.getElementById('1-name').disabled = false
    document.getElementById('2-name').disabled = false
    document.getElementById('address').disabled = false
    document.getElementById('phone').disabled = false
    document.getElementById('information').disabled = false
    document.getElementById('btn-submit').disabled = false
    document.getElementById('totalBill').innerHTML = total + 'vnd'

  })
  document.getElementById('btn-submit').addEventListener('click', function(){
    let name_1 = document.getElementById('1-name').value
    let name_2 = document.getElementById('2-name') .value
    let address = document.getElementById('address') .value
    let phone = document.getElementById('phone') .value
    let note = document.getElementById('information') .value
    
  
    if(checkPhoneNumber(phone) && checkName(name_1) && checkName(name_2) && checkName(note) && checkAdress(address)) {
      var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

      while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
      }
      firebase.firestore().collection("bill").add({
          firsname:name_1,
          lastname: name_2,
          address: address,
          phone: phone,
          information: note,
          products: values, 
          //products: localStorage.get
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          localStorage.clear();
          window.location.href = "./success.html"
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    }
  })
}

function checkName(inputtxt)
{
  var  name= /^[a-z ,.'-]+$/
  if(inputtxt.match(name))
  {
      return true;
  }
  else
  {
    alert("Name is invalid");
    return false;
  }
}
function checkPhoneNumber (inputtxt)
{
  var phoneno = /^\d{10}$/
  if(inputtxt.match(phoneno))
  {
      return true;
  }
  else
  {
    alert("Phone number is invalid");
    return false;
  }
}

function checkNumber (inputtxt)
{
  var phoneno = /^\d{10}$/
  if(inputtxt.match(phoneno))
  {
      return true;
  }
  else
  {
    alert("Số lượng từ 1 -10");
    return false;
  }
}

function checkAdress(inputtxt)
{
  var address = /^[a-z,0-9]/
  if(inputtxt.match(address))
  {
      return true;
  }
  else
  {
    alert("No address");
    return false;
  }
}






export {getMenu, loadCard};