var  question = document.getElementById("question");
var  answers  = document.getElementById("answers");
var  prev     = document.getElementById("prev");
var  next     = document.getElementById("next");
var choose    = document.querySelector(".list-group-item");
var nowQuestion = 0;
var clicked = false;

next.addEventListener("click",Next);
prev.addEventListener("click",Prev);


async function getQuestion  (id=0){
  let url = '../quiz.json';
  let response = await fetch(url);
  let data = await response.json();
  return typeof data.data[id] != "undefined" ? data.data[id] : null ;
}



function Next() {

  let nextDataId = document.getElementById("next").getAttribute("data-id");
  
  getQuestion(nextDataId).then(data=>{ 

    if( data ){

      question.innerText=data.Question;
      let html='';
      data.Answers.forEach((element,index) => {
        html += `<li class="choose list-group-item" data-id="${index}">${element}</li>`;
      });

      answers.innerHTML=html;
      nowQuestion+=1
      next.setAttribute("data-id",+nextDataId+1);
      prev.setAttribute("data-id",+nextDataId-1);
      clicked = false;

    }else{
      question.innerText='';
      answers.innerHTML='';
    }


   })
  
}


function Prev() {

  let prevDataId = document.getElementById("prev").getAttribute("data-id");
  if( prevDataId >= 0 ){
    getQuestion(prevDataId).then(data=>{ 

      if( data ){
  
        question.innerText=data.Question;
        let html='';
        data.Answers.forEach((element,index) => {
          html += `<li class="choose list-group-item" data-id="${index}">${element}</li>`;
        });
  
        answers.innerHTML=html;
        nowQuestion-=1
        prev.setAttribute("data-id",+prevDataId-1);
        next.setAttribute("data-id",+prevDataId+1);
        clicked = false;
  
      }else{
        question.innerText='';
        answers.innerHTML='';
      }
  
  
     })
  }else{
    alert("no question");
  }
  

  
}





getQuestion(0).then(data=>{ 
  if( data ){
    question.innerText=data.Question;
    let html='';
    data.Answers.forEach((element,index) => {
      html += `<li class="choose list-group-item" data-id="${index}">${element}</li>`;
    });
    answers.innerHTML = html;
  }else{
    question.innerText='';
    answers.innerHTML='';
  }
 });




  const card = document.getElementById('answers');
  document.addEventListener('click',Choose);

function Choose(e) {
  if( clicked ){
    return;
  }

  if (e.composedPath().includes(card)) {
    
    var trueAnswer = e.target.getAttribute('data-id');
    var li = e.target;

    var tumLi = document.querySelectorAll('.choose');
    
    getQuestion(nowQuestion).then(data =>{
      let reply = data.Reply;
      clicked = true;
     
      if ( trueAnswer == reply ) { 
        
        li.classList.add("bg-success");
        
      } else {
              
        li.classList.add("bg-danger");

        tumLi.forEach((element,index) => {
            if( index == reply ){
              element.classList.add("bg-success");
            }
        });

      }
  
    })

  } else {
    return
    
  }
 
  
  
}