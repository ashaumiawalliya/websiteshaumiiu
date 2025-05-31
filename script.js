const product  = [ 
    {
        id : "1",
        name : "Sea Star Bracelet",
        desk : "Gelang bertema laut dengan aksen bintang laut dan manik biru-putih. Memberi kesan segar dan tenang, pas untuk pecinta nuansa oceanic.",
        price : 6000,
        image : "https://i.pinimg.com/736x/e3/c3/7b/e3c37b0bbd2dc3bb49ac2ef6e715116e.jpg"
    }, 
    {
        id : "2",
        name : "Cherry Lady Bracelet",
        desk : "Gelang ceria dengan perpaduan manik merah dan hijau serta elemen buah ceri. Manis dan girly, cocok untuk gaya playful sehari-hari.",
        price : 7000,
        image : "https://i.pinimg.com/736x/33/d3/87/33d387e2202737fcde39be8e71c8980b.jpg"
    },
    {
        id : "3",
        name : "Fluttershy Bracelet",
        desk : "Gelang pastel dengan karakter imut dan hiasan bunga mini. Desainnya unik dan whimsical, pas untuk kamu yang suka gaya yang beda dan berwarna.",
        price : 8000,
        image :  "https://i.pinimg.com/736x/78/ae/18/78ae18b52323aa8717a607a1ca6cf7c8.jpg"
    },
    {
        id : "4",
        name : "Butterfie Bracelet",
        desk : "Gelang kupu-kupu dengan manik-manik pastel bening yang lembut. Desainnya manis dan feminin, cocok untuk tampilan kasual yang anggun.",
        price : 7000,
        image : "https://i.pinimg.com/736x/92/49/4a/92494adb2f0073f2f97db04b370707d3.jpg"
    },
    {
        id : "5",
        name : "Lowkey Bracelet",
        desk : "Gelang simpel dengan manik bening dan liontin kecil. Gaya minimalis yang elegan, cocok untuk kamu yang suka tampilan lowkey tapi tetap stylish.",
        price : 7000,
        image : "https://i.pinimg.com/736x/54/6b/17/546b171ae743531eef8f10bff5ae6c23.jpg" 
    },
    {
        id : "6",
        name : "Fairytale Bracelet",
        desk : "Gelang bertema dongeng dengan bunga pastel dan aksen daun hijau. Tampilannya lucu dan dreamy, cocok untuk penggemar gaya fantasi.",
        price : 8000,
        image : "https://i.pinimg.com/736x/d0/09/ab/d009abf0168c7efa09aaa958a1445045.jpg" 
    },
];

const divContainer = document.getElementById("product-list");
const cart = [];

product.forEach(function(produk){
    const divCard = document.createElement("div");
    divCard.className = "product-card";
    divCard.innerHTML = ` 
        <img src="${produk.image}" width="100">
        <h2>${produk.name}</h2>
        <p><i>${produk.desk}</i></p>
        <p>Harga : Rp. ${produk.price.toLocaleString()}</p>
        <button onclick="tambahkeranjang('${produk.id}')">Add to cart</button>
    `;
    divContainer.append(divCard);
});

function tambahkeranjang(id){
    let produk_yg_dipilih = product.find(product => product.id === id);
    let produk = {
        id : produk_yg_dipilih.id,
        name : produk_yg_dipilih.name,
        price : produk_yg_dipilih.price,
        quantity : 1
    }

    let produk_ada = cart.find(item => item.id === id);
    if (produk_ada){
        produk_ada.quantity +=1;
    } else {
        cart.push(produk);
    }

    updateKeranjang();
}
function tambahQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
        updateKeranjang();
    }
}

function kurangiQuantity(id) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1); // Hapus dari keranjang jika quantity = 0
        }
        updateKeranjang();
    }
}

function updateKeranjang() {
    let cart_items = document.getElementById("cart-items");
    cart_items.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <b>${item.name}</b>
            <p>Rp.${item.price.toLocaleString()} x ${item.quantity} pcs</p>
            <div style="display:flex; gap: 8px; align-items:center;">
            <button onclick="kurangiQuantity('${item.id}')">-</button>
            <span>${item.quantity}</span>
            <button onclick="tambahQuantity('${item.id}')">+</button>
        </div>
            <p>Total : Rp.${(item.price * item.quantity).toLocaleString()}</p>
            <hr>
        `;
        cart_items.appendChild(div);

        total += item.price * item.quantity;
    });

    // Tambahkan elemen total belanja
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
        <h3>Total Belanja: Rp.${total.toLocaleString()}</h3>
    `;
    cart_items.appendChild(totalDiv);

    // Tambahkan tombol checkout jika belum ada
    if (!document.getElementById("checkout-button")) {
        const buttonCheckout = document.createElement("button");
        buttonCheckout.id = "checkout-button";
        buttonCheckout.textContent = "Checkout";
        buttonCheckout.onclick = checkoutwa;
        cart_items.appendChild(buttonCheckout);
    }
}

function checkoutwa(){
    let pesan = "Halo kak, saya pesan:%0A";
    let total = 0
   cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        pesan += `- ${item.name} (${item.quantity} pcs): Rp.${subtotal.toLocaleString()}%0A`;
    });

    // Tambahkan total keseluruhan di akhir
    pesan += `%0ATotalnya : Rp.${total.toLocaleString()}`;

    const urlWa = `https://wa.me/6285155066540?text=${pesan}`;
    window.open(urlWa, "_blank");
}
