/*HTML Elements*/
const product = document.getElementById("product")
const model = document.getElementById("model")
const price = document.getElementById("price")
const type = document.getElementById("type")
const sendButton = document.getElementById("send-button")
const elements = document.getElementById("elements")
const getElements = document.getElementById("get-elements")
const hideElementsButton = document.getElementById("hide-elements")
const spinner = document.getElementById("spinner")
sendButton.addEventListener("click", createCollection)
getElements.addEventListener("click", getCollection)
hideElementsButton.addEventListener("click", hideElements)
/*Firebase Elements*/
const db = firebase.firestore()
const productsCollection = db.collection("products").doc("rCgSY3dkHmn7CIJyNUzf")
let thereIsData = true

function createCollection() {
    if (
        product.value !== "" && product.value !== null &&
        model.value !== "" && model.value !== null &&
        price.value !== "" && price.value !== null &&
        type.value !== "" && type.value !== null
    ) {
        const docId = productsCollection.collection('bikes').doc();
        docId.set({
            bike: product.value,
            model: model.value,
            price: price.value,
            type: type.value,
            id: docId.id
        })
            .then((docRef) => {
                getCollection()
                alert("Datos enviados satisfactoriamente")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        product.value = ""
        model.value = ""
        price.value = ""
        type.value = ""
    } else {
        alert("¡Todos los campos deben estar llenos!")
    }
}

function getCollection() {
    thereIsData = false
    if (!thereIsData) {
        elements.innerHTML = ""
        spinner.style.display = "block"
    }
    productsCollection.collection("bikes").get().then((querySnapshot) => {
        let arrayOfBikes = []
        querySnapshot.forEach((doc) => {
            const bike = doc.data()
            arrayOfBikes.push(bike)
        });
        thereIsData = true
        if (thereIsData) {
            spinner.style.display = "none"
        }
        printElements(arrayOfBikes)
    });
}

function printElements(arrayOfBikes) {
    const template =
        arrayOfBikes.map(bike => {
            return `
        <div>
        <p><strong>Marca: </strong>${bike.bike}</p>
        <p><strong>Tipo: </strong>${bike.type}</p>
        <p><strong>Modelo: </strong>${bike.model}</p>
        <p><strong>Precio: </strong>${bike.price}</p>
        <button class="delete-button" id="${bike.id}">Eliminar producto</button>
        <br>
        -------------------------------------------------
        </div>
        `
        }).join('')
    elements.innerHTML = template
    handleDeleteEvent()
}

function handleDeleteEvent() {
    const deleteButtons = document.querySelectorAll(".delete-button")
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            productsCollection.collection("bikes").doc(button.id).delete().then(() => {
                getCollection()
                alert("Elemento borrado satisfactoriamente.");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        })
    })
}

function hideElements() {
    elements.innerHTML = ""
}

