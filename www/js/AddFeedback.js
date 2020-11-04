var restaurant
var service_Rating = 5
var cleanliness_Rating = 5
var food_Quality_Rating = 5
let feedback

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
    content += ` <p class="h5 text-center"> Add feedback</p> <p class="h5 text-center">for restaurant ` + restaurant.restaurant_Name + `</p>`
    document.getElementById("content").innerHTML = content
    document.getElementById("inputName").innerHTML = `<label>Restaurant Name:</label>
            <input type="text" value="` + restaurant.restaurant_Name + `" class="form-control text-dark border py-4" disabled>`
    document.getElementById("inputType").innerHTML = `<label>Restaurant type:</label>
            <input type="text" value="` + restaurant.restaurant_type + `" class="form-control text-dark border py-4" disabled>`

}
function renderServiceStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= service_Rating) {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setServiceRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
        }
    }
    return star
}
function renderCleanlinessStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= cleanliness_Rating) {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setCleanlinessRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
        }
    }
    return star
}
function renderFoodQualityStar() {
    let star = ''
    for (let i = 1; i <= 5; i++) {
        if (i <= food_Quality_Rating) {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star" style="font-size:xx-large;color:#0099FF"></i>`
        } else {
            star += `<i onclick="setFoodQualityRating(` + i + `)" class="fa fa-star-o" style="font-size:x-large;color:#0099FF"></i>`
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
                    <p class="col-6">Food Quality Rating:</p>
                    <div class="col-6">
                        <p>`+ renderServiceStar() + `</p>
                    </div>
                </div>
                <div class="row">
                    <p class="col-6">Cleanliness Rating:</p>
                    <div class="col-6">
                        <p>`+ renderCleanlinessStar() + `</p>
                    </div>
                </div>
                <div class="row">
                    <p class="col-6">Service Rating:</p>
                    <div class="col-6">
                        <p>`+ renderFoodQualityStar() + `</p>
                    </div>
                </div>
                `
}
function pushData() {
    var user = firebase.auth().currentUser;
    let reporter = document.getElementById("Reporter").value
    let name = restaurant.restaurant_Name
    let type = restaurant.restaurant_type
    let price = document.getElementById("price").value
    let time_visit = document.getElementById("time_visit").value
    let notes = document.getElementById("note").value

    if (validateInput(reporter, time_visit, price)) {
        feedback = {
            "assessor": {
                "name": reporter,
                "email": user.email
            },
            "restaurant_Name": name,
            "restaurant_type": type,
            "Foo_Quality_Rating": food_Quality_Rating,
            "cleanliness_Rating": cleanliness_Rating,
            "service_Rating": service_Rating,
            "time_visit": time_visit,
            "note": notes,
            "price": price,
            "created_date": new Date().toDateString()
        }
        document.getElementById("Add_Feedback").setAttribute("data-toggle", "modal");
        document.getElementById("Add_Feedback").setAttribute("data-target", "#exampleModal");
        document.getElementById("addConfirm").innerHTML = `
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="exampleModalLabel">Response by `+ reporter + `</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th scope="row">Restaurant Name</th>
                                        <td>`+ name + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Restaurant type</th>
                                        <td>`+ type + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date and time of the visit</th>
                                        <td>`+ time_visit + `</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Average meal price per person</th>
                                        <td>`+ price + `</td>
                                    </tr>
                                    <tr>    
                                        <th scope="row">Service rating</th>
                                        <td>`+ service_Rating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Cleanliness rating</th>
                                        <td>`+ cleanliness_Rating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Food quality rating</th>
                                        <td>`+ food_Quality_Rating + ` <i class="fa fa-star" style="font-size:20px;color:#0099FF"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Notes</th>
                                        <td>`+ notes + `</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onclick="addData()" type="button" class="btn btn-primary">Add Feedback</button>
                        </div>
                    </div>
                </div>
            </div>`
    }
}

function addData() {
    db.collection("feedback").add(feedback)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            ref = db.collection("restaurant").doc(restaurant.restaurant_Name)
            ref.update({
                feedback: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            }).then(function () {
                console.log((restaurant.Foo_Quality_Rating + feedback.Foo_Quality_Rating) / 2)
                console.log((restaurant.cleanliness_Rating + feedback.cleanliness_Rating) / 2)
                console.log((restaurant.service_Rating + feedback.service_Rating) / 2)
                db.collection("restaurant").doc(restaurant.restaurant_Name).update({
                    "Foo_Quality_Rating": (restaurant.Foo_Quality_Rating + feedback.Foo_Quality_Rating) / 2,
                    "cleanliness_Rating": (restaurant.cleanliness_Rating + feedback.cleanliness_Rating) / 2,
                    "service_Rating": (restaurant.service_Rating + feedback.service_Rating) / 2,
                })
                    .then(function () {
                        alert('Your response has been sent')
                        window.location.href = "Home.html"
                    });

            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


    
}

function validateInput(reporter, time_visit, price) {
    let arr = []
    let errorMessage = ''
    if (!reporter) arr.push('Name of the reporter')
    if (!time_visit) arr.push('Date and time of the visit')
    if (!price) arr.push('Average meal price per person')
    if (!reporter || !time_visit || !price) {
        arr.forEach(element => {
            errorMessage += (element + ' \n \ ')
        });
        alert('You must input all field: \n \ ' + errorMessage)
        return false
    } else return true
}