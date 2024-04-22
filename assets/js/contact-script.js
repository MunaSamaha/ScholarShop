
const contactForm = document.getElementById('contactForm');
        const Name = document.getElementById('name');
        const Mail = document.getElementById('mail');
        const Message = document.getElementById('message');
        const sendBtn = document.getElementById('sendMessage');
        const alertText = document.getElementById('alertText');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
       if (Name.value === '' || Mail.value === '' || Message.value === '') {
        alert('Please enter all required details.');
        } else {
            const nameValue = Name.value;
            alertText.innerText = 'Thank you for contacting us, ' + nameValue + '!';
        }
    });
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