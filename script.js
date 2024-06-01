document.addEventListener('DOMContentLoaded', () => {
    const descriptions = [
  "Juega tres cartas consecutivas en orden ascendente",
"Juega cuatro cartas consecutivas en orden descendente",
"Juega tres cartas que sumen 15",
"Juega dos pares de cartas con el mismo número",
"Juega una carta con cada número del 1 al 5",
"Juega tres cartas impares consecutivas",
"Juega tres cartas pares consecutivas",
"Juega una carta que sea el doble de la anterior",
"Juega una carta que sea la mitad de la anterior",
"Juega cuatro cartas que sumen 20",
"Juega tres cartas en orden ascendente que sumen 10",
"Juega tres cartas en orden descendente que sumen 9",
"Juega dos cartas con el mismo número y dos con números consecutivos",
"Juega tres cartas cuyos valores sean todos diferentes",
"Juega cuatro cartas que sumen 24",
"Juega dos cartas que sumen 8",
"Juega tres cartas en orden ascendente cuya suma sea un múltiplo de 5",
"Juega tres cartas en orden descendente cuya suma sea un múltiplo de 3",
"Juega cuatro cartas consecutivas que sumen un múltiplo de 6",
"Juega cuatro cartas consecutivas que sumen un múltiplo de 8",
        "Juega tres cartas consecutivas que sumen un número par.",
    "Juega tres cartas consecutivas que sumen un número impar.",
    "Juega dos cartas con el mismo número y dos cartas con el mismo color.",
    "Juega dos cartas cuyo producto sea 6",
    "Juega tres cartas del mismo número y de distinto color.",
    "Juega dos cartas del mismo color seguidas de dos cartas de diferente color.",
    "Juega tres cartas consecutivas del mismo color.",
    "Juega tres cartas consecutivas del mismo número.",
    "Juega tres cartas consecutivas del mismo color en orden ascendente.",
    "Juega tres cartas consecutivas del mismo color en orden descendente.",
    "Juega dos cartas que sumen 6 y dos cartas que sumen 7.",
    "Juega dos cartas que sumen 5 y dos cartas que sumen 7.",
    "Juega tres cartas consecutivas que sumen un número primo.",
    "Juega tres cartas consecutivas que sumen un cuadrado perfecto.",
    "Juega tres cartas consecutivas que sumen un cubo perfecto.",
    "Juega dos cartas del mismo número seguidas de dos cartas del mismo color diferentes.",
    "Juega tres cartas del mismo número seguidas de una carta del mismo color.",
    "Juega dos cartas del mismo número seguidas de una carta del mismo color seguidas de una carta de diferente color.",
    "Juega tres cartas cuyo valor sea mayor al doble del valor de la carta anterior.",
    "Juega tres cartas cuyo valor sea menor a la mitad del valor de la carta anterior."
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
