const WA = "2349069271431";

const products = [
  {id:1,n:"Birthday Bliss",p:25000,c:"birthday",i:"images/birthday-teddy-money.jpg",d:"A birthday surprise with a teddy, treats and beautiful presentation."},
  {id:2,n:"Love & Romance",p:30000,c:"romance",i:"images/rose-bouquet.jpg",d:"A romantic rose arrangement for someone special."},
  {id:3,n:"Signature Birthday Cake",p:22000,c:"cakes",i:"images/cake-white.jpg",d:"A classic birthday cake that can be personalised."},
  {id:4,n:"Money Bouquet",p:35000,c:"gifts",i:"images/money-gift-display.jpg",d:"A striking money bouquet for birthdays and celebrations."},
  {id:5,n:"Romantic Gift Box",p:40000,c:"romance",i:"images/romantic-gift-box.jpg",d:"A ready-to-gift box for a thoughtful romantic surprise."},
  {id:6,n:"Cake & Sweet Treats",p:27000,c:"cakes",i:"images/cupcakes.jpg",d:"Cake or sweet treats beautifully arranged for a celebration."},
  {id:7,n:"Balloon Birthday Surprise",p:30000,c:"birthday",i:"images/birthday-balloon-red.jpg",d:"A balloon surprise with treats for a memorable birthday."},
  {id:8,n:"Premium Surprise",p:55000,c:"gifts",i:"images/birthday-money-gift.jpg",d:"A premium combination of gifts and a beautiful surprise arrangement."},
  {id:9,n:"Celebration Cake",p:45000,c:"cakes",i:"images/celebration-cake.jpg",d:"A beautiful tiered cake for a major celebration."},
  {id:10,n:"Custom Package",p:0,c:"gifts",i:"images/birthday-balloon.jpg",d:"Tell us your budget and ideas and we will help create your package."}
];

let cart = JSON.parse(localStorage.getItem("olaitanCart") || "[]");
const money = n => "₦" + n.toLocaleString("en-NG");

function wa(message){
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(message), "_blank");
}

function render(filter="all"){
  const grid = document.querySelector("#grid");
  grid.innerHTML = products
    .filter(p => filter === "all" || p.c === filter)
    .map(p => `
      <article class="product-card">
        <div class="product-photo"><img src="${p.i}" alt="${p.n}"><span>${p.c}</span></div>
        <div class="product-info">
          <h3>${p.n}</h3>
          <p>${p.d}</p>
          <div class="product-bottom">
            <strong>${p.p ? money(p.p) : "Custom Price"}</strong>
            <button onclick="orderProduct(${p.id})">${p.p ? "Order" : "Request"}</button>
          </div>
        </div>
      </article>
    `).join("");
}

function orderProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  if(!p.p){
    document.querySelector("#custom").scrollIntoView({behavior:"smooth"});
    return;
  }
  wa(`Hello Olaitan Surprise Package! I would like to order "${p.n}" (${money(p.p)}). Please confirm availability, delivery fee and payment details.`);
}

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.f);
  });
});

document.querySelector("#customForm").addEventListener("submit", e => {
  e.preventDefault();
  const message =
`Hello Olaitan Surprise Package!
I want a custom surprise.

Name: ${document.querySelector("#name").value}
Recipient: ${document.querySelector("#recipient").value}
Occasion: ${document.querySelector("#occasion").value}
Budget: ${document.querySelector("#budget").value}
Request: ${document.querySelector("#request").value || "Not specified"}`;
  wa(message);
});

document.querySelector("#menu").addEventListener("click", () => {
  document.querySelector(".header").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".header").classList.remove("open");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
render();
