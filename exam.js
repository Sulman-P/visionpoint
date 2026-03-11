function submitExam(){

let score = 0;

let q1 = document.querySelector('input[name="q1"]:checked');

if(q1 && q1.value == "12"){
score++;
}

alert("Your Score: " + score + "/1");

}
const supabaseUrl = "https://ywywxtzkoevrlekzksjb.supabase.co"
const supabaseKey = "sb_publishable_toVajlGUbsoN48mgOHPMmg_gN_lyQF0"

const supabaseClient = supabase.createClient(
supabaseUrl,
supabaseKey
)
let questions = []
let currentQuestion = 0
let answers = {}

async function loadExam(){

const examId = "YOUR_EXAM_ID"

let { data } = await supabaseClient
.from("questions")
.select("*")
.eq("exam_id", examId)

questions = data

createNavigator()

showQuestion()

}

loadExam()
function createNavigator(){

let nav = ""

questions.forEach((q,index)=>{

nav += `<button onclick="goToQuestion(${index})">${index+1}</button>`

})

document.getElementById("questionNav").innerHTML = nav

}
function showQuestion(){

let q = questions[currentQuestion]

let html = `

<h3>Question ${currentQuestion+1}</h3>

<p>${q.question}</p>

<label><input type="radio" name="answer" value="${q.option_a}"> ${q.option_a}</label><br>

<label><input type="radio" name="answer" value="${q.option_b}"> ${q.option_b}</label><br>

<label><input type="radio" name="answer" value="${q.option_c}"> ${q.option_c}</label><br>

<label><input type="radio" name="answer" value="${q.option_d}"> ${q.option_d}</label>

`

document.getElementById("questionContainer").innerHTML = html

updateProgress()

}
function nextQuestion(){

saveAnswer()

if(currentQuestion < questions.length-1){

currentQuestion++

showQuestion()

}

}

function prevQuestion(){

saveAnswer()

if(currentQuestion > 0){

currentQuestion--

showQuestion()

}

}

function goToQuestion(index){

saveAnswer()

currentQuestion = index

showQuestion()

}
function saveAnswer(){

let selected = document.querySelector('input[name="answer"]:checked')

if(selected){

answers[currentQuestion] = selected.value

}

}
function updateProgress(){

let percent = ((currentQuestion+1)/questions.length)*100

document.getElementById("progress").style.width = percent + "%"

}
let time = 900

setInterval(()=>{

time--

let minutes = Math.floor(time/60)
let seconds = time % 60

document.getElementById("timer").innerText =
minutes + ":" + seconds

if(time <= 0){

submitExam()

}

},1000)
async function submitExam(){

let score = 0

questions.forEach((q,index)=>{

if(answers[index] == q.correct){

score++

}

})

alert("Your Score: "+score+"/"+questions.length)

}
