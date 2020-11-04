
db = firebase.firestore();
var arrType = []
var data = []
var dataSearch
function logOut() {
    firebase.auth().signOut();
    window.location.href = "SignInScreen.html";
}

class Restaurant {
    constructor(restaurant_Name, restaurant_type, Foo_Quality_Rating, cleanliness_Rating, service_Rating) {
        this.restaurant_Name = restaurant_Name;
        this.restaurant_type = restaurant_type;
        this.Foo_Quality_Rating = Foo_Quality_Rating;
        this.cleanliness_Rating = cleanliness_Rating;
        this.service_Rating = service_Rating;
    }
    toString() {
        return this.restaurant_Name + ', ' + this.restaurant_type + ', ' + this.Foo_Quality_Rating + ', ' + this.cleanliness_Rating + ', ' + this.service_Rating
    }
}

var restaurantConverter = {
    toFirestore: function (restaurant) {
        return {
            restaurant_Name: restaurant.restaurant_Name,
            restaurant_type: restaurant.restaurant_type,
            Foo_Quality_Rating: restaurant.Foo_Quality_Rating,
            cleanliness_Rating: restaurant.cleanliness_Rating,
            service_Rating: restaurant.service_Rating,
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Restaurant(data.restaurant_Name, data.restaurant_type, data.Foo_Quality_Rating, data.cleanliness_Rating, data.service_Rating)
    }
}
function openSearch(){
    var elem = document.getElementById("search"); 
    var pos = 0;
    let widthInput = 0
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 220) {
            clearInterval(id);
        } else if (pos >= 50){
            widthInput++
            elem.innerHTML = `<input autofocus type="text "  id="inputSearch" style="border: none;  width: 0px; background-color: #DDDDDD" placeholder="Search.." onfocusout="closeSearch()" > <i class="fa fa-search "></i>`
            if (widthInput >= 180) {
                widthInput = 180
            }
            document.getElementById("inputSearch").style.width = widthInput + "px";
            pos++;
            elem.style.width = pos + "px";
            elem.style.backgroundColor = "#DDDDDD"

        }
        else {
            pos++;
            elem.style.width = pos + "px";
            elem.style.backgroundColor = "#DDDDDD"
        }
    }
}
function closeSearch(){
    var elem = document.getElementById("search");
    var pos = 220;
    let widthInput = 180;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 40) {
            elem.innerHTML = `<i class="fa fa-search rounded-circle shadow p-2 " onclick="openSearch()"></i>`
            elem.style.backgroundColor = "White"
            clearInterval(id);
        } 
        else {
            pos--;
            widthInput--;
            document.getElementById("inputSearch").style.width = widthInput + "px";
            elem.style.width = pos + "px";
            elem.style.backgroundColor = "#DDDDDD"
        }
    }
}
function goToDetail(i) {
    console.log(data[i])
    localStorage.setItem('detailRestaurant', JSON.stringify(data[i]));
    window.location.href = "DetailRestaurant.html";
}

function viewData(){
    var content = ''
    let i = 0
    data.forEach(restaurant => {
        content +=
            `<div  class="card mx-auto mt-3" style="width: 95%;"  onclick="goToDetail(`+i+`)">
            <div id="carousel`+ i +`" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carousel`+ i +`" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel`+ i +`" data-slide-to="1"></li>
                    <li data-target="#carousel`+ i +`" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active" >
                        <img src="`+ restaurant.images[0] +`"
                            class="d-block" alt="..." height = 200px width = 100% >
                        <div class="carousel-caption  d-md-block">
                            <h3>`+ restaurant.restaurant_Name + `</h3>
                            <p>`+ restaurant.restaurant_type +`</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="`+ restaurant.images[1] +`""
                            class="d-block " alt="..." height = 200px width = 100% >
                        <div class="carousel-caption d-md-block">
                             <h3>`+ restaurant.restaurant_Name + `</h3>
                            <p>`+ restaurant.restaurant_type +`</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="`+ restaurant.images[2] +`""
                            class="d-block" alt="..." height = 200px width = 100% >
                        <div class="carousel-caption d-md-block">
                            <h3>`+ restaurant.restaurant_Name +`</h3>
                            <p>`+ restaurant.restaurant_type+`</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousel`+ i +`" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel`+ i +`" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <table class="table table-borderless">
                <tbody>
                    <tr>
                        <th scope="row">Food Quality Rating</th>
                        <td>`+ renderStar(restaurant.Foo_Quality_Rating) +`</td>
                    </tr>
                    <tr>
                        <th scope="row">Cleanliness Rating</th>
                        <td>`+ renderStar(restaurant.cleanliness_Rating) +`</td>
                    </tr>
                    <tr>
                        <th scope="row">Service Rating</th>
                        <td>`+ renderStar(restaurant.service_Rating) +`</td>
                    </tr>
                </tbody>
            </table>
        </div>`
        i++
    })
    document.getElementById("content").innerHTML = content
}
function renderStar(rating){
    let render = ''
    rating = rating.toString();
    let natural
    let decimal
    if (rating.length >2){
        natural = parseInt(rating.slice(0, rating.indexOf("freetuts.net") - 1))
        decimal = parseInt(rating.slice(rating.indexOf("freetuts.net")))
    }else{
        natural = rating
        decimal = 0
    }
    for ( var i = 1; i <= 5; i++) {
        if (natural >= i){
            render += `<i id="star`+i+`" class="fa fa-star" style="font-size:20px;color:#0099FF"></i>`
        } else if (natural + 1 == i && decimal > 0){
                render += `<i class="fa fa-star-half-empty" style="font-size:20px;color:#0099FF"></i>`
            
        }else if(natural < i){
            render += `<i id="star` + i +`"class="fa fa-star-o" style="font-size:20px;color:#0099FF"></i>`
        }
    }
    return render
}

function getData() {
    db.collection("restaurant").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        viewData()
    });
}
getData()

function search(arr){
    if (arr.length == 0){
        getData()
    }else{
        data = []
        var citiesRef = db.collection("restaurant");
        var query = citiesRef.where('restaurant_type', 'in', arr);
        query.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    data.push(doc.data());
                });
                viewData()
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    
}
function searchType(element){
    arrType.push(element.innerHTML)
    element.disabled = true;
    search(arrType);
    renderSelectSearch();
}

function closeSelectSearch(id){
    id.disabled = false;
    arrType.splice(arrType.indexOf(id.innerHTML), 1)
    renderSelectSearch();
    search(arrType);
}
function renderSelectSearch(){
    var innerHTMLSearch = ''

    arrType.forEach(element => {
        let id = element.replace(" ", "_");
        innerHTMLSearch += `
        <div class="col-auto py-2 m-2" style="border-radius: 99px; background-color: #9C9C9C; width: 30%;">
            <div class="row justify-content-between">
                <p class="col-auto text-white m-0 p-0 pl-2">`+ element + `</p>
                <div class=" col-3 p-0 bg-light rounded-circle text-center mr-2">
                    <i  onclick="closeSelectSearch(`+ id + `)" class="fa fa-close  p-0 " style="color:#9C9C9C"></i>
                </div>
            </div>
        </div>`
    });
    document.getElementById("selectSearch").innerHTML = innerHTMLSearch
}

function addData() {
    var citiesRef = db.collection("restaurant");
    citiesRef.doc("DowntownCafe").set({
        Foo_Quality_Rating: 5,
        cleanliness_Rating: 5,
        restaurant_Name: "Downtown Cafe",
        restaurant_type: "Eating",
        service_Rating: 5,
        images: ["https://firebasestorage.googleapis.com/v0/b/i-rate-9ef0b.appspot.com/o/images%2FDowntownCafe1.jpg?alt=media&token=10962407-3b2b-4b80-85b0-781d1cdd30ab",
            "https://firebasestorage.googleapis.com/v0/b/i-rate-9ef0b.appspot.com/o/images%2FDowntownCafe2.jpg?alt=media&token=0bc335dc-16fc-4555-b7d3-c49c61da12cf",
            "https://firebasestorage.googleapis.com/v0/b/i-rate-9ef0b.appspot.com/o/images%2FDowntownCafe3.jpg?alt=media&token=faa666af-3c97-4a2b-bc66-b52d55be5e8a"
        ]
    });
}