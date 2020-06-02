var click = document.getElementById("dropdown-content");
var create_image = document.getElementById("button_create");
var section_create_video = document.getElementById("create_video");
var menu_buttons = document.getElementById("menu_buttons");
var arrow_back = document.getElementById("arrow_back");
var start_record = document.getElementById("start");
var close = document.getElementById("close");
var done = document.getElementById("done");
var delete_main = document.getElementsByClassName("main_create");
var delete_btn_decide = document.getElementsByClassName("button_decide");
var delete_title = document.getElementsByClassName("title_create");
var my_gifos = document.getElementById("my_gifos");
let delete_menu_btns = document.getElementsByClassName("buttons_take_pic");
let image_upload = document.getElementById("img_up_load");
var video_exterior;
var capture_pic;
var title_video;
var hour;
var minutes;
var seconds;
var miliseconds;
var stopwatch;
var pic_done;
var timekeeper;
var url;
var play;
var square;
var repeat;
var up_load_gif;
var preview;
var data;
var form;
var blob;
var url_img_create;

function back() {


    arrow_back.addEventListener("click", function () {

        location.href = 'index.html';

    }) || close.addEventListener("click", function () {

        location.href = 'index.html';

    })


}



function recording() {


    let modal = document.getElementById("modal");

    start_record.addEventListener("click", function () {

        delete_main[0].style.display = "none";
        delete_btn_decide[0].style.display = "none";
        delete_title[0].style.display = "none";

        modal.style.height = "548px";
        modal.style.width = "860px";

        const prueba =

            `<div class="title_video">Un chequeo Antes de Empezar<img src="./assets/button3.svg" alt=""
                        class="close_video"></div>
                <video id="video" autoplay> Video Stream not availabre.</video>
                <div class="buttons_take_pic">
                    <button class="camera_pic"><img  class="camera"src="./assets/camera.svg" alt=""></button>
                    <button class="take_pic"  id="take_pic">Capturar</button>
                </div>`

        modal.innerHTML = prueba;
        var video = document.querySelector('#video');
        var capture = document.getElementById('take_pic');



        capture_pic = capture;

        video_exterior = video;


        getStreamAndRecord();
       
    })
}

function getStreamAndRecord() {

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
                ideal: 430
            },
            width: {
                ideal: 832
            }

        }

    }).then(function (stream) {

        video_exterior.srcObject = stream;
        video_exterior.play();

        delete_elements();

       

    }).catch(function (error) {
        console.log(error.message);
    })
}


function delete_elements() {

    capture_pic.addEventListener('click', function () {

        let delete_btn_camara = document.getElementsByClassName("camera_pic");
        let delete_take_pic = document.getElementsByClassName("take_pic");

        delete_btn_camara[0].style.display = "none";
        delete_take_pic[0].style.display = "none";
       

        title_video = document.querySelectorAll('.title_video');

        var img = document.createElement("img");
        img.src = './assets/button3.svg'
        img.setAttribute('class', 'close_video');

        title_video[0].textContent = "Capturado Tu Guifo";
        title_video[0].appendChild(img);


        const new_menu_recording =

            `  <div class="timekeeper" id="timekeeper">
                <p class="timer"><span id="hour">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>:<span id="miliseconds">00</span></p>
            </div>
            <button class="recording"><img class="recording_image" src="./assets/recording_dark.svg"
                    alt=""></button>
            <button class="pic_done" id="pic_done">Listo</button>`

        delete_menu_btns[0].innerHTML = new_menu_recording;
        hour = document.getElementById("hour");
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        miliseconds = document.getElementById("miliseconds");
        pic_done = document.getElementById("pic_done");
        timekeeper = document.getElementById("timekeeper");
        
        start_recording();

    })
}


function start_recording() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(async function (stream) {
        video_exterior.muted = true;
        let recorder = RecordRTC(stream, {

            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });
        recorder.startRecording();
        start_stopwatch();
        take_picture();

        function take_picture() {

            let canvas = document.createElement('canvas'); 
            canvas.id = 'extractFileCanvas'; 
            canvas.width = 832; 
            canvas.height = 430;
            let ctx = canvas.getContext('2d'); 
            ctx.drawImage(this.video, 0, 0, 832, 430);
            data = canvas.toDataURL('image/png');

        };
       
        pic_done.addEventListener("click", function () {

            clearInterval(stopwatch);

            recorder.stopRecording(function () {


                blob = recorder.getBlob();
                form = new FormData();
                form.append('file', blob, 'myGif.gif');
               
                url = URL.createObjectURL(blob);
                video_exterior.src = url;
                video_exterior.muted = true;
                
            })

            add_timer();

        })
    }).catch(function (error) {
        console.log(error.message);
    })
}




function start_stopwatch() {

    contador_h = 0;
    contador_m = 0;
    contador_s = 0;
    contador_ml = 0;

    stopwatch = setInterval(function () {

        if (contador_ml == 60) {

            contador_ml = 0;
            contador_s++;
            seconds.innerHTML = contador_s;

            if (contador_s == 60) {


                contador_s = 0;
                contador_m++;
                minutes.innerHTML = contador_m;

                if (contador_m == 60) {



                    contador_m = 0;
                    contador_h++;
                    hour.innerHTML = contador_h;
                }
            }
        }


        miliseconds.innerHTML = contador_ml;
        contador_ml++;


    }, 10)
  
}

function add_timer() {

    let delete_recording = document.getElementsByClassName("recording");

    let pic_done = document.getElementsByClassName("pic_done");
   

    delete_menu_btns[0].removeChild(delete_recording[0]);
    delete_menu_btns[0].removeChild(pic_done[0]);


    title_video = document.querySelectorAll('.title_video');

    timekeeper.style.marginRight = "0";
    timekeeper.style.marginLeft = "11px";



    var img = document.createElement("img");
    img.src = './assets/button3.svg'

    img.setAttribute('class', 'close_video');


    title_video[0].textContent = "Vista Previa";
    title_video[0].appendChild(img);

    video.style.display = "none";

    const image_preview = ` <img  id="preview" src="" alt=preview_gifos> `

    delete_menu_btns[0].insertAdjacentHTML('beforebegin', image_preview);

    const counter_time =

        `  
    <button class="play" id="play"><img class="play_image" src="./assets/forward.svg" alt=""></button>
    <div class="counter_time">
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
       
        
    </div>
    <button class="repeat" id="repeat">Repetir Captura</button>
    <button class="up_load_gif" id="up_load_gif">Subir Guifos</button> `

    delete_menu_btns[0].insertAdjacentHTML('beforeend', counter_time);

    square = document.getElementsByClassName("square");

    play = document.getElementById("play");
    repeat = document.getElementById("repeat");
    up_load_gif = document.getElementById("up_load_gif");

    preview = document.getElementById("preview");

    preview.setAttribute('src', data);

    play.addEventListener("click", play_guifo);

    up_load_gif.addEventListener("click", up_load);

    repeat.addEventListener("click", recharge_page);

}

function recharge_page() {

    location.reload();

}



function up_load() {

    video_exterior.style.display = "none";
    delete_menu_btns[0].style.display = "none";
    preview.style.display = "none";

    var img = document.createElement("img");
    img.src = './assets/button3.svg'

    img.setAttribute('class', 'close_video');
    title_video[0].textContent = "Subiendo Guifo";

    title_video[0].appendChild(img);

    const up_gifo =
       

    `<div id="video_no" >

    <div class="container_information">    

        <img  class="world"src="./assets/globe_img.png" alt="">
        
        <p class="first_text" >Estamos subiendo tu guifo..</p>


        <div class="counter_time_2">
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
                      
        </div>

        <p class="time_left">Tiempo restante:38 años algunos minutos</p>


    </div>

</div>
<div class="buttons_take_pic">


    <button class="delete_gif" id="delete_gif">Cancelar</button>
</div>
</div> `


    modal.insertAdjacentHTML('beforeend', up_gifo);
    var delete_gif = document.getElementById("delete_gif");
    delete_gif.addEventListener("click", recharge_page);
    post_gifo(form);


}



function post_gifo(form) {
    let api_key = "pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=8&q";
    const parametros = {

        method: "POST",
        body: form,
        json: true,

    };
    fetch(`http://upload.giphy.com/v1/gifs?api_key=${api_key}`, parametros)

        .then((response) => {
            return response.json();

        }).then((response) => {

            successful_upload();
            
            url_img_create = response.data.id;
            var arr_guifos = localStorage.getItem("id_guifos");


            if (arr_guifos) {
                arr_guifos = response.data.id + "," + arr_guifos;
            } else {
                arr_guifos = response.data.id;
            }

            localStorage.setItem("id_guifos", arr_guifos);

        }).catch(error => {

            return error;
        });
}




function successful_upload() {

    let up_load_guifo = document.getElementById("video_started_4");
    let image_upload = document.getElementById("img_up_load");
    let download_gif = document.getElementById("download_gif");
    let copy_link = document.getElementById("copy_link");

    up_load_guifo.style.display = "block";

    modal.style.display = "none";

    image_upload.src = data;

    done.addEventListener("click", recharge_page);
    download_gif.addEventListener("click", download);
    copy_link.addEventListener("click", open_link);

}

function open_link() {
    window.open("https://media.giphy.com/media/" + url_img_create + "/giphy.gif");
}

function download() {

    invokeSaveAsDialog(blob);

}

var index = 0;
var colores;


function play_guifo() {

    preview.src = url;
    var int_hour = parseInt(hour.textContent);
    var int_minutes = parseInt(minutes.textContent);
    var int_seconds = parseInt(seconds.textContent);
    var int_mili = parseInt(miliseconds.textContent);
    var total_mili = ((int_seconds * 1000) + int_mili) / (square.length)

    colores = setInterval(() => {

        change_color(square);

    }, total_mili);


}



function change_color(square) {

    square[index].classList.toggle("change_color");
    index++;
    if (index >= square.length) {
        clearInterval(colores);

        change_src();

        function change_src() {

            preview.src = data;

        }
    }
}

back();

recording();