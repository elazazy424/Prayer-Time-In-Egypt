let cities = [
  {
    arabicName: "القاهرة",
    name: "Al Qāhirah",
  },
  {
    arabicName: "الإسكندرية",
    name: "Al Iskandarīyah",
  },
  {
    arabicName: "مرسى مطروح",
    name: "Maţrūḩ",
  },
  {
    arabicName: "الدقهلية",
    name: "Ad Daqahlīyah",
  },
  {
    arabicName: "البحر الأحمر",
    name: "Al Baḩr al Aḩmar",
  },
  {
    arabicName: "البحيرة",
    name: "Al Buḩayrah",
  },
  {
    arabicName: "الفيوم",
    name: "Al Fayyūm",
  },
  {
    arabicName: "الغربية",
    name: "Al Gharbīyah",
  },
  {
    arabicName: "الإسماعيلية",
    name: "Al Ismā'īlīyah",
  },
  {
    arabicName: "الجيزة",
    name: "Al Jīzah",
  },
  {
    arabicName: "المنُوفيّة",
    name: "Al Minūfīyah",
  },
  {
    arabicName: "المنيا",
    name: "Al Minyā",
  },
  {
    arabicName: "القليوبية",
    name: "Al Qalyūbīyah",
  },
  {
    arabicName: "الأقصر",
    name: "Al Uqşur",
  },
  {
    arabicName: "الوادي الجديد",
    name: "Al Wādī al Jadīd",
  },
  {
    arabicName: "السويس",
    name: "As Suways",
  },
  {
    arabicName: "الشرقية",
    name: "Ash Sharqīyah",
  },
  {
    arabicName: "أسوان",
    name: "Aswān",
  },
  {
    arabicName: "أسيوط",
    name: "Asyūţ",
  },
  {
    arabicName: "بني سويف",
    name: "Banī Suwayf",
  },
  {
    arabicName: "بورسعيد",
    name: "Būr Sa‘īd",
  },
  {
    arabicName: "دمياط",
    name: "Dumyāţ",
  },
  {
    arabicName: "جنوب سيناء",
    name: "Janūb Sīnā'",
  },
  {
    arabicName: "كفر الشيخ",
    name: "Kafr ash Shaykh",
  },
  {
    arabicName: "قنا",
    name: "Qinā",
  },
  {
    arabicName: "شمال سيناء",
    name: "Shamāl Sīnā'",
  },
  {
    arabicName: "سوهاج",
    name: "	Sūhāj",
  },
];
for (let city of cities) {
  const content = `
        <option>${city.arabicName}</option>
    `;
  document.getElementById("cities-select").innerHTML += content;
}

document
  .getElementById("cities-select")
  .addEventListener("change", function () {
    document.getElementById("city-name").innerHTML = this.value;
    let cityName = "";
    for (let city of cities) {
      if (city.arabicName == this.value) {
        cityName = city.name;
      }
    }
    getPrayersTimingOfCity(cityName);
  });

function getPrayersTimingOfCity(cityName) {
  let params = {
    country: "EG",
    city: cityName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let timings = response.data.data.timings;
      fillTimeForPrayer("fajr-time", timings.Fajr);
      fillTimeForPrayer("shrouk-time", timings.Sunrise);
      fillTimeForPrayer("dohr-time", timings.Dhuhr);
      fillTimeForPrayer("asr-time", timings.Asr);
      fillTimeForPrayer("maghrab-time", timings.Maghrib);
      fillTimeForPrayer("aisha-time", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekDate = response.data.data.date.hijri.weekday.ar;
      document.getElementById("city-date").innerHTML =
        weekDate + " " + readableDate;
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPrayersTimingOfCity("Al Qāhirah");
function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
