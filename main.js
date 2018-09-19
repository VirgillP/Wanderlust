// Foursquare API Info
const clientId = 'VGGBM0TPN0TRV55CCE50W3LX1HJNO2UQVBKVXZ5W5JHPO0YL';
const clientSecret = 'BCXSQGTPFEHVXDJ4UN3T2FPV4NJRZUCQQI2ST3NULSDBMRSU';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '13ea018f40964133a87160210181909';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=13ea018f40964133a87160210181909&q=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  //try catch block
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);//keep an eye on this syntax
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
     return venues;//and this one too...
    }
  }catch(error){
    console.log(error);
  }
  //End of catch try code block
}//End of getVenues function

const getForecast = async () => {
  const urlToFetch =`${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
try{
const response = await fetch(urlToFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const days = jsonResponse.forecast.forecastday;
    return days;
  }
} //End of try block
  catch(error){
    console.log(error);
  }//End of catch block
}//End of getForecast async function


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venues, index) => {
    // Add your code here:
const venue = venues [index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
$venues.append(venueContent);;
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
const currentDay = days[index];

    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
