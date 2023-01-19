console.log("wel come..");




const form = document.querySelector("form");
const btn = document.querySelector("button")
const input = document.getElementById("inp")
const massageOne = document.getElementById("massageOne")
const massageTwo = document.getElementById("massageTwo")

form.addEventListener("submit",(e)=>{
        e.preventDefault();
    const inputValuee = input.value;
    massageOne.textContent = "Loading . . . "
    fetch("http://localhost:8000/weather?search="+inputValuee).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            return massageOne.textContent = data.error;
        }else{

            console.log(data);
            console.log( data.forecast);
          return  massageOne.textContent = "Here In " +data.location +" . "+ "Weather is " + data.forecast;

        }
    })
})


})


