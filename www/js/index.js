/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var check = false;
var guardar;
var guardarFinal = 10;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("boton").addEventListener("click", vibrar, false);


        document.getElementById("pitar").addEventListener("click",showPromtPitar,false)
        document.getElementById("vibrar").addEventListener("click",showPromtVibrar,false)

        var watchID;
        var options = {
            frequency: 1000
        };
        watchID = navigator.compass.watchHeading(onSuccess, onError, options);

        document.getElementById("norte").addEventListener("click",showNorte,false)
        document.getElementById("rotar").addEventListener("click",rotar,false)
        document.getElementById("guardar").addEventListener("click",guardarFunction,false)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function showPromtPitar() {
    navigator.notification.prompt(
        'Numero de pitidos?',  // message
        pitar,                  // callback to invoke
        'pitidos',            // title
        ['Ok','Exit'],             // buttonLabels
        0                 // defaultText
    );
}

function showPromtVibrar() {
    navigator.notification.prompt(
        'Segundos vibrando?',  // message
        vibrar,                  // callback to invoke
        'vibrando',            // title
        ['Ok','Exit'],             // buttonLabels
        0                 // defaultText
    );
}
function rotar() {
    navigator.notification.prompt(
        'Numero de grados a rotar?',  // message
        rotacion,                  // callback to invoke
        'grados a rotar',            // title
        ['Ok','Exit'],             // buttonLabels
        0                 // defaultText
    );
}

function guardarFunction() {
    guardarFinal = guardar
}

function pitar(veces) {
    navigator.notification.beep(veces.input1);
}

function vibrar(segundos) {
    navigator.vibrate(segundos.input1*1000)
}
function rotacion(grados) {
   /* document.getElementById("brujula").style["-ms-transform"] = "rotate("+grados.input1+")deg"
    document.getElementById("brujula").style["-webkit-transform"] = "rotate("+grados.input1+")deg"
    document.getElementById("brujula").style.transform = "rotate("+grados.input1+")deg"*/
    document.getElementById("brujula").style.transition = "transform 5s";
    document.getElementById("brujula").style.transform = "rotate("+grados.input1+"deg)"
    //document.getElementById("brujula").style.transform =  "rotate(7deg)"
}

function showNorte() {
    if(check){
        check = false
    }else {
        check = true
    }
}

function onSuccess(heading) {
    console.log('Heading: ' + heading.magneticHeading);
    if(check){
        document.getElementById("nort").innerHTML = heading.magneticHeading
        check = false;document.getElementById("brujula").style.transition = "transform 5s";
        document.getElementById("brujula").style.transform = "rotate("+heading.magneticHeading+"deg)"
    }
    guardar = heading.magneticHeading

    console.log("llego guardarFinal " + guardarFinal + " guardar " + guardar + " heading " + heading.magneticHeading)
    if(guardarFinal == heading.magneticHeading){
        navigator.vibrate(1000)
    }
};
function onError(compassError) {
    alert('Compass error: ' + compassError.code);
};
