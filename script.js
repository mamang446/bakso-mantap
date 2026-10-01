/* =========================================
   DATA MENU
========================================= */

const menuData = [
    {
        id: 1,
        name: "Bakso Original",
        description: "Bakso sapi dengan kuah kaldu gurih.",
        price: 15000,
        image: "🍜",
        tag: "BEST SELLER"
    },

    {
        id: 2,
        name: "Bakso Urat",
        description: "Bakso urat kenyal dengan rasa daging kuat.",
        price: 18000,
        image: "🍲",
        tag: "FAVORIT"
    },

    {
        id: 3,
        name: "Bakso Mercon",
        description: "Bakso pedas dengan isian cabai yang mantap.",
        price: 20000,
        image: "🌶️",
        tag: "PEDAS"
    },

    {
        id: 4,
        name: "Bakso Jumbo",
        description: "Bakso jumbo ukuran besar dan mengenyangkan.",
        price: 25000,
        image: "🍜",
        tag: "JUMBO"
    },

    {
        id: 5,
        name: "Bakso Keju",
        description: "Bakso dengan isian keju yang creamy.",
        price: 22000,
        image: "🧀",
        tag: "NEW"
    },

    {
        id: 6,
        name: "Bakso Telur",
        description: "Bakso besar dengan isian telur ayam.",
        price: 20000,
        image: "🥚",
        tag: "FAVORIT"
    },

    {
        id: 7,
        name: "Mie Ayam Bakso",
        description: "Mie ayam gurih lengkap dengan bakso.",
        price: 18000,
        image: "🍜",
        tag: "HEMAT"
    },

    {
        id: 8,
        name: "Paket Komplit",
        description: "Bakso + mie + tahu + pangsit + minuman.",
        price: 30000,
        image: "🥘",
        tag: "PAKET"
    }
];


/* =========================================
   CART
========================================= */

let cart = JSON.parse(
    localStorage.getItem("baksoCart")
) || [];


/* =========================================
   ELEMENT
========================================= */

const menuContainer =
    document.getElementById("menuContainer");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCartButton =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeModal =
    document.getElementById("closeModal");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}


/* =========================================
   RENDER MENU
========================================= */

function renderMenu() {

    menuContainer.innerHTML = "";

    menuData.forEach(item => {

        const card = document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `

            <div class="menu-image">

                <span class="menu-tag">
                    ${item.tag}
                </span>

                ${item.image}

            </div>

            <div class="menu-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description}
                </p>

                <div class="menu-bottom">

                    <span class="price">
                        ${formatRupiah(item.price)}
                    </span>

                    <button
                        class="add-cart"
                        onclick="addToCart(${item.id})"
                        aria-label="Tambah ${item.name}"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        menuContainer.appendChild(card);

    });

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const product = menuData.find(
        item => item.id === id
    );

    if (!product) return;

    const existingItem = cart.find(
        item => item.id === id
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    renderCart();

    openCart();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    renderCart();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, change) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }

    saveCart();

    renderCart();

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "baksoCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   CART TOTAL
========================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                item.price * item.quantity;

        },
        0
    );

}


/* =========================================
   CART COUNT
========================================= */

function getCartCount() {

    return cart.reduce(
        (total, item) => {

            return total + item.quantity;

        },
        0
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const count = getCartCount();

    const total = getCartTotal();

    cartCount.textContent = count;

    cartTotal.textContent =
        formatRupiah(total);

    checkoutTotal.textContent =
        formatRupiah(total);


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <p>
                    Keranjang masih kosong
                </p>

                <button
                    onclick="closeCart()"
                    class="btn btn-primary"
                >
                    Belanja Sekarang
                </button>

            </div>

        `;

        checkoutButton.disabled = true;

        checkoutButton.style.opacity = "0.5";

        return;
    }


    checkoutButton.disabled = false;

    checkoutButton.style.opacity = "1";


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.image}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatRupiah(item.price)}
                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        🗑️
                    </button>

                </div>

            </div>
        `;

        cartItems.appendChild(cartItem);

    });

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   OPEN CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong."
        );

        return;
    }

    checkoutTotal.textContent =
        formatRupiah(getCartTotal());

    checkoutModal.classList.add("active");

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

function closeCheckout() {

    checkoutModal.classList.remove("active");

}


/* =========================================
   CHECKOUT WHATSAPP
========================================= */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const address =
            document.getElementById(
                "customerAddress"
            ).value.trim();


        const payment =
            document.getElementById(
                "payment"
            ).value;


        if (
            !name ||
            !phone ||
            !address
        ) {

            alert(
                "Mohon lengkapi semua data."
            );

            return;
        }


        let message =
            `Halo Bakso Mantap! 👋%0A%0A`;

        message +=
            `Saya ingin memesan:%0A%0A`;


        cart.forEach((item, index) => {

            message +=
                `${index + 1}. ${item.name}%0A`;

            message +=
                `   ${item.quantity} x ${formatRupiah(item.price)}%0A`;

            message +=
                `   Subtotal: ${formatRupiah(
                    item.price * item.quantity
                )}%0A%0A`;

        });


        message +=
            `*Total: ${formatRupiah(
                getCartTotal()
            )}*%0A%0A`;


        message +=
            `Nama: ${name}%0A`;

        message +=
            `WhatsApp: ${phone}%0A`;

        message +=
            `Alamat: ${address}%0A`;

        message +=
            `Pembayaran: ${payment}%0A%0A`;

        message +=
            `Terima kasih 🙏`;


        /*
         * GANTI NOMOR INI
         * dengan nomor WhatsApp toko.
         *
         * Format:
         * 628xxxxxxxxxx
         *
         * Jangan gunakan + atau 0 di depan.
         */

        const whatsappNumber =
            "6285977590553";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        /*
         * Kosongkan cart setelah checkout.
         */

        cart = [];

        saveCart();

        renderCart();

        closeCheckout();

        closeCart();

        checkoutForm.reset();

    }
);


/* =========================================
   EVENT LISTENERS
========================================= */

cartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


checkoutButton.addEventListener(
    "click",
    openCheckout
);


closeModal.addEventListener(
    "click",
    closeCheckout
);


/* Klik area luar modal */

checkoutModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === checkoutModal
        ) {

            closeCheckout();

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

hamburger.addEventListener(
    "click",
    function() {

        navMenu.classList.toggle(
            "active"
        );

    }
);


/* Tutup menu ketika link diklik */

document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function() {

                navMenu.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

renderMenu();

renderCart();
