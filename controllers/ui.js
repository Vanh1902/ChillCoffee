import { signUp,signIn } from "./authen.js";
// Bước 1: Khởi tạo các thành phần
var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');

window.onload = function() {
  shop_menu.id = 'shop_menu';
  document.body.appendChild(shop_menu);

  shop_content.id = 'shop_content';
  document.body.appendChild(shop_content);

  getMenu()
  loadHome()
}

let getMenu = async function() {
  let response = await fetch("./views/menu.html");
  let result = await response.text()
  shop_menu.innerHTML = result;
  //
  document.getElementById('btnHome').addEventListener('click', ()=>{
      // this.prev_image();   
      console.log('pressed Home');
      loadHome()
  });

  document.getElementById('btnCategory').addEventListener('click', ()=>{
      // this.prev_image();   
      console.log('pressed Category');
      loadCategory()
  });

  document.getElementById('btnAbout').addEventListener('click', ()=>{
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
      console.log('pressed');
      await loadSignUp()
      signUp()
  });
}

let loadHome = async function() {
  let response = await fetch("./views/home.html");
  let result = await response.text()
  shop_content.innerHTML = result;
  document.getElementById("tabs-1").addEventListener('click', ()=>{
    console.log('Coffee');
    renderCoffee();
  })
  // document.getElementById('tabs-2').addEventListener('click',()=>{
  //   console.log('Smoothie');
  //   renderSmoothie();
  // })
//   document.getElementById('tabs-3').addEventListener('click',()=>{
//     console.log('Food');
//     renderFood();
//   })
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

let loadSupport = async function() {
  let response = await fetch("./views/support.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadLogIn = async function() {
  let response = await fetch("./views/login.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadSignUp = async function() {
  let response = await fetch("./views/signup.html");
  let result = await response.text()
  shop_content.innerHTML = result;
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
  console.log(data)
  console.log(data.length)
    // console.log(value) // Log tung san pham
  //   if(value['title'] === undefined){
  //     return
  //   } 
  //   let card = resultCard.replace('{#title}', value['name'] ).replace('Thông tin rỗng!!!', value['price']) // Thay tung san pham, vao card

  //   document.getElementById('lstCard').innerHTML += card
    for (let i=0; i<data.length ; i++ ){
      console.log(data[i]);
    }
  
 }


let renderSmoothie = async function() {
  let response = await fetch("./views/card.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let renderFood = async function() {
  let response = await fetch("./views/card.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

export {getMenu, loadCard};