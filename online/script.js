// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)') {
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal






// close cart modal
const closeBtn = document.querySelector('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')) {
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal









function loadCartFromLocalStorage() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productRows = document.querySelector('.product-rows');

  for (const item of cartItems) {
    addItemToCart(item.price, item.imageSrc, item.quantity);
  }
}

function saveCartToLocalStorage() {
  const cartRows = document.querySelectorAll('.product-row');
  const cartItems = [];

  for (const row of cartRows) {
    const price = row.querySelector('.cart-price').textContent;
    const imageSrc = row.querySelector('.cart-image').getAttribute('src');
    const quantity = row.querySelector('.product-quantity').value;
    cartItems.push({ price, imageSrc, quantity });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}










// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;

  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart(price, imageSrc);
  updateCartPrice()
}

function addItemToCart(price, imageSrc) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');

  for (var i = 0; i < cartImage.length; i++) {
    if (cartImage[i].src == imageSrc) {
      alert('This item has already been added to the cart')
      return;
    }
  }

  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart






// Remove products from cart
function removeItem(event) {
  const btnClicked = event.target;
  const productRow = btnClicked.parentElement.parentElement;
  productRow.remove();
  updateCartPrice();
  saveCartToLocalStorage();
}







// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++) {
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input







// update total price
function updateCartPrice() {
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)

  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total

  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price











// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked() {
  alert('Thank you for you purchase');
  cartModalOverlay.style.transform = 'translateX(-100%)'
  var cartItems = document.getElementsByClassName('product-rows')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartPrice()
}
// end of purchase items








// Get a reference to the "Clear Cart" button
const clearCartBtn = document.querySelector('.clear-cart-btn');

// Add event listener to the "Clear Cart" button
clearCartBtn.addEventListener('click', clearCart);

// Function to clear the cart
function clearCart() {
  const productRows = document.querySelector('.product-rows');
  productRows.innerHTML = '';

  updateCartPrice();

  localStorage.removeItem('cartItems');
}




// Save cart items to local storage when any cart action occurs
const cartActions = document.querySelectorAll('.add-to-cart, .remove-btn, .product-quantity');
for (const action of cartActions) {
  action.addEventListener('click', () => {
    saveCartToLocalStorage();
  });
}


// Inside the `changeQuantity` function
function changeQuantity(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartPrice();
  saveCartToLocalStorage(); // Save changes to local storage
}

 








const placeOrderButton = document.querySelector('.place-order-button');

placeOrderButton.addEventListener('click', function () {
  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    paymentMethod: document.querySelector('input[name="payment-method"]:checked').value
  };

  localStorage.setItem('checkoutData', JSON.stringify(userData));
});
















document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up-button");
  const signUpForm = document.querySelector(".sign-up-form");

  signUpButton.addEventListener("click", function () {
    signUpForm.style.display = "block";
  });
});







// Validate
function validateForm() {
  var name = document.getElementById("signup-name").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;

  if (name === "") {
    alert("Please enter your name.");
    return false;
  }

  if (email === "") {
    alert("Please enter your email.");
    return false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (password === "") {
    alert("Please enter a password.");
    return false;
  }
  return true;
}


// Add an event listener to the registration submit button
const submitSignUpButton = document.querySelector(".submit-signup-button");
submitSignUpButton.addEventListener("click", function () {
  const signUpData = {
    name: document.getElementById("signup-name").value,
    email: document.getElementById("signup-email").value,
    password: document.getElementById("signup-password").value,
  };
  localStorage.setItem("userData", JSON.stringify(signUpData));
});


// // Add an event listener to the login submit button
// const submitSignInButton = document.querySelector(".submit-signin-button");
// submitSignInButton.addEventListener("click", function () {
//   const signInEmail = document.getElementById("signin-email").value;
//   const signInPassword = document.getElementById("signin-password").value;

//   const storedUserData = JSON.parse(localStorage.getItem("userData"));

//   if (
//     storedUserData &&
//     signInEmail === storedUserData.email &&
//     signInPassword === storedUserData.password
//   ) {
//     localStorage.setItem("isLoggedIn", true);
//     alert("Sign in successful!");
//   } else {
//     alert("Invalid email or password. Please try again.");
//   }
// });




document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is signed in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    // User is signed in, retrieve their data
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.name) {
      // Display the user's name in the element with id "user-greeting"
      const userGreeting = document.getElementById("user-greeting");
      userGreeting.textContent = `Welcome, ${userData.name}!`;
    }
  }
});
 

document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up-button");
  const signInButton = document.querySelector(".sign-in-button");
  const signUpForm = document.querySelector(".sign-up-form");
  const signInForm = document.querySelector(".sign-in-form");

  // Initial state: Show sign-up form, hide sign-in form
  signUpForm.style.display = "block";
  signInForm.style.display = "none";

  signUpButton.addEventListener("click", function () {
    signUpForm.style.display = "block";
    signInForm.style.display = "none";
  });

  signInButton.addEventListener("click", function () {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });

  // Check if the user is signed in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    // User is signed in, hide both sign-up and sign-in forms
    signUpForm.style.display = "none";
    signInForm.style.display = "none";

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.name) {
      const userGreeting = document.getElementById("user-greeting");
      userGreeting.textContent = `Welcome, ${userData.name}!`;
    }
  }

  // Add an event listener to the registration submit button
  const submitSignUpButton = document.querySelector(".submit-signin-button");
  submitSignUpButton.addEventListener("click", function () {
    // Handle sign-up logic here
    const signUpData = {
      name: document.getElementById("signin-name").value,
      email: document.getElementById("signin-email").value,
      password: document.getElementById("signin-password").value,
    };
    localStorage.setItem("userData", JSON.stringify(signUpData));
    localStorage.setItem("isLoggedIn", true);

    // Hide both sign-up and sign-in forms after sign-up
    signUpForm.style.display = "none";
    signInForm.style.display = "none";

    alert("Sign up successful!");
  });

  // Add an event listener to the login submit button
  const submitSignInButton = document.querySelector(".submit-signin-button");
  submitSignInButton.addEventListener("click", function () {
    // Handle sign-in logic here
    const signInEmail = document.getElementById("signin-email").value;
    const signInPassword = document.getElementById("signin-password").value;

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedUserData &&
      signInEmail === storedUserData.email &&
      signInPassword === storedUserData.password
    ) {
      localStorage.setItem("isLoggedIn", true);

      // Hide both sign-up and sign-in forms after sign-in
      signUpForm.style.display = "none";
      signInForm.style.display = "none";

      const userGreeting = document.getElementById("user-greeting");
      userGreeting.textContent = `Welcome, ${storedUserData.name}!`;

      alert("Sign in successful!");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
});




let purchaseHistory = []; // Initialize an empty array to store purchase history

function purchaseBtnClicked() {
  // Capture product information
  const cartItems = document.querySelectorAll('.product-row');
  const purchaseRecord = [];

  cartItems.forEach((item) => {
    const productName = item.querySelector('.cart-image').alt;
    const price = parseFloat(item.querySelector('.cart-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.product-quantity').value);
    const total = price * quantity;

    // Create a purchase record object
    const purchaseItem = {
      productName: productName,
      price: price,
      quantity: quantity,
      total: total,
    };

    purchaseRecord.push(purchaseItem);
  });

  purchaseHistory.push(purchaseRecord);

  localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

  cartModalOverlay.style.transform = 'translateX(-100%)';
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartPrice();

  // Show a purchase confirmation alert
  alert('Thank you for your purchase!');
}




// After successful sign-in
 
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.name) {
      const userGreeting = document.getElementById("user-greeting");
      userGreeting.textContent = `Welcome, ${userData.name}!`;
    }
  }
});





  
document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is signed in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Get the containers for signed-in and non-signed-in elements
  const signedInElements = document.getElementById("signedInElements");
  const nonSignedInElements = document.getElementById("nonSignedInElements");

  if (isLoggedIn) {
      // User is signed in, show signed-in elements and hide non-signed-in elements
      signedInElements.style.display = "block";
      nonSignedInElements.style.display = "none";

      // Retrieve user data and display it
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.name) {
          const userGreeting = document.getElementById("user-greeting");
          userGreeting.textContent = `Welcome, ${userData.name}!`;
      }
  } else {
      // User is not signed in, show non-signed-in elements and hide signed-in elements
      signedInElements.style.display = "none";
      nonSignedInElements.style.display = "block";
  }

  // Remove event listeners for sign-in, sign-up, and sign-out buttons (this removes the logic)
  const signInButton = document.getElementById("signInButton");
  const signUpButton = document.getElementById("signUpButton");
  const signOutButton = document.getElementById("signOutButton");

  signInButton.removeEventListener("click", null);
  signUpButton.removeEventListener("click", null);

  signOutButton.addEventListener("click", function () {
      // Handle sign-out logic here
      // You can clear the user's data and update the UI accordingly
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      signedInElements.style.display = "none";
      nonSignedInElements.style.display = "block";
  });
});
// Add event listener for the sign-out button
const signOutButton = document.getElementById("signOutButton");

signOutButton.addEventListener("click", function () {
    // Handle sign-out logic here
    // You can clear the user's data and update the UI accordingly
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    signedInElements.style.display = "none";
    nonSignedInElements.style.display = "block";
});
