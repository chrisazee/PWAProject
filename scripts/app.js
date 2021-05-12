// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//         navigator.serviceWorker
//             .register("/serviceWorker.js")
//             .then((res) => console.log("service worker registered"))
//             .catch((err) => console.log("service worker not registered", err));
//     });
// }

const container = document.querySelector(".container");
const Cars = [
  { name: "A-Klasse", image: "images/MBA1.jpg" },
  { name: "A-Klasse Berline", image: "images/MBA2.jpg" },
  { name: "B-Klasse", image: "images/MBB1.jpg" },
  { name: "EQC", image: "images/MBEQC.jpg" },
  { name: "C-Klasse Berline", image: "images/MBC1.jpg" },
  { name: "C-Klasse Break", image: "images/MBC2.jpg" },
  { name: "C-Klasse Coupé", image: "images/MBC3.jpg" },
  { name: "C-Klasse Cabriolet", image: "images/MBC4.jpg" },
  { name: "CLA Coupé", image: "images/MBCLA1.jpg" },
  { name: "CLA Shouting Brake", image: "images/MBCLA2.jpg" },
  { name: "CLS", image: "images/MBCLS.jpg" },
  { name: "E-Klasse Berline", image: "images/MBE1.jpg" },
  { name: "E-Klasse Break", image: "images/MBE2.jpg" },
  { name: "E-Klasse Coupé", image: "images/MBE3.jpg" },
  { name: "E-Klasse Cabriolet", image: "images/MBE4.jpg" },
  { name: "G-Klasse", image: "images/MBG.jpg" },
  { name: "GLA", image: "images/MBGLA.jpg" },
  { name: "EQA", image: "images/MBEQA.jpg" },
  { name: "GLB", image: "images/MBGLB.jpg" },
  { name: "GLC SUV", image: "images/MBGLC.jpg" },
  { name: "GLC Coupé", image: "images/MBGLC2.jpg" },
  { name: "GLE SUV", image: "images/MBGLE.jpg" },
  { name: "GLE Coupé", image: "images/MBGLE2.jpg" },
  { name: "GLS", image: "images/MBGLS.jpg" },
  { name: "S-Klasse Berline", image: "images/MBS1.jpg" },
  { name: "S-Klasse Coupé", image: "images/MBS2.jpg" },
  { name: "S-Klasse Cabriolet", image: "images/MBS3.jpg" },
  { name: "SLC", image: "images/MBSLC.jpg" },
  { name: "V-Klasse", image: "images/MBV.jpg" },
  { name: "EQV", image: "images/MBEQV.jpg" },
  { name: "X-Klasse", image: "images/MBX.jpg" },
  { name: "AMG GT Coupé", image: "images/AMGGT.jpg" },
  { name: "AMG GT Roadster", image: "images/AMGRoad.jpg" },
  { name: "AMG GT4-Door Coupé", image: "images/AMGGT4.jpg" },
];

const showCars = () => {
  let output = "";
  Cars.forEach(
    ({ name, image }) =>
      (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" href="/testrit.html">Win testrit</a>
                </div>
                `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCars);

window.addEventListener("load", function () {
  console.log("Loaded.");

  // Service Worker registreren.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log("Registerd:", registration);
      })
      .catch((error) => console.log(error));
  } else {
    console.log("No service worker support in this browser.");
  }

  // Click events opvangen.
  document
    .querySelector("#btnGrantPermission")
    .addEventListener("click", function () {
      console.log("clicked");

      // Controleer of notifications mogelijk zijn met deze browser...
      if (!("Notification" in window)) {
        console.log("Notifications are not supported by your browser.");
      } else {
        if (Notification.permission == "granted") {
          console.log("Permission granted before.");
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission == "granted") {
              console.log("Permission granted.");
            }
          });
        } else {
          console.log("Permission denied. No Notifications will be send.");
        }
      }
    });

  document
    .querySelector("#btnShowNotification")
    .addEventListener("click", function () {
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then((registration) => {
          // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
          registration.showNotification("MB Testrit!", {
            vibrate: [
              300, 100, 100, 50, 100, 50, 100, 100, 150, 250, 100, 700, 200,
              150, 200,
            ],
            body: "Bericht is verstuurd naar één van onze werknemers!",
            icon: "/images/icons/brand.png",
            actions: [
              { action: "go", title: "Ga naar de officiële website.." },
              { action: "noGo", title: "Scroll verder op huidige website" },
            ],
          });

          console.log("New notification was send.");
        });
      }
    });


    document
    .querySelector("#btnShowNotificationWedstrijd")
    .addEventListener("click", function () {
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then((registration) => {
          // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
          registration.showNotification("MB ewaa!", {
            vibrate: [
              300, 100, 100, 50, 100, 50, 100, 100, 150, 250, 100, 700, 200,
              150, 200,
            ],
            body: "Uw deelname is bevestigd!",
            icon: "/images/icons/brand.png",
            actions: [
              { action: "go", title: "Ga naar de officiële website.." },
              { action: "noGo", title: "Scroll verder op huidige website" },
            ],
          });

          console.log("New notification was send.");
        });
      }
    });
});

function validate() {
  if (document.myForm.Firstname.value == "") {
    alert("Please provide your name!");
    document.myForm.Firstname.focus();
    return false;
  }
  // if (document.myForm.Lastname.value == "") {
  //   alert("Please provide your Email!");
  //   document.myForm.Lastname.focus();
  //   return false;
  // }
  // if (document.myForm.Email.value == "") {
  //     alert("Please provide your Email!");
  //     document.myForm.Email.focus();
  //     return false;
  //   }
  // if (
  //   document.myForm.Zip.value == "" ||
  //   isNaN(document.myForm.Zip.value) ||
  //   document.myForm.Zip.value.length != 5
  // ) {
  //   alert("Please provide a zip in the format #####.");
  //   document.myForm.Zip.focus();
  //   return false;
  // }
  // if (document.myForm.Country.value == "-1") {
  //   alert("Please provide your country!");
  //   return false;
  // }
  return true;
}
