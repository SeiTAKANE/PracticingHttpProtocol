//XMLHTTPRequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//get
var xhr = new XMLHttpRequest();
xhr.open("GET","/json",true);
xhr.onload = function(){
    if(xhr.status === 200){
        console.log(JSON.parse(xhr.responseText));
    }
};

xhr.setRequestHeader("Myheader","Headervalue")
xhr.send();

//post
var xhr = new XMLHttpRequest();
xhr.open("POST","/json",true);
xhr.onload = function(){
    if(xhr.status === 200){
        console.log(JSON.parse(xhr.responseText));
    }
};

xhr.send("hello world!!");

//Fetch 
const response = await fetch("news.json",{
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
        'Content-Type':'application/json'
    }
});

console.log(response.status);
if(response.ok){
    const json = await response.json();
    console.log(json);
};

//create  and analyzing query parametars
const params = new URLSearchParams();
params.set("name","恵比寿東公園");
params.append("hasTokyo","true");
console.log(params.toString());//name=%E6%81%B5%E6%AF%94%E5%AF%BF%E6%9D%B1%E5%85%AC%E5%9C%92&hasTokyo=true

//Sending Body
//app/x-www-form-urlencoded
const form = new URLSearchParams();
form.set("title","The Art of Community");
form.set("author","Sei Takane")

const res = await fetch("/post", {
    method: "POST",
    body: form
});

//multipart/form-data
const form = new FormData();
form.set("title","The Art of Community");
form.set("author","Sei Takane")

const content = "hello world";
const blob = new Blob([content],{type: "text/plain"});
form.set("attachment-file",blob,"test.txt");

const res = await fetch("/post", {
    method: "POST",
    body: form
});

//json
const res = await fetch("/post", {
    method: "POST",
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        "title":"I am Hello",
        "author": "Supermon"
    })
});


//downloading files
const res = await fetch("http://tako.example.com", {
    headers:{
        Authorization: "Basic XXXX"
    }
});
if(res.ok){
    const anchor = document.createElement("a");
    anchor.hfef = URL.createObjectURL(await res.blob())
    anchor.download = "tako.json"
    document.body.appendChild(anchor);
    anchor.click();
    URL.revokerObjectURL(anchor.href);
    document.body.removeChild(anchor);
}

//Server-sent Event
const evtSource = new EventSource("ssedemo.php");

//event handlor
evtSource.onmessage =(e)=>{
    const newElement = document.createElement("li");
    newElement.innerHTML = "message: " + e.data;
    ecentList.appendChild(newElement);
};

evtSource.addEventListener("ping", (e) =>{
    const newElement = document.createElement("li");

    const obj = JSON.parse(e.data);
    newElement.innerHTML = "ping at" + obj.time;
    addEventListener.appendChild(newElement);
}, false);

//WebSocket
var socket = new WebSocket('ws://game.example.com:12010/updates');
socket.onopen = ()=>{
    setInterval(()=>{
        if(socket.bufferedAmout === 0){
            socket.send(getUpdateData());
        }
    }, 50);
};