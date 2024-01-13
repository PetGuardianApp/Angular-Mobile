// http://localhost:4200/assets/pet-finder/?petId=KMbT71hK87FAiQcgK4yo
// https://petguardian-mobile.web.app//assets/pet-finder/?petId=KMbT71hK87FAiQcgK4yo

const currentUrl = window.location.href;
var latitude = "";
var longitude = "";

// GEOLOCATE USER:
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    },
    function () {
      latitude = 0;
      longitude = 0;
    }
  );
} else {
  latitude = 0;
  longitude = 0;
}

const queryParameters = getQueryParameters(currentUrl);
const petId = queryParameters['petId'];
const getPetUrl = 'https://petguardian-api.uc.r.appspot.com/pet/find/' + petId;
const getOwnerUrl = 'https://petguardian-api.uc.r.appspot.com/client/find/';

fetch(getPetUrl)
  .then(response => { return response.json(); }).then(petInfo => {
    fetch(getOwnerUrl + petInfo.client_id)
      .then(response => { return response.json(); }).then(ownerInfo => {
        console.log("Pet Info: ", petInfo);
        console.log("Owner Info: ", ownerInfo);

        putPetInfo(petInfo);
        putOwnerInfo(ownerInfo);

        initOwnerMap(parseFloat(ownerInfo.address.latitude), parseFloat(ownerInfo.address.longitude));

        getUbiName(petInfo, ownerInfo);
      });
  });


// ***************** FUNCTIONS *****************
function getUbiName(petInfo, ownerInfo) {
  // Example usage
  const currentTime = getCurrentTime();

  if (latitude == 0 && longitude == 0) {
    patchNotification("Someone scanned your pet " + petInfo.name + " at " + currentTime + " but we couldn't get the location.", ownerInfo.id);
  } else {
    // Call maps API to obtain the name of the ubication
    notificationPayload = "";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAouWao_x1bulJ9RkrfYpYP49u2a9RzSXw`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const direccion = data.results[0].formatted_address;
          notificationPayload = "Someone scanned your pet " + petInfo.name + " in " + direccion + " at " + currentTime;
        } else {
          notificationPayload = "Someone scanned your pet " + petInfo.name + " at " + currentTime + " but we couldn't get the location.";
        }

        patchNotification(notificationPayload, ownerInfo.id);
      });
  }
}

function patchNotification(notification, ownerId) {
  console.log("Notification to patch: ", notification);
  const patchUrl = 'https://petguardian-api.uc.r.appspot.com/client/add/' + ownerId + '/notification';
  fetch(patchUrl, {
    method: 'PUT',
    body: notification
  });
}

function getQueryParameters(url) {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return {};
  }

  const parameters = {};
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    parameters[key] = decodeURIComponent(value || '');
  }

  return parameters;
}

function putPetInfo(petInfo) {
  const dates = Object.keys(petInfo.weight);
  dates.sort((a, b) => new Date(b) - new Date(a));
  const lastW = petInfo.weight[dates[0]];

  document.getElementById("petName").innerHTML = petInfo.name;
  document.getElementById("petNameInf").innerHTML = petInfo.name;
  document.getElementById("bDate").innerHTML = formatDate(petInfo.birth);
  document.getElementById("petTypeBreed").innerHTML = petInfo.type + ", " + petInfo.breed;
  document.getElementById("petWeight").innerHTML = lastW + "g";
  document.getElementById("petHeight").innerHTML = petInfo.height + "cm";
  document.getElementById("petImage").src = petInfo.profile_image;
}

function putOwnerInfo(ownerInfo) {
  document.getElementById("ownerName").innerHTML = ownerInfo.name;
  document.getElementById("ownerMail").innerHTML = ownerInfo.email;
  document.getElementById("ownerPhone").innerHTML = ownerInfo.phone;
  document.getElementById("ownerImage").src = ownerInfo.profile_image;
}

function formatDate(date) {
  const parts = date.split('_');
  const datePart = parts[0];
  const timePart = parts[1];
  const dateObject = new Date(
    datePart.slice(4, 8),
    parseInt(datePart.slice(2, 4)) - 1,
    datePart.slice(0, 2),
    ...timePart.split(':')
  );

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

  return formattedDate;
}

function initOwnerMap(ownerLatitude, ownerLongitude) {
  const myLatLng = { lat: ownerLatitude, lng: ownerLongitude };
  const map = new google.maps.Map(document.getElementById('ownerMapDiv'), {
    center: myLatLng,
    zoom: 13
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Ensure hours and minutes have two digits
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  // Format the time in 24-hour format
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}
