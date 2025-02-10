"use strict"; // Aktiverer JS-strikt mode, hvilket hjælper med at finde fejl

let cart = [ // Opretter en indkøbskurv med et array af objekter 
    // "cart" er en global variabel, som kan tilgås alle steder i koden - man kan tage fat i den hvor end man vilk 
    {type: "Black Coffee", quantity: 0, price: 10, total: 0},
    {type: "Espresso", quantity: 0, price: 12, total: 0},
    {type: "Americano", quantity: 0, price: 15, total: 0}
];

// Gemmer kurvens indhold i browserens localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funktion henter kurvens inhold fra localStorage ved sideindlæsning
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart); // Konverterer JSON-strengen tilbage til et array 
        updateUIFromCart(); // Opdaterer UI med de hentede data
    }
}

// Denne funktion opdaterer brugergrænsefladen baseret på indholdet af kurven
function updateUIFromCart() {
    // Gennemgår hvert element i kurven
    cart.forEach( item => {
        // Henter de tilsvarende inputfelter for mængde og totalpris fra DOM'en
        let quantityField = document.getElementById(item.type);
        let totalField = document.getElementById(item.type +"-total");

        // Hvis begge felter findes i DOM'en, opdateres deres værdier
        if (quantityField && totalField) {
            quantityField.value = item.quantity;  // Opdater mængden
            totalField.value = item.total;        // Opdater totalprisen for varen
        }
    });

    // Kalder funktionen totalPrice for at opdatere den samlede pris for kurven
    totalPrice();
}

// Denne funktion tilføjer en vare til kurven (eller opdaterer den, hvis den allerede findes)
function addToCart(product) {
    // Finder varen i kurven ved at matche dens type
    let product = cart.find( item => item.type === product);

    // Hvis varen allerede findes i kurven, øges dens mængde
    if (product) {
        product.quantity++; // Øg mængden af produktet med 1
        updateTotalPrice(product); // Opdater totalprisen for produktet
        saveCartToLocalStorage(); // Gem den opdaterede kurv i localStorage
    }
}

// Denne funktion fjerner en vare fra kurven (reducerer mængden med 1)
function removeFromCart(product) {
    // Finder produktet i kurven ved at matche dets type
    let product = cart.find( item => item.type === product);
    
    // Hvis produktet findes og mængden er større end 0, reduceres mængden
    if (product && product.quantity > 0) {
        product.quantity--; // Reducer mængden af produktet med 1
        updateTotalPrice(product); // Opdater totalprisen for produktet
        saveCartToLocalStorage(); // Gem den opdaterede kurv i localStorage
    }
}

// Denne funktion nulstiller kurven og dets indhold
function resetCart(product){
    // Finder produktet i kurven ved at matche dets type
    let product = cart.find( item => item.type === product);

    if (product) {
        product.quantity = 0;
        updateTotalPrice(product); // Opdater totalprisen for produktet
        saveCartToLocalStorage(); // Gem den opdaterede kurv i localStorage
    }
}

// Denne funktion opdaterer kurvens indhold og dets samlede pris for et givent produkt
function updateTotalPrice(product) {
    // Finder produktet i kurven ved at matche dets type
    let product = cart.find( item => item.type === product);

    // Hvis produktet findes, opdateres dets totalpris baseret på mængde og pris
    if (product) {
        product.total = product.quantity * product.price;  // Beregn totalprisen for produktet

        // Opdater de relevante inputfelter for produktets mængde og totalpris i DOM'en
        document.getElementById(product).value = product.quantity;         // Opdater mængden
        document.getElementById(product + "-total").value = product.total; // Opdater totalprisen

        // Kalder totalPrice for at opdatere den samlede pris for kurven
        totalPrice();
    }
}

// Denne funktion beregner og opdaterer den samlede pris for hele kurven
function totalPrice() {
    // Brug reducer-metoden til at summere totalpriserne for alle varer i kurven
    const totalSum = cart.reduce((sum, item) => sum + item.total, 0 );

    // Opdater inputfeltet for totalprisen i DOM'en
    document.getElementById("totalSum").value = totalSum;
}

// Denne funktion nulstiller kurven og dets indhold
function resetEntireCart(){
    cart.forEach(  item => {
        item.quantity = 0;
        item.total = 0;
    });
    updateUIFromCart(product); // Opdater totalprisen for produktet
    saveCartToLocalStorage(); // Gem den opdaterede kurv i localStorage
}

