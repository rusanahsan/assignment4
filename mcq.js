/*
Maintain the format of the JSON file. Do not write 'Q1)' instead of 'Q01)'
for question numbers less than 10. Each key of JSON object has question
number in it in 'Q_)' format and each value if an array of two element. The
first element is a string containing the question and the second element is
an array containing the options related to the question.
*/
var question={};
var response={};
var start=document.getElementById("Start");
var grid=document.getElementById("gridc");
var mcq=document.getElementById("mcq");
var qlength=0,curr=0;
fetch('./questions.json').then(result=>result.json()).then((data)=>{question=data;});
start.onclick=function(){
    let str="";
    qlength=Object.keys(question).length;
    for(let i=1;i<=qlength;i++){
        if(i<10)
            str+=`<div class="qnum" id="q${i}">0${i}</div>`;
        else
            str+=`<div class="qnum" id="q${i}">${i}</div>`;
    }
    grid.innerHTML=str;
    curr=1;
    mcq.style.color="black";
    fetchquestion(curr);
}
var nextclick=function(){
    let b=false;
    var qnum="";
    if(curr<10)
        qnum=`0${curr}`;
    else
        qnum=""+curr;
    let options=question[`Q${qnum})`][1];
    for(let i=0;i<options.length;i++){
        if(document.getElementById(`O${i}`).checked){
            b=true;
            response[`Q${qnum})`]=`O${i}`;
            break;
        }
    }
    let qnumber=document.getElementById(`q${curr}`);
    if(b)
        qnumber.style["background-color"]="yellowgreen";
    else
        qnumber.style["background-color"]="tomato";
    curr++;
    fetchquestion(curr);
}
var prevclick=function(){
    let b=false;
    var qnum="";
    if(curr<10)
        qnum=`0${curr}`;
    else
        qnum=""+curr;
    let options=question[`Q${qnum})`][1];
    for(let i=0;i<options.length;i++){
        if(document.getElementById(`O${i}`).checked){
            b=true;
            response[`Q${qnum})`]=`O${i}`;
            break;
        }
    }
    let qnumber=document.getElementById(`q${curr}`);
    if(b)
        qnumber.style["background-color"]="yellowgreen";
    else
        qnumber.style["background-color"]="tomato";
    curr--;
    fetchquestion(curr);
}
function clearresponse(){
    let qnumber=document.getElementById(`q${curr}`);
    qnumber.style["background-color"]="whitesmoke";
    if(curr<10)
        qnum=`0${curr}`;
    else
        qnum=""+curr;
    let options=question[`Q${qnum})`][1];
    for(let i=0;i<options.length;i++){
        document.getElementById(`O${i}`).checked=false;
    }
}
function submitfinal(){
    let b=false;
    var qnum="";
    if(curr<10)
        qnum=`0${curr}`;
    else
        qnum=""+curr;
    let options=question[`Q${qnum})`][1];
    for(let i=0;i<options.length;i++){
        if(document.getElementById(`O${i}`).checked){
            b=true;
            response[`Q${qnum})`]=`O${i}`;
            break;
        }
    }
    let qnumber=document.getElementById(`q${curr}`);
    if(b)
        qnumber.style["background-color"]="yellowgreen";
    else
        qnumber.style["background-color"]="tomato";
    str=`<H1 id="m1">Your Response is recorded successfully!!!</H1>`;
    mcq.innerHTML=str;
}
function fetchquestion(num){
    var qnum="";
    if(num<10)
        qnum=`0${num}`;
    else
        qnum=""+num;
    let str=`<div id="question">Q${qnum}) ${question["Q"+qnum+")"][0]}</div>`;
    let options=question[`Q${qnum})`][1];
    for(let i=0;i<options.length;i++){
        str+=`<div class="options"><input type="radio" id="O${i}" name="qmcq" value="op${i}">${options[i]}</div>`;
    }
    str+=`<div id="clrresp" onclick="clearresponse()">Clear Response</div>`;
    if(num==1){
        if(qlength==1)
        str+=`<div class="btn-box"><button type="button" id="Submit" onclick="submitfinal()">Submit</button></div>`;
        else
            str+=`<div class="btn-box"><button type="button" id="Next">Next</button></div>`;
    }
    else if(num==qlength){
        str+=`<div class="btn-box"><button type="button" id="Prev">Back</button>
        <button type="button" id="Submit" onclick="submitfinal()">Submit</button></div>`;
    }
    else{
        str+=`<div class="btn-box"><button type="button" id="Prev">Back</button>
        <button type="button" id="Next">Next</button></div>`;
    }
    mcq.innerHTML=str;
    if(num==1)
        document.getElementById("Next").addEventListener("click",nextclick);
    else if(num==qlength){
        document.getElementById("Prev").addEventListener("click",prevclick);
    }
    else{
        document.getElementById("Next").addEventListener("click",nextclick);
        document.getElementById("Prev").addEventListener("click",prevclick);
    }
    if(response[`Q${qnum})`]){
        document.getElementById(response[`Q${qnum})`]).checked=true;
    }    
}