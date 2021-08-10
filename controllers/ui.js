import { signUp,signIn } from "./authen.js";
// Bước 1: Khởi tạo các thành phần
var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');
var shop_footer = document.createElement('footer');

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
  let response = await fetch("./views/menu.html");
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
    loadCategory()
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

let loadCategory = async function() {
  let response = await fetch("./views/category.html");
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
  let responseAPI = await fetch("http://authen.gomatching.org/api/v1/test"); // Danh sach san pham
  let resultAPI = await responseAPI.json()
  let data = resultAPI['data']
      data.map(function(item){ 
      let card = resultCard.replace('{#name}', item['name']).replace('{#infor}', item['mota']).replace('{#image}',item['img']).replace('{#price}',item['price']).replace('{#btnId}',item['id']) // Thay tung san pham, vao card
      let Danhmuc = item['type']
      if(Danhmuc.localeCompare("Cà phê") ==  0){
        document.getElementById('lstCard').innerHTML += card
      }
      if(Danhmuc.localeCompare("món ăn") == 0){
        document.getElementById('3stCard').innerHTML += card
      }
      if(Danhmuc.localeCompare("other") == 0){
        document.getElementById('2stCard').innerHTML += card
      }
    
    
    })
}
  let Buy = async function(id){
    alert(id)
  }

  



export {getMenu, loadCard, Buy};