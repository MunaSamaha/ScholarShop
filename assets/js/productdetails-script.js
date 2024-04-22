
        let url = new URL(window.location.href);
var product = undefined;
if(url.searchParams.has('id')){
 let productId =  url.searchParams.get('id');
 let allProducts = JSON.parse(localStorage.getItem('products'));
  product = allProducts.find(p=>p.id==productId);
 if(product != undefined){
   displayProductDetails(product);
   if(product.reviews.length!==0){
   displayProductReviews(product.reviews);
 }
 }
 else{
 window.location.href = "index.html";
}
}
else {
  window.location.href = "index.html";
}

 function addToCart(){
   
   let product_to_add = product.id;
   let productName = product.name;
   let productPrice = product.price;
   let productImg =   'img/'+product.image;
   let productId = product.id;
   let quantity = 1;
   let productTotal = productPrice;
   let newItem = {productId,productName,productPrice,productImg,quantity,productTotal};
   let cartItems = [];
   if(localStorage.getItem('cart')!=null){

    cartItems = JSON.parse(localStorage.getItem('cart'));
    let filterItem = cartItems.filter(item=>item.productId == product.id);
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





function displayProductDetails(product){
  document.querySelector('.product-img').setAttribute('src','img/'+product.image);
  document.querySelector('.product-title').innerHTML=product.name;
  document.querySelector('.product-price').innerHTML = product.price;
  document.querySelector('.product-desc').innerHTML = product.description;

  document.querySelector('.buy-now').setAttribute('data-productId',product.id)
}
function displayProductReviews(reviews){
  console.log(reviews);
   let reviewsHTML = '';
   for(let i = 0;i<reviews.length;i++){
    reviewsHTML+=`
      <div class="each-review" id="review_${reviews[i].id}">

               <div class="img-username">
                <div class="img-sec">
                 <div class="img-user">
                   <img src="img/${reviews[i].avatar}">
                 </div>
               </div>
                 <div class="user-name">
                   <h5>${reviews[i].username}</h5>
                   <p>${reviews[i].review_text}</p>
    <button onclick="openEditReviewModal('${reviews[i].id}')">Edit</button> <button onclick="deleteReview('${reviews[i].id}')">Delete</button>
                 </div>
               </div>

             </div>
    `
   }
   document.querySelector('.all-reviews').innerHTML = reviewsHTML;

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
                    <input type="number" min="1" max="10" data-itemId='${cartItems[i].productId}' class="quantity-item-cart" onchange="changedQuantityCart(this)" value="${cartItems[i].quantity}" name="quantity_cart" id="q_cart">
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


let addReviewBtn = document.querySelector('#add-review-btn');
addReviewBtn.onclick = function(e){
  e.preventDefault();
  let parentElement = this.parentElement.parentElement;
  let errorExists = false;
  let requiredFields = parentElement.querySelectorAll('.required');
  for(let i =0; i<requiredFields.length;i++){
    if(requiredFields[i].value===''){
      alert('Please fill all the required fields');
      errorExists = true;
      break;
      
    }
  }
  if(!errorExists){

   let username = document.querySelector('#add-name').value;
   let review_text = document.querySelector('#add-review').value;
   let avatar = "default_user2.png";
   let id = "id" + Math.random().toString(16).slice(2);
   let reviewObj = {id,username,avatar,review_text};
   product.reviews.push(reviewObj);
   let allProducts = JSON.parse(localStorage.getItem('products'));
   let productIndex = allProducts.findIndex(p=>p.id==product.id);
   allProducts[productIndex] = product;
   localStorage.setItem('products',JSON.stringify(allProducts));
   displayProductReviews(product.reviews);
   document.querySelector('#add-review-modal').style.display="none";
   document.querySelector('#review_'+id).scrollIntoView({behavior: 'smooth'});
   document.querySelector('#add-name').value = '';
   document.querySelector('#add-review').value = '';
}
}

function deleteReview(id){
  if(confirm("Are you sure, you want to delete this review?")){
  let reviewIndex = product.reviews.findIndex(r=>r.id==id);
  product.reviews.splice(reviewIndex,1);
  console.log(product.reviews);
  let allProducts = JSON.parse(localStorage.getItem('products'));
  let productIndex = allProducts.findIndex(p=>p.id==product.id);
  allProducts[productIndex] = product;
  localStorage.setItem('products',JSON.stringify(allProducts));
  document.getElementById('review_'+id).style.display="none";
}

}

function openEditReviewModal(id){
   let reviewDiv = document.querySelector('#review_'+id);
   let username = reviewDiv.querySelector('h5').textContent;
   let reviewText = reviewDiv.querySelector('p').textContent;
   document.querySelector('#edit-name').value = username;
   document.querySelector('#edit-review').value = reviewText;
   document.querySelector('#edit-review-modal').style.display="flex";
   document.querySelector('#edit-review-btn').setAttribute('data-review-id',id);

}

let editReviewBtn = document.querySelector('#edit-review-btn');
editReviewBtn.onclick = function(e){
  e.preventDefault();
  let parentElement = this.parentElement.parentElement;
  let errorExists = false;
  let requiredFields = parentElement.querySelectorAll('.required');
  for(let i =0; i<requiredFields.length;i++){
    if(requiredFields[i].value===''){
      alert('Please fill all the required fields');
      errorExists = true;
      break;
      
    }
  }
  if(!errorExists){

   let username = document.querySelector('#edit-name').value;
   let review_text = document.querySelector('#edit-review').value;
   let reviewId = this.getAttribute('data-review-id');
   let productReviewIndex = product.reviews.findIndex(r=>r.id==reviewId);
   product.reviews[productReviewIndex].username = username;
   product.reviews[productReviewIndex].review_text = review_text;
   
   let allProducts = JSON.parse(localStorage.getItem('products'));
   let productIndex = allProducts.findIndex(p=>p.id==product.id);
   allProducts[productIndex] = product;
   localStorage.setItem('products',JSON.stringify(allProducts));
   // displayProductReviews(product.reviews);
   let reviewCont = document.querySelector('#review_'+reviewId);
   reviewCont.querySelector('h5').textContent = username;
   reviewCont.querySelector('p').textContent = review_text;
   document.querySelector('#edit-review-modal').style.display="none";
  
}
}

function deleteReview(id){
  if(confirm("Are you sure, you want to delete this review?")){
  let reviewIndex = product.reviews.findIndex(r=>r.id==id);
  product.reviews.splice(reviewIndex,1);
  console.log(product.reviews);
  let allProducts = JSON.parse(localStorage.getItem('products'));
  let productIndex = allProducts.findIndex(p=>p.id==product.id);
  allProducts[productIndex] = product;
  localStorage.setItem('products',JSON.stringify(allProducts));
  document.getElementById('review_'+id).style.display="none";
}

}

     function buyNow(e){
       let productId = e.getAttribute('data-productId');
      if(localStorage.getItem('cart')!=null){
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let itemIndex = cartItems.findIndex(i=>i.productId==productId);
        //console.log(productId);
      if(itemIndex < 0){
        addToCart(productId);
      }
      }
      else {
        addToCart(productId);
      }
      window.location.href = 'checkout.html';
    }