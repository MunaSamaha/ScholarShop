   


let currentDate = new Date().toLocaleDateString();
document.querySelector('.date').innerHTML=currentDate;

if(localStorage.getItem('cart')!=null){
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    let num_of_products = cartProducts.length;
    updateCartUI(cartProducts,num_of_products);
    updateOrderedItemsSec(cartProducts);
}

if(localStorage.getItem('userData')!=null){
  let userData = JSON.parse(localStorage.getItem('userData'));
  document.querySelector('.c-full-name').innerHTML=userData.fullName;
  document.querySelector('.c-email').innerHTML=userData.email;
  document.querySelector('.c-phone').innerHTML=userData.phone;
  document.querySelector('.c-address').innerHTML=userData.address;
  document.querySelector('.c-city').innerHTML=userData.city;
  document.querySelector('.c-country').innerHTML=userData.country;
  document.querySelector('.c-postalcode').innerHTML = userData.postalCode;
  document.querySelector('.payment-method-show').innerHTML = userData.paymentMethod;
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



function updateOrderedItemsSec(cartItems){
     let orderedProducts = '';
  for(let i = 0;i<cartItems.length;i++){
    orderedProducts+=`
    <div class="each-product-order">
                          <div class="quantity-name">
                            <span class="q-order">${cartItems[i].quantity}</span> &times; <span class="n-order">${cartItems[i].productName}</span>
                          </div>

                          <div class="product-amount">
                            $<span>${cartItems[i].productTotal}</span>
                          </div>
                        </div>
    `
   

  }
   document.querySelector('.products-order').innerHTML = orderedProducts;
}

let returnBtn = document.querySelector('#return-shop-link');
returnBtn.onclick = function(e){
e.preventDefault();
localStorage.removeItem('userData');
localStorage.removeItem('cart');
window.location.href = "index.html";
  

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