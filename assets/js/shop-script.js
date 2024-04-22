    
     
     let productsHTML = '';
     for(let i = 0;i<=products.length-1;i++){
        productsHTML += ` 
        <div class="trending-shops" id="product_${products[i].id}" data-itemIndex = "${i}">
                   <a href="./product-details.html?id=${products[i].id}"> <img src="./img/${products[i].image}" alt=""></a>
                    <div class="shops-content">
                        <a href="./product-details.html?id=${products[i].id}"><h4 class="p_name">${products[i].name}</h4></a>
                        <p>
                        ${products[i].description.length > 50 ? products[i].description.slice(0,50) + '&hellip;' : products[i].description}
                        </p>
                        <p style="font-weight:bold;margin-top:10px">$<span class="p_price">${products[i].price}</span></p>
                    </div>
                    <div class="product-btn">
                        <div class="p-btn-1" onclick="buyNow('${products[i].id}')">Buy Now</div>
                        <div class="p-btn-2" onclick="addToCart('${products[i].id}')">Add Cart</div>
                    </div>
                </div>
        `
     }

 document.querySelector('#trending-sec').innerHTML = productsHTML;
 


if(localStorage.getItem('cart')!=null){
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    let num_of_products = cartProducts.length;
    updateCartUI(cartProducts,num_of_products);
}

function addToCart(id){
   let product_to_add = document.querySelector('#product_'+id);
   let productName = product_to_add.querySelector('.p_name').textContent;
   let productPrice = product_to_add.querySelector('.p_price').textContent;
   let productImg = product_to_add.querySelector('img').getAttribute('src');
   let productId = id;
   let quantity = 1;
   let productTotal = productPrice;
   let newItem = {productId,productName,productPrice,productImg,quantity,productTotal};
   let cartItems = [];
   if(localStorage.getItem('cart')!=null){
    console.log('you are here');
    cartItems = JSON.parse(localStorage.getItem('cart'));
    let filterItem = cartItems.filter(item=>item.productId == id);
    if(filterItem.length!==0){
        alert('Item already added to cart, add another item');
        return;
    }
    
   }

   cartItems.push(newItem);
   localStorage.setItem('cart',JSON.stringify(cartItems));
   
   updateCartUI(cartItems,cartItems.length);
   alert('New Item Added to Cart');
   

}



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
  document.querySelector('#cart-products-length').innerHTML=productsLength;
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

      function buyNow(id){
      if(localStorage.getItem('cart')!=null){
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let itemIndex = cartItems.findIndex(i=>i.productId==id);
      if(itemIndex < 0){
        addToCart(id);
      }
      }
      else {
        addToCart(id);
      }
      window.location.href = 'checkout.html';
    }