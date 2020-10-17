var restaurant
var service_Rating = 5
var cleanliness_Rating = 5
var food_Quality_Rating = 5

db = firebase.firestore();
function init() {
    restaurant = JSON.parse(localStorage.getItem('detailRestaurant'))
    renderRestaurant();
    renderRating()
}
init()
function goBack() {
    window.history.back();
}
function renderRestaurant() {
    let content = ''
    content += ` <p class="h5 text-center"> Add feedback for restaurant</p> <p class="h5 text-center">` + restaurant.restaurant_Name + `</p>`
    document.getElementById("content").innerHTML = content
    document.getElementById("inputName").innerHTML = `<label>Restaurant Name:</label>
            <input type="text" value="` + restaurant.restaurant_Name + `" class="form-control" disabled>`
    document.getElementById("inputType").innerHTML = `<label>Restaurant type:</label>
            <input type="text" value="` + restaurant.restaurant_type + `" class="form-control" disabled>`

}
function renderServiceStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= service_Rating) {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star" style="font-size:20px;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star-o" style="font-size:20px;color:#0099FF"></i>`
        }
    }
    return star
}
function renderCleanlinessStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= cleanliness_Rating) {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star" style="font-size:20px;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star-o" style="font-size:20px;color:#0099FF"></i>`
        }
    }
    return star
}
function renderFoodQualityStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= food_Quality_Rating) {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star" style="font-size:20px;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star-o" style="font-size:20px;color:#0099FF"></i>`
        }
    }
    return star
}
function setServiceRating(i) {
    service_Rating = i
    renderRating()
}
function setCleanlinessRating(i) {
    cleanliness_Rating = i
    renderRating()
}
function setFoodQualityRating(i) {
    food_Quality_Rating = i
    renderRating()
}
function renderRating() {
    document.getElementById("renderStar").innerHTML = `<div class="row">
                    <p class="col-6">Food Quality Rating</p>
                    <div class="col-6">
                        <p>`+ renderServiceStar() + `</p>
                    </div>
                </div>
                <div class="row">
                    <p class="col-6">Cleanliness Rating</p>
                    <div class="col-6">
                        <p>`+ renderCleanlinessStar() + `</p>
                    </div>
                </div>
                <div class="row">
                    <p class="col-6">Service Rating</p>
                    <div class="col-6">
                        <p>`+ renderFoodQualityStar() + `</p>
                    </div>
                </div>
                `
}


// function pushData(){
//     // var cityRef = db.collection('cities').doc('BJ');

//     // var setWithMerge = cityRef.set({
//     //     capital: false
//     // }, { merge: true })

//     // setWithMerge
//         // .then(function () {
//         //     console.log("Document successfully written!");
//         // })
//         // .catch(function (error) {
//         //     console.error("Error writing document: ", error);
//         // });

//     // var washingtonRef = db.collection("cities").doc("DC");

//     // // Atomically add a new region to the "regions" array field.
//     // washingtonRef.update({
//     //     regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
//     // }).then(function () {
//     //     console.log("Document successfully written!");
//     // })
//     //     .catch(function (error) {
//     //         console.error("Error writing document: ", error);
//     //     });

// }

function pushData() {
    var user = firebase.auth().currentUser;
    console.log(user.email)
    let reporter = document.getElementById("Reporter").value
    let name = restaurant.restaurant_Name
    let price = document.getElementById("price").value
    let time_visit = document.getElementById("time_visit").value
    let notes = document.getElementById("note").value
    alert("Hello! I am an alert box!");
    // let feedback = {
    //     "assessor": {
    //         "name": reporter,
    //         "email": user.email
    //     },
    //     "Foo_Quality_Rating": food_Quality_Rating,
    //     "cleanliness_Rating": cleanliness_Rating,
    //     "service_Rating": service_Rating,
    //     "time_visit": time_visit,
    //     "note": notes,
    //     "price": price
    // }
    // ref = db.collection("restaurant").doc(name)
    // ref.update({
    //     feedback: firebase.firestore.FieldValue.arrayUnion(feedback)
    // }).then(function () {
    //     console.log("Document successfully written!");
    // })
    //     .catch(function (error) {
    //         console.error("Error writing document: ", error);
    //     });
}