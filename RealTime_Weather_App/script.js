// Select the DOM elements that will be updated with the weather data
const tempField = document.querySelector(".temperature"); // Element displaying the temperature
const weatherImage = document.querySelector(".weather-main img"); // Element for the weather condition icon
const weatherLocation = document.querySelector(".weather-details .location"); // Element for location name
const weatherTime = document.querySelector(".weather-details .time"); // Element for the time
const weatherCondition = document.querySelector(".weather-details .condition"); // Element for weather condition text
const form = document.querySelector(".search-form"); // Form element for searching a location
const searchInput = document.querySelector(".searchInput"); // Input field for entering location

let target = "Bangalore"; // Default location to fetch weather for

// Function to fetch weather data from the API
async function fetchData(target) {
  try {
    // Dynamically set the URL using the target location and the API key
    let url = `http://api.weatherapi.com/v1/current.json?key=7cc1b76a53b14ce18f5163541241511&q=${target}&aqi=yes`;

    // Fetch the data from the API
    const response = await fetch(url);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for ${target}`);
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Extract relevant data fields from the response
    let currentTemp = data.current.temp_c; // Current temperature in Celsius
    let currentCondition = data.current.condition.text; // Current weather condition
    let locationName = data.location.name; // Location name
    let localTime = data.location.localtime; // Local time at the location
    let conditionEmoji = data.current.condition.icon; // URL of the condition icon

    // Debug logs for inspecting fetched data
    console.log(currentTemp, currentCondition, locationName, localTime, conditionEmoji);

    // Call the function to update the DOM with the extracted data
    updateDOM(currentTemp, locationName, localTime, conditionEmoji, currentCondition);
  } catch (error) {
    // Handle any errors that occur during the fetch process
    console.error("Error fetching weather data:", error);
  }
}

// Event listener for form submission (to search for a different location)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from reloading the page
  target = searchInput.value.trim(); // Get the user input and trim any whitespace

  // If the user input is not empty, fetch weather data for the new location
  if (target) {
    fetchData(target); // Fetch data for the entered location
  }
});

// Function to update the DOM with the fetched weather data
function updateDOM(temp, locationName, time, emoji, condition) {
  console.log(time); // Debug log for the time data

  // Extract the exact time and date from the response
  const exactTime = time.split(" ")[1]; // Time part (HH:MM)
  const exactDate = time.split(" ")[0]; // Date part (YYYY-MM-DD)

  // Get the full name of the day (e.g., "Monday") based on the day number
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  console.log(exactDay); // Debug log for the day of the week

  // Update the DOM elements with the fetched weather data
  tempField.textContent = `${temp}°C`; // Set the temperature text
  weatherImage.src = emoji; // Set the weather icon source
  weatherLocation.innerHTML = `📍 <strong>${locationName}</strong>`; // Set the location text
  weatherTime.textContent = `🕒 ${exactTime} ${exactDay} ${exactDate}`; // Set the time and date
  weatherCondition.textContent = condition; // Set the weather condition text
}

// Function to get the full name of a day (Sunday, Monday, etc.) based on its number (0-6)
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown Day"; // Default in case the number is not valid
  }
}

// Initial fetch call to load weather data for the default location
fetchData(target);
