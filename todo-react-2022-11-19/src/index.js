import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        console.log(ev.target.id);
        xhttp.open("PUT", `https://cse204.work/todos/${ev.target.id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
        var data = {
            completed: ev.target.classList.contains("checked")
        }
        xhttp.send(JSON.stringify(data));
    }
}, false);

function newElement() {
    var inputValue = document.getElementById("myInput").value;
    var data = {
        text: inputValue
    }
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var todo = JSON.parse(this.responseText);
            console.log(todo);

        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };

    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
    xhttp2.send(JSON.stringify(data));
    if (inputValue === '') {
        alert("You must write something!");
    }
    document.getElementById("myInput").value = "";
    loadxmldoc();
}

function loadxmldoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("myUL").innerHTML = "";
            var todos = JSON.parse(this.responseText);
            for (let i = 0; i < todos.length; i++) {
                console.log(todos[i].text);
                var ul = document.getElementById("myUL");
                var li = document.createElement("li");
                li.setAttribute("id", todos[i].id);
                // li.setAttribute("class", todos[i].completed);
                if (todos[i].completed == true) {
                    li.classList.toggle("checked");
                }
                li.appendChild(document.createTextNode(todos[i].text));
                ul.appendChild(li);
                addclose();
                finishtodo();
            }
        }
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
    xhttp.send();
}

loadxmldoc();

function addclose() {
        var myNodelist = document.getElementsByTagName("LI");
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }
    }
    
    function finishtodo() {
        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                console.log(this.parentNode.id);
                var postid = this.parentNode.id;
                div.style.display = "none";
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                    }
                };
                xhttp.open("DELETE", `https://cse204.work/todos/${postid}`, true);
                xhttp.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
                xhttp.send();
            }
        }
    }s


