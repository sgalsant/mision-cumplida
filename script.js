document.addEventListener('DOMContentLoaded', () => {
    const descriptions = [
    "Jugar dos cartas consectivas con el mismo número.",
    "Jugar tres cartas con el mismo número.",
    "Jugar dos cartas consecutivas con el mismo color.",
    "Jugar tres cartas con el mismo color.",
    "Jugar dos cartas con números consecutivos.",
    "Jugar tres cartas con números consecutivos.",
    "Jugar dos cartas con el mismo número y color.",
    "Jugar tres cartas con el mismo número y color.",
    "Jugar dos cartas con números que sumen 10.",
    "Jugar tres cartas con números que sumen 15.",
    "Jugar dos cartas con números pares.",
    "Jugar tres cartas con números pares.",
    "Jugar dos cartas con números impares.",
    "Jugar tres cartas con números impares.",
    "Jugar dos cartas rojas consecutivas.",
    "Jugar dos cartas azules consecutivas.",
    "Jugar dos cartas verdes consecutivas.",
    "Jugar dos cartas amarillas consecutivas.",
    "Jugar tres cartas de colores diferentes.",
    "Jugar tres cartas en orden ascendente.",
    "Jugar tres cartas en orden descendente.",
    "Jugar dos cartas con una diferencia de 2 entre sus números.",
    "Jugar dos cartas con una diferencia de 3 entre sus números.",
    "Jugar tres cartas de colores diferentes y números consecutivos.",
    "Jugar dos cartas de colores diferentes y el mismo número.",
    "Jugar tres cartas en orden ascendente y del mismo color.",
    "Jugar tres cartas en orden descendente y del mismo color.",
    "Jugar dos cartas que sumen 8.",
    "Jugar dos cartas que sumen 12.",
    "Jugar tres cartas que sumen 18.",
    "Jugar tres cartas que sumen 9.",
    "Jugar dos cartas del mismo número y diferente color.",
    "Jugar tres cartas del mismo número y diferente color.",
    "Jugar dos cartas en orden ascendente y diferente color.",
    "Jugar dos cartas en orden descendente y diferente color.",
    "Jugar dos cartas impares consecutivas.",
    "Jugar dos cartas pares consecutivas.",
    "Jugar tres cartas en secuencia con números primos.",
    "Jugar tres cartas consecutivas cuyos números sumen un múltiplo de 5.",
    "Jugar tres cartas consecutivas cuyos números sumen un múltiplo de 3."
    ];

    const cardContainer = document.getElementById('card-container');
    const historyList = document.getElementById('history-list');
    const cardCounter = document.getElementById('card-counter');
    const undoButton = document.getElementById('undo-button');

    let cardCount = 0;
    let historyStack = [];

    function getRandomDescription() {
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions.splice(randomIndex, 1)[0];
    }

    function updateCardCounter() {
        cardCounter.innerText = `Misiones cumplidas: ${cardCount}`;
  /*      if (descriptions.length == 0) {
            alert ("enhorabuena has completado " + cardCount + " misiones" );
        }
        */
    }

    function createCard(i) {
        const initialDescription = getRandomDescription();
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>Misión ${i}</h3>
            <p>${initialDescription}</p>
        `;

        card.addEventListener('click', () => {
                     
            
            if (  card.dataset.accomplished == "true") return;
            

                const oldDescription = card.querySelector('p').innerText;
                card.dataset.accomplished = descriptions.length == 0;
                const newDescription = descriptions.length == 0? "misión cumplida": getRandomDescription();
                card.querySelector('p').innerText = newDescription;
                
               
                
                
                const historyItem = {
                    card: card,
                    oldDescription: oldDescription,
                    newDescription: newDescription
                };
                historyStack.push(historyItem);

                const historyListItem = document.createElement('li');
                historyListItem.innerText = oldDescription;
                historyList.insertBefore(historyListItem, historyList.firstChild);
            
             
            cardCount++;
            updateCardCounter();
            
        });

        cardContainer.appendChild(card);
    }

    function undoLastChange() {
        if (historyStack.length > 0) {
            const lastChange = historyStack.pop();
            lastChange.card.dataset.accomplished = false;
            lastChange.card.querySelector('p').innerText = lastChange.oldDescription;
            descriptions.push(lastChange.newDescription);

            historyList.removeChild(historyList.firstChild);

            cardCount--;
            updateCardCounter();
        } else {
            alert("No hay cambios que deshacer.");
        }
    }

    for (let i = 1; i <= 4; i++) {
        createCard(i);
    }

    updateCardCounter();

    undoButton.addEventListener('click', undoLastChange);
});
