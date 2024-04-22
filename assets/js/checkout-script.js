if(localStorage.getItem('cart')!=null){
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    let num_of_products = cartProducts.length;
    updateCartUI(cartProducts,num_of_products);
}




function updateCartUI(cartItems,productsLength){
    let cartHTML = '';
    let cartTotal = 0;
  for(let i = 0;i<cartItems.length;i++){
    cartHTML+=`
    <div class="cart-inner" id="c_product_${cartItems[i].productId}">
                <div class="cart-inner1">
                    <img src="${cartItems[i].productImg}" width="50px" alt="">
                    <h5>${cartItems[i].productName}</h5>
                    <p>$${cartItems[i].productPrice}</p>

                </div>
                <div class="cart-inner1">
                    <h5>Quantity</h5>
                    <input type="number" min="1" max="10" data-itemId='${cartItems[i].productId}' class="quantity-item-cart" onchange="changedQuantityCart(this)" value="${cartItems[i].quantity}" name="" id="">
                </div>
                <div class="cart-inner1">
                    <h5>Total</h5>
                    <p>$<span class="product-sub-total">${cartItems[i].productTotal}</span></p>
                </div>
                <div class="cart-inner1 delete-cart-item"> 
                   <a onclick="deleteCartItem(${cartItems[i].productId})">&times;</a>
                </div>
            </div>
    `
    cartTotal+= parseFloat(cartItems[i].productTotal);

  }
 

  document.querySelector('.no-item-cart').style.display="none";
  document.querySelector('.cart-wrapper').style.display="block";
  document.querySelector('.cart-items-all').innerHTML=cartHTML;
   document.querySelector('#cart-total-sub').innerHTML = cartTotal.toFixed(2);
   document.querySelector('.total-cart-price').innerHTML = cartTotal.toFixed(2);
   document.querySelector('.grantTotal').innerHTML = cartTotal.toFixed(2);
  document.querySelector('#cart-products-length').innerHTML=productsLength;
  document.querySelector('.items-count').innerHTML=productsLength;
  document.querySelector('#cart-products-length').style.display="flex";
}

     function changedQuantityCart(e){
        let quantity = parseInt(e.value);
        if(quantity < 1){
        alert('Quantity should not be less than 1');
        e.value = 1;
        return;
        }
       let cartItems = JSON.parse(localStorage.getItem('cart'));
       let itemId = e.dataset.itemid;
       
       let product = cartItems.find(item=>item.productId==itemId);
       let productIndex = cartItems.findIndex(item=>item.productId==itemId);
       let itemPrice = parseFloat(product.productPrice);
       let newSubTotal = (quantity*itemPrice).toFixed(2);
       product.productTotal = newSubTotal;
       product.quantity = quantity;
       cartItems[productIndex] = product;
       localStorage.setItem('cart',JSON.stringify(cartItems));
       updateCartUI(cartItems,cartItems.length);
    }

    function deleteCartItem(id){
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let itemIndex = cartItems.findIndex(item=>item.productId==id);
        cartItems.splice(itemIndex,1);
        if(cartItems.length===0){
            localStorage.removeItem('cart');
             document.querySelector('.no-item-cart').style.display="block";
            document.querySelector('.cart-wrapper').style.display="none";
             document.querySelector('#cart-products-length').style.display="none";

        }
        else{
        localStorage.setItem('cart',JSON.stringify(cartItems));
        updateCartUI(cartItems,cartItems.length);
    }
    }

function paymentSelected(e){

  let radioSelected = e.getAttribute('id');
  if(radioSelected === 'card-payment'){
    document.querySelector('.payment-details').classList.add('payment-details-show');
  }
  else {
    document.querySelector('.payment-details').classList.remove('payment-details-show');
  }
}
function checkCard(e){
  
  let number = e.value;
  let card = getCardType(number);
  let cardImg = '';
  console.log(card);
  if(card!==undefined){
    if(card === 'visa'){
     cardImg = `<i class="fa-brands fa-cc-visa" style="color:navy;"></i>`;
    }
    else if(card === 'mastercard'){
      cardImg = `<i class="fa-brands fa-cc-mastercard" style="color:red;"></i>`;
    }
    else if(card === 'amex'){
      cardImg = `<i class="fa-brands fa-cc-amex" style="color:blue;"></i>`;
    }
    else if(card === 'discover'){
      console.log('here');
      cardImg = `<i class="fa-brands fa-cc-discover" style="color:orange;"></i>`;
    }
    document.querySelector('.img-card').innerHTML = cardImg;
  }
  else {
    document.querySelector('.img-card').innerHTML = '';
  }
}

var getCardType = function (number) {

        var cards = {
            visa: /^4[0-9]{0,}$/,
            mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/,
            amex: /^3[47][0-9]{0,}$/,
     discover: /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/,
        };
        for (var card in cards) {
            if (cards[card].test(number)) {
                return card;
            }
        }
    };


const placeOrderBtn = document.querySelector('#order-place');
placeOrderBtn.onclick=function(e){
       e.preventDefault();
    let paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if(validate_fields(paymentMethod)){
    let fullName = document.querySelector('#full_name').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone_number').value;
    let address = document.querySelector('#address').value;
    let postalCode = document.querySelector('#postal-code').value
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;
    
    let cardNumber = document.querySelector('#card-number').value;
    let exp_month = document.querySelector('#c-month').value
    let exp_year = document.querySelector('#c-year').value;
    let securityCode = document.querySelector('#security-code').value;

    let userData = {
      fullName,
      email,
      phone,
      address,
      postalCode,
      city,
      country,
      paymentMethod
    }
  if(paymentMethod=='Credit Card'){
    userData['cardDetails'] = {
      cardNumber,
      exp_month,
      exp_year,
      securityCode
    }
  }

  localStorage.setItem('userData',JSON.stringify(userData));
  window.location.href = "order-details.html";
}
}  

   function validate_fields(paymentMethod){
           var flag = false;
         var fields = document.querySelectorAll('.required');
         document.querySelectorAll('.error').forEach((err)=>{
            err.innerHTML ='';
         })
    for(let i in fields){
        let name = fields[i].name;
        if(fields[i].value == '') {
          if(paymentMethod=='Cash' && (name=='card-expiry-month' || name=='card-expiry-year' || name=='security-code' || name=='card-number')){
                continue;
            }
          if(name=='country' || name=='card-expiry-month' || name=='card-expiry-year'){
            
            fields[i].nextElementSibling.innerHTML= 'Please select '+name;
          }
          else{
            fields[i].nextElementSibling.innerHTML= 'Please provide '+name;
          }
            flag = true;
            break;
        
            
        }
        if(name=='email'){

            let email_rule =  /^\S+@\S+\.\S+$/;
            let email = fields[i].value;
            if(email_rule.test(email) != true){
                fields[i].nextElementSibling.innerHTML= 'Please provide a valid '+name;
                flag = true;
            break;
            }
        }

    }
    if(flag === true){
      console.log('error-exits');
        return false;
    }
    else {
      console.log('error doesnt exist');
      return true;
    }
    }