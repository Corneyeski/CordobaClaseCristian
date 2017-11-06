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

function pitar(veces) {
    navigator.notification.beep(veces.input1);
}

function vibrar(segundos) {
    navigator.vibrate(segundos.input1*1000)
}

