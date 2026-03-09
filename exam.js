function submitExam(){

let score = 0;

let q1 = document.querySelector('input[name="q1"]:checked');

if(q1 && q1.value == "12"){
score++;
}

alert("Your Score: " + score + "/1");

}
