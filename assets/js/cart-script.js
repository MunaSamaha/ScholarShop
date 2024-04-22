if(localStorage.getItem('cart')!=null){
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    let num_of_products = cartProducts.length;
    updateCartUI(cartProducts,num_of_products);
    updateCartPage(cartProducts,num_of_products);
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
  document.querySelector('#cart-products-length').innerHTML=productsLength;
  document.querySelector('#cart-products-length').style.display="flex";
}

 function updateCartPage(cartItems,productsLength){
    let cartHTML = '';
    let cartTotal = 0;
  for(let i = 0;i<cartItems.length;i++){
    cartHTML+=`
             <div class="each-item-cart" id="c_productcart_${cartItems[i].productId}">
                   <div class="img-item">
                       <img src="${cartItems[i].productImg}">
                   </div>
                   <div class="product-name">${cartItems[i].productName}</div>
                   <div class="product-quantity">
                       <input type="number" min="1" max="10" onchange="changedQuantityCart(this)" data-itemId='${cartItems[i].productId}' value="${cartItems[i].quantity}">
                   </div>
                   <div class="product-price">$${cartItems[i].productPrice}</div>
                   <div class="total-product-price">$<span class="product-cart-sub-total">${cartItems[i].productTotal}</span></div>
                   <div class="delete-cart-item-page" onclick="deleteCartItem(${cartItems[i].productId})">&times;</div>
               </div>
    `
    cartTotal+= parseFloat(cartItems[i].productTotal);

  }
 
  
  document.querySelector('.empty-text').style.display="none";
  document.querySelector('.shopping-cart-items').style.display="block";
  document.querySelector('.cart-items').removeAttribute('style');
  document.querySelector('.cart-summary').style.display="block";
  document.querySelector('.cart-product-items').innerHTML = cartHTML;
  document.querySelector('.total-cart-price').innerHTML = cartTotal.toFixed(2);
  document.querySelectorAll('.items-count').forEach(item=>{item.innerHTML=productsLength});
  document.querySelector('.number-of-items').style.display="block";
  document.querySelector('.grantTotal').innerHTML=cartTotal.toFixed(2);
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
       updateCartPage(cartItems,cartItems.length);
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
             document.querySelector('.empty-text').style.display="block";
            document.querySelector('.shopping-cart-items').style.display="none";
          document.querySelector('.cart-items').style.width="100%";
           document.querySelector('.cart-summary').style.display="none";
        document.querySelector('.number-of-items').style.display="none";

        }
        else{
        localStorage.setItem('cart',JSON.stringify(cartItems));
        updateCartUI(cartItems,cartItems.length);
        updateCartPage(cartItems,cartItems.length);
    }
    }