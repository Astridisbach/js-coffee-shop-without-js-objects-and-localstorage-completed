"use strict"; // Aktiverer JS-strikt mode, hvilket hjælper med at finde fejl

function addToCart(product){
    // hent nuværende værdi fra inputfeltet med specifikt id og omdan til et tal
    const quantity = parseInt(document.getElementById(product).value);

    // øg quantity med 1 - læg en til den eksisterende quantity værdi
    document.getElementById(product).value = quantity + 1;

    // Opdater totalprisen 
    // Fejl - Her skal man kalde på funktionen updateTotalPrice(product) og ikke totalPrice()
    updateTotalPrice(product);

}

function removeFromCart(product){
    // hent nuværende værdi fra inputfeltet med specifikt id og omdan til et tal
    const quantity = parseInt(document.getElementById(product).value);

    if(quantity > 0){
    // formindsk quantity med 1 - træk en fra den eksisterende quantity værdi
    document.getElementById(product).value = quantity -1;

    //Opdater totalsummen for den enkelte varer (vare = kaffe-produkt)
    updateTotalPrice(product);
    }
}

function resetCart(product){
    // sæt quantity til 0
    document.getElementById(product).value = 0;

    //Opdater totalsummen for den enkelte varer (vare = kaffe-produkt)
    updateTotalPrice(product);

}

// funktion som opdatere prisen for den enkelte vare (vare = kaffe-produkt)
function updateTotalPrice(product){
    // hent mængden (quantity) og pris-inputfeltet for den specifikke vare (vare = kaffe-produkt)
    const quantity = parseInt(document.getElementById(product).value);

    const price = parseInt(document.getElementById(product +"-price").value);

    // Beregner totalprisen for denne specifikke vare 
    const total = quantity * price;

    document.getElementById(product +"-total").value = total;

    // Opdater totalPrisen for alle vare
    totalPrice();

}

// funktion til at beregne og opdatere den samlede totalpris for alle varer i kurven
function totalPrice(){
    // variable til at holde styr på den samlede totalpris
    let totalSum = 0;

    //finder alle inputfelter der indeholde et id hvor "-total" indgår i slutningen af id tekst-strengen
    // Fejl her manglede jeg at indsætte enkelt anførelses-tegn rundt om '-total' inde i querySelectorAll
    
    const productElements = document.querySelectorAll("[id$='-total']");

    // looper gennem hvert produkt-element (coffee, espresso, americano) og lægger værdierne sammen
    productElements.forEach(productElem => {
        totalSum += parseInt(productElem.value);
    });

    document.getElementById('totalSum').value = totalSum;
}
