let year = 2018;

document.addEventListener('DOMContentLoaded',function(){
  const button = document.getElementById('issLoc')
  const lat = document.getElementById('latitiude');
  const lon = document.getElementById('longitude');
  const spacePeople = document.getElementById('space-people')

  const button2 = document.getElementById('number1')
  const factsTag = document.getElementById('number1-facts')

  const mathFactsTag = document.getElementById('math-facts')
  const mathFactsInput = document.getElementById('math-box')

  const yearTag = document.getElementById('year-tag')

  const numFactsUl = document.getElementById('num-facts')

  fetch('http://api.open-notify.org/astros.json')
  .then(res => res.json())
  .then(function(json){
    json.people.forEach(function(person){
      let li = document.createElement('li')
      li.innerHTML = person.name
      spacePeople.appendChild(li)
    })
  })

  button.addEventListener('click', function () { issLocation(lat,lon) })


  button2.addEventListener('click', function() {
    getNumFacts(factsTag)
  })

  mathFactsInput.addEventListener('keyup', function(){
    console.log(mathFactsInput.value)
    getMathFacts(mathFactsTag, mathFactsInput.value)
  })

  setInterval(function(){
    getYearFacts(year, yearTag)
    year--;
  },5000)

  for (var i = 1; i < 100; i++) {
    let item = document.createElement('li')
    numFactsUl.appendChild(item)
    randomNumberFacts(item)
  }


})





function issLocation(lat,lon) {
   fetch('http://api.open-notify.org/iss-now.json')
  .then(res => res.json())
  .then(function(json){
     lat.innerHTML = "latitiude: " + json.iss_position.latitude;
     lon.innerHTML = "longitude: " + json.iss_position.longitude;
   })
}

function getNumFacts(tag) {
  fetch('http://numbersapi.com/1?json')
  .then(res => res.json())
  .then(json => tag.innerHTML = json.text)
}

function getMathFacts(tag,num){
  console.log(`${num}`)
  fetch(`http://numbersapi.com/${num}/math?json`)
  .then(res => res.json())
  .then(json => tag.innerHTML = json.text)
}

function getYearFacts(year,tag) {
  fetch(`http://numbersapi.com/${year}/year?json`)
  .then(res => res.json())
  .then(json => tag.innerHTML =  `${json.text}`)
}

function randomNumberFacts(tag) {

  fetch(`http://numbersapi.com/random?json`)
  .then(res => res.json())
  .then(json => tag.innerHTML = json.text)

}
