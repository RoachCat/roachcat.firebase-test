const product = document.getElementById("product")
const model = document.getElementById("model")
const price = document.getElementById("price")
const type = document.getElementById("type")
const sendButton = document.getElementById("send-button")
const elements = document.getElementById("elements")
const getElements = document.getElementById("get-elements")
const db = firebase.firestore()
const productsCollection = db.collection("products").doc("rCgSY3dkHmn7CIJyNUzf")
sendButton.addEventListener("click", createCollection)
getElements.addEventListener("click", getCollection)

function createCollection() {
    if (
        product.value !== "" && product.value !== null &&
        model.value !== "" && model.value !== null &&
        price.value !== "" && price.value !== null &&
        type.value !== "" && type.value !== null
    ) {
        productsCollection.collection("bikes").add({
            bike: product.value,
            model: model.value,
            price: price.value,
            type: type.value
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            product.value = ""
            model.value = ""
            price.value = ""
            type.value = ""
        alert("Datos enviados satisfactoriamente")
    } else {
        alert("¡Todos los campos deben estar llenos!")
    }
}

function getCollection() {
    productsCollection.collection("bikes").get().then((querySnapshot) => {
        let arrayOfBikes = []
        querySnapshot.forEach((doc) => {
            const bike = doc.data()
            arrayOfBikes.push(bike)
        });
        const template =
            arrayOfBikes.map(bike => {
                return `
                <p><strong>Marca: </strong>${bike.bike}</p>
                <p><strong>Tipo: </strong>${bike.type}</p>
                <p><strong>Modelo: </strong>${bike.model}</p>
                <p><strong>Precio: </strong>${bike.price}</p>
                -------------------------------------------------
                `
            }).join('')
        elements.innerHTML = template
    });
}
