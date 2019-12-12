// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener('load', function() {
   const button = document.querySelector('#formSubmit');
   function validate(event) {
      event.preventDefault()
      let readyToLaunch = false;
      const launchStatus = document.querySelector(`#launchStatus`)
      const faultyItems = document.querySelector(`#faultyItems`)
      const selectors = ['pilotName', 'copilotName', 'fuelLevel', 'cargoMass'];
   
      for(let i = 0; i < selectors.length; i++) {
         const element = document.querySelector(`#${selectors[i]}`)
         if (selectors[i] === 'pilotName'){
            if (typeof element.value === 'string' && element.value.length > 0) {
               document.querySelector(`#pilotStatus`).innerHTML = element.value
               readyToLaunch = true;
            }else {
               alert(' You have tried to enter invalid information')
            }
         }
         if (selectors[i] === 'copilotName') {
            if (typeof element.value === 'string' && element.value.length > 0) {
               document.querySelector(`#copilotStatus`).innerHTML = element.value
               if(readyToLaunch !== false) readyToLaunch = true;
            }else {
               readyToLaunch = false;
               alert(' You have tried to enter invalid information')
            }
         } 
         if (selectors[i] === 'fuelLevel' ) {
            const readyStatus = 'Fuel level high enough for launch'

            if (isNaN(element.value)) {
               alert(' You have tried to enter invalid information')
            }else if (element.value < 10000) {
               faultyItems.style.visibility = 'visible'
               document.querySelector(`#fuelStatus`).innerHTML = 'Not enough fuel for the journey'
               launchStatus.innerHTML = 'Shuttle not ready for launch'
               launchStatus.style.color = 'red'
               readyToLaunch = false;
            }
            else {
               if(readyToLaunch !== false) readyToLaunch = true;
            }   
         }
         if (selectors[i] === 'cargoMass' ) {
            const readyStatus = 'Cargo mass low enough for launch'

            if (isNaN(element.value) && element.value === '') {
               alert('All fields are required')
            }else if (isNaN(element.value) && element.value.length > 0) {
               alert(' You have tried to enter invalid information')
            }else if (element.value > 10000) {
               faultyItems.style.visibility = 'visible'
               document.querySelector(`#cargoStatus`).innerHTML = 'Too much mass for the shuttle to take off'
               launchStatus.innerHTML = 'Shuttle not ready for launch'
               launchStatus.style.color = 'red'
               readyToLaunch = false;
            }
            else {
               if(readyToLaunch !== false) readyToLaunch = true;
            }
         }
         if(readyToLaunch) {
            launchStatus.innerHTML = 'Shuttle is ready for launch'
            launchStatus.style.color = 'green'
         }
      }
   }

   button.addEventListener("click", validate);

   fetch("https://handlers.education.launchcode.org/static/planets.json")
      .then(response => {
         return response.json(); 
      })
      .then(response => {
         const destination = response[0]
         const target = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${destination.name}</li>
            <li>Diameter: ${destination.diameter}</li>
            <li>Star: ${destination.star}</li>
            <li>Distance from Earth: ${destination.distance}</li>
            <li>Number of Moons: ${destination.moons}</li>
         </ol>
         <img src="${destination.image}"></img>`
         document.querySelector('#missionTarget').innerHTML = target
      })
});
