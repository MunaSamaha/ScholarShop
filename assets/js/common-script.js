
const cartOpen = document.getElementById('cart-open');
const cartClose = document.getElementById('cart-close');
const cart = document.getElementById('cart');


cartOpen.addEventListener('click', function(){
    cart.style.display = 'block'
})
cartClose.addEventListener('click', function(){
    cart.style.display = 'none'
})

const menuToggler = document.querySelector('.mob-menu-toggler')
const menuItems = document.querySelector('.header-center');
menuToggler.onclick = function(){

	if(menuItems.classList.contains('open-mob-menu')){
		menuItems.classList.remove('open-mob-menu');
	}
	else {
		menuItems.classList.add('open-mob-menu');
	}
}

 if(localStorage.getItem('products')==null){
            localStorage.setItem('products',JSON.stringify(products));
        }