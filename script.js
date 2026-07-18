


// ===============================
// SHOPVERSE PREMIUM SCRIPT
// ===============================

// ===============================
// GANTI NOMOR WHATSAPP DI SINI
// ===============================
const nomorWA = "6282326973449"; // Ganti dengan nomor WA kamu

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = cart.reduce((a,b)=>a+b.harga,0);

// ===============================
// Loading Screen
// ===============================
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if(loader){
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            },500);
        }
    },800);
});

// ===============================
// Tambah Keranjang
// ===============================


   function addCart(nama,harga){

    cart.push({
        nama:nama,
        harga:harga
    });

    total += harga;

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCart();

    const cartBtn = document.getElementById("cartButton");
const badge = document.getElementById("cart-count");

// Keranjang goyang
cartBtn.classList.add("cart-shake");
badge.classList.add("badge-pop");

setTimeout(()=>{
    cartBtn.classList.remove("cart-shake");
    badge.classList.remove("badge-pop");
},600);

// Icon terbang
const fly = document.createElement("div");
fly.className = "fly-cart";
fly.innerHTML = "🛒";

fly.style.left = (window.innerWidth/2)+"px";
fly.style.top = (window.innerHeight/2)+"px";

document.body.appendChild(fly);

const rect = cartBtn.getBoundingClientRect();

setTimeout(()=>{
    fly.style.left = rect.left+"px";
    fly.style.top = rect.top+"px";
    fly.style.opacity = "0";
    fly.style.transform = "scale(.2)";
},10);

setTimeout(()=>{
    fly.remove();
},900);

    Swal.fire({
        icon:"success",
        title:"Berhasil",
        text:nama + " berhasil ditambahkan ke keranjang",
        timer:1500,
        showConfirmButton:false
    });

}

// ===============================
// Update Keranjang
// ===============================



    function updateCart(){

    const cartItems=document.getElementById("cartItems");
    const totalHarga=document.getElementById("totalHarga");
    const cartCount=document.getElementById("cart-count");

    if(!cartItems || !totalHarga || !cartCount){
        return;
    }

    cartItems.innerHTML="";

    if(cart.length===0){

        cartItems.innerHTML="Belum ada produk";

    }else{

        cart.forEach((item,index)=>{

            cartItems.innerHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0">

                <div>
                    <b>${item.nama}</b><br>
                    Rp ${item.harga.toLocaleString()}
                </div>

                <button class="hapus-btn"
                onclick="hapusItem(${index})">
                ✖
                </button>

            </div>
            `;

        });

    }

    totalHarga.innerHTML=total.toLocaleString();

    cartCount.innerHTML=cart.length;

    localStorage.setItem("cart",JSON.stringify(cart));

}

// ===============================
// Hapus Produk
// ===============================
function hapusItem(index){
    total-=cart[index].harga;
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

}

// ===============================
// Tombol Keranjang
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

    const cartButton=document.getElementById("cartButton");
    const cartBox=document.getElementById("cart");

    if(cartButton && cartBox){

        cartButton.onclick=()=>{

            if(cartBox.style.display==="block"){
                cartBox.style.display="none";
            }else{
                cartBox.style.display="block";
            }

        };

    }

    updateCart();

});

// ===============================
// Checkout WhatsApp
// ===============================
function checkoutWA(){

    if(cart.length==0){

        Swal.fire({
            icon:"warning",
            title:"Berhasil",
            text:"Silahkan tambahkan produk terlebih dahulu",
            timer:1500,
            showConfirmButton: false
            });

        return;

    }

    let pesan="Halo Admin,%0A%0ASaya ingin memesan:%0A%0A";

    cart.forEach((item)=>{

        pesan+=`• ${item.nama} - Rp ${item.harga.toLocaleString()}%0A`;

    });

    pesan+=`%0ATotal : Rp ${total.toLocaleString()}`;

    window.open(`https://wa.me/${nomorWA}?text=${pesan}`);

}

// ===============================
// Beli Langsung
// ===============================
function buyNow(nama,harga){

let pesan=`Halo Admin,%0A%0ASaya ingin membeli:%0A%0A${nama}%0AHarga : Rp ${harga.toLocaleString()}`;

window.open(`https://wa.me/${nomorWA}?text=${pesan}`);

}

// ===============================
// Tombol Hubungi Kami
// ===============================
function openWA(){

window.open(`https://wa.me/${nomorWA}`);

}

// ===============================
// Popup QRIS
// ===============================
function showQRIS(){

document.getElementById("popupQRIS").style.display="flex";

}

function closeQRIS(){                               

document.getElementById("popupQRIS").style.display="none";

}

// ===============================
// Dark Mode
// ===============================
document.addEventListener("DOMContentLoaded",()=>{

    const darkBtn = document.getElementById("darkMode");

if(darkBtn){
    darkBtn.onclick = () => {
        document.body.classList.toggle("dark");
    };
}
    updateCart();
    window.onload = () => {
        updateCart();
    }

});
// ===============================
// Tutup Popup Klik Luar
// ===============================
window.onclick=function(e){

let popup=document.getElementById("popupQRIS");

if(e.target==popup){

popup.style.display="none";

}
}
