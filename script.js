document.addEventListener('DOMContentLoaded', () => {
    const descriptions = [
  "tres cartas consecutivas en orden ascendente",
"cuatro cartas consecutivas en orden descendente",
"tres cartas que sumen 15",
 "dos pares de cartas con el mismo número",
"una carta con cada número del 1 al 5",
"tres cartas impares consecutivas",
"tres cartas pares consecutivas",
"una carta que sea el doble de la anterior",
"una carta consecutiva que sea la mitad de la anterior",
"cuatro cartas que sumen 20",
"tres cartas en orden ascendente que sumen 10",
"tres cartas en orden descendente que sumen 9",
"dos cargas de igual número y las otras dos con igual color",
"tres cartas cuyos valores sean todos diferentes",
"cuatro cartas que suman múltiplo de 5",
"dos cartas consecutivas que sumen 8",
"tres cartas en orden ascendente cuya suma sea un múltiplo de 5",
"tres cartas en orden descendente cuya suma sea un múltiplo de 3",
"cuatro cartas consecutivas que sumen un múltiplo de 6",
"cuatro cartas consecutivas que sumen un múltiplo de 8" ,
        "todas las cartas son pares",
        "todas las cartas son impares",
        "todas las cartas verdes son mayores que las azules"
        "todas las cartas naranja son mayores que las rojas",
        "las cartas verdes son menores que las de otro color",
        "las cartas rojas son mayores que las de otro color",
        "las cartas azules suman 9",
        "todas las cartas son menores de 4",
        "las cartas verdes suman el doble que las azules",
        "hay tres cartas azules",
        "las cartas naranja suman el doble que las verdes",
        "dos carlas alternas son de color azul",
        "todas las cartas son mayores de 4",
        "las cartas rojas suman igual que las naranja",
        "las cartas naranja suman igual que las azules",
        "dos cartas alternas son pares y dos alternas son impares",
        "ningún número está repetido",
        "ningún color está repetido",
        "ningún número ni color está repetido",
        "todas las cartas suman 10",
        "todas las cartas son azules y/o rojas",
        "todas las cartas son verdes y/o naranjas",
        "hay dos cartas naranja que no son adyacentes",
        "todas las cartas suman 20",
        "dos cartas alternas son pares y dos impares",
        "todas las cartas son rojas y/o verdes",
        "las cartas naranja suman igual que las verdes",
        "hay dos cartas rojas adyacentes",
        "ningún número ni color está repetido",
        "las cartas azules suman el doble que las rojas",
        "hay dos cartas azules no adyacentes",
        "hay escalera de 4 cartas en cualquier orden. Ejm 2354",
        "hay escalera de 3 cartas seguida. Ejm 345"
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
        cardCounter.innerText = `Misiones cumplidas: ${cardCount} / ${descriptions.length + cardCount}`;
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
