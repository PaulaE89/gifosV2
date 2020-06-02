document.getElementById("arrow_dropdown").onclick = show_hide;
document.getElementById("input_search_gifs").onkeyup = show_search;
document.getElementById("sailor_night").onclick = change_style;
document.getElementById("sailor_day").onclick = change_white;

var input_search_gifs = document.getElementById("input_search_gifs");
var click = document.getElementById("dropdown-content");
var show_result_gifs = document.getElementById("show_result_gifs");
var estilos = document.getElementById('estilos');
var tendencias_list = document.getElementById("tendencias");
var add_images = document.getElementsByClassName("add_image");


var button_search = document.getElementById("search-btn");
var section = document.getElementById("advice");
var trendings = document.getElementById("trendings");
var head_image = document.getElementsByClassName("head_image");
var all_cards = document.getElementsByClassName("all_cards");
var my_gifs = document.getElementsByClassName("title");
var create_image = document.getElementById("button_create");
var img_logo = document.getElementsByClassName("img_logo");

var gifs = 20;
var filter;


var buttons_suggestion;


function create_my_images() {
    create_image.addEventListener("click", function () {

        location.href = 'up_load.html';
    })

}

function trending() {
    const found = fetch('https://api.giphy.com/v1/stickers/trending?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=' + gifs)
        .then((response) => {
            return response.json();
        }).then((response) => {


            for (var i = 0; i < 4; i++) {

                var name_title = response.data[i].title.split("Sticker")[0];

                const cards_above =
                    `<div class="card">
              <div class="head_image">#${name_title}<img src="./assets/button3.svg" alt="" class="close"></div>
              <img src="${response.data[i].images.original.url}" alt="..." class="add_image" >
              <button class="see_more">Ver más...</button>
          </div>`

                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards_above;
                all_cards[0].append(html.body.children[0]);

                var see_more_btn = document.querySelectorAll('.see_more');
                var head_image = document.querySelectorAll('.head_image');

                see_more_btn.forEach(function (button, index) {
                    button.addEventListener("click", function () {
                        let aux = head_image[index].textContent;

                        filter = aux.substr(1);

                        filter_search();
                    });


                });
            }

            for (var i = 4; i < gifs; i++) {
                const cards =
                    `<div class="card_trending" data-id=${i}>
        <img src="${response.data[i].images.original.url}" class="img-thumbnail thumb m-r" >
         </div>`
                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards;
                tendencias_list.append(html.body.children[0]);
            }

        }).catch(error => {

            return error;
        });
}



function show_hide() {

    if (click.style.display === "none") {

        click.style.display = "block";
    } else {

        click.style.display = "none";
    }
}

function search() {


    button_search.addEventListener("click", function () {

        var new_search = input_search_gifs.value;
        if (new_search.length == 0 || new_search == null) {
            delete_information();

            const empty =
                `<div class="card_trending" data-id=${new_search.length} >
                <p> YOU MUST WRITE SOMETHING </p>
                 </div>`
            const html = document.implementation.createHTMLDocument();
            html.body.innerHTML = empty;
            tendencias_list.append(html.body.children[0]);

        } else {
            filter = new_search
            show_result_gifs.classList.remove("show-list-gifs");
            filter_search();
        }
    });

    var new_search = input_search_gifs.value;
    filter = new_search;
}

function filter_search(e) {



    fetch('https://api.giphy.com/v1/gifs/search?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=8&q=' + filter)
        .then((response) => {
            return response.json();
        }).then((response) => {

            delete_information();
            document.getElementsByName("trending_suggestion")[0].placeholder = filter;


            for (var i = 0; i < response.data.length; i++) {

                const cards =
                    `<div class="card_trending" data-id=${i}>
        <img src="${response.data[i].images.original.url}" class="img-thumbnail thumb m-r" >
         </div>`
                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards;
                tendencias_list.append(html.body.children[0]);
            }

            list_suggestion();

        }).catch(error => {

            return error;
        });
}

function delete_information() {

    var delete_element = document.querySelectorAll(".card_trending");

    for (var i = 0; i < delete_element.length; i++) {
        tendencias_list.removeChild(delete_element[i]);
    }
}



function list_suggestion() {

    fetch('https://api.giphy.com/v1/tags/related/' + filter + '?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf')
        .then((response) => {
            return response.json();
        }).then((response) => {


            delete_suggestion();

            buttons_suggestion = document.getElementById("buttons_suggestion");

            for (var i = 0; i < 3; i++) {

                const buttons =

                    ` <button class="suggestion_button"   >#${response.data[i].name}</button>`

                buttons_suggestion.insertAdjacentHTML('afterbegin', buttons);

                var suggestion_button = document.querySelectorAll(".suggestion_button");

                suggestion_button.forEach(function (button, index) {

                    button.addEventListener("click", function () {

                        let aux = suggestion_button[index].innerText;

                        filter = aux.substr(1);

                        filter_search();

                    });

                });

            }

        }).catch(error => {

            return error;

        });
}




function delete_suggestion() {


    var delete_element = document.querySelectorAll(".suggestion_button");

    for (var i = 0; i < delete_element.length; i++) {

        buttons_suggestion.removeChild(delete_element[i]);
        delete_element[i].innerText = " ";

        
    }

}


function show_search(e) {

    let glass = document.getElementById("glass");

    if (e.target.value.length > 2) {
        show_result_gifs.classList.add("show-list-gifs");

        button_search.classList.remove("button_search");

        button_search.classList.add("button_search_on");

        glass.classList.add("glass");

        show_result_gifs.addEventListener('focusout', (event) => {


            show_result_gifs.classList.remove("show-list-gifs");
        });

    } else {

        show_result_gifs.classList.remove("show-list-gifs");

        button_search.classList.remove("button_search_on");

        glass.classList.remove("glass");

    }
}

function change_style() {
    estilos.href = './css/style_nigth.css ';

}

function change_white() {

    estilos.href = './css/style.css';
}


function open_page() {

    my_gifs[0].addEventListener("click", function () {

        var delete_bar = document.getElementById("search_gifs");

        document.getElementsByName("suggestion")[0].placeholder = "Mis guifos";

        all_cards[0].style.display = "none";

        delete_bar.style.display = "none";

        trendings.style.display = "none";

        up_load_guifos();


    });
}


function up_load_guifos() {

    my_gifs[0].disabled = true;

    let myGuifosLocalStorage = localStorage.getItem("id_guifos");
    myGuifosLocalStorage = myGuifosLocalStorage.split(",");

    const main =

        `<div class="card_tendencias" id="tendencias">  `

    section.insertAdjacentHTML('beforeend', main);

    for (let i = 0; i < myGuifosLocalStorage.length; i++) {
        // let llaves = localStorage.key(i);
        let urls = myGuifosLocalStorage[i];

        const cards =
            `  
        <div class="card_trending"  data-id=${i}>
<img    class="my_gifos"  src="https://media.giphy.com/media/${urls}/giphy.gif" class="img-thumbnail thumb m-r"  >
</div>`

        var tendencias = document.getElementById("tendencias");
        tendencias.insertAdjacentHTML('afterbegin', cards);

    }

}


function trending_search() {

    let common_searchs = document.querySelectorAll('.button_search');

    common_searchs.forEach(function (button, index) {
        button.addEventListener("click", function () {


            filter = common_searchs[index].textContent;
            filter_search();
        });
    });

}

trending();
search();
open_page();
trending_search();
create_my_images();