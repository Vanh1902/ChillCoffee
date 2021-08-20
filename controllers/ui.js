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
  document.getElementById('btn-Delivery').addEventListener('click', ()=>{
    console.log('pressed Profile');
    renderProfile();
  });
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
    .replace('{#idPrice}' , item['id'])
    document.getElementById('product').innerHTML += cart
    
  }
  

  for(var i =0; i < localStorage.length; i++) {
    let text =  localStorage.key(i);
    let retrievedObject = localStorage.getItem(text);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    let item =JSON.parse(retrievedObject);
    document.getElementById("btnAmount"+localStorage.key(i)).addEventListener('change', function(event) {
      //alert(document.getElementById("btnAmount"+localStorage.key(i)).value)
      let total = event.target.value * item['price']
      document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
      //let totalBill = 
      //document.getElementById('totalprice' + item['id']).innerHTML = total + 'vnd'
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
    }
    document.getElementById('totalBill').innerHTML = total + 'vnd'
  })
}




export {getMenu, loadCard};