let Title = document.getElementById("title"),
  Price = document.getElementById("price"),
  Taxes = document.getElementById("taxes"),
  Ads = document.getElementById("ads"),
  Discount = document.getElementById("discount"),
  Total = document.getElementById("total"),
  Count = document.getElementById("count"),
  Categroe = document.getElementById("categroe"),
  btnSubmit = document.getElementById("submit"),
  Search = document.getElementById("search");
let mood = "creat";
let tmp;

// Get Total Funcation
function getTotal() {
  if (Price.value != "") {
    let result = +Price.value + +Taxes.value + +Ads.value - +Discount.value;
    //
    Total.innerHTML = result;
  }
}

// Creat New Product
let dataPro;

localStorage.product != null
  ? (dataPro = JSON.parse(localStorage.product))
  : (dataPro = []);

btnSubmit.onclick = function () {
  let newPro = {
    Title: Title.value.toLowerCase(),
    Price: Price.value,
    Taxes: Taxes.value,
    Ads: Ads.value,
    Discount: Discount.value,
    Total: Total.innerHTML,
    Count: Count.value,
    Categroe: Categroe.value.toLowerCase(),
  };
  if (Title.value != "" && Price.value != "" && Categroe.value != "") {
    if (mood === "creat") {
      if (newPro.Count > 1) {
        for (let i = 0; i < newPro.Count; i++) {
          dataPro.push(newPro); //Add Object(newPro) in Array[dataPro]
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "creat";
      btnSubmit.innerHTML = "Creat";
      Count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(dataPro)); // use JSON.stringify becase localstorage ===>string
  // يتم حفظ البيانات داخل مصفوفه حتي نستطيع الوصول الي البيانات ونقوم بالتعديل عليها

  clearDate();
  dateShow();
};

// Clear Inputs
function clearDate() {
  Title.value = "";
  Price.value = "";
  Taxes.value = "";
  Ads.value = "";
  Discount.value = "";
  Total.innerHTML = "";
  Count.value = "";
  Categroe.value = "";
}

// Funcation Read

function dateShow() {
  let tabel = "";
  for (let i = 0; i < dataPro.length; i++) {
    tabel += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].Title}</td>
            <td>${dataPro[i].Price}</td>
            <td>${dataPro[i].Taxes}</td>
            <td>${dataPro[i].Ads}</td>
            <td>${dataPro[i].Discount}</td>
            <td>${dataPro[i].Total}</td>
            <td>${dataPro[i].Categroe}</td>
            <td><button onclick="updateDate(${i})" id="update">UPDATE</button></td>
            <td><button onclick="dataDelete(${i})" id="delete">DELETE</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="delAll()" >Delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

// Funcation  delete
function dataDelete(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  dateShow();
}
function delAll() {
  localStorage.clear();
  dataPro.splice(0);
  dateShow();
}

// Funcation Update Date
function updateDate(i) {
  Title.value = dataPro[i].Title;
  Price.value = dataPro[i].Price;
  Taxes.value = dataPro[i].Taxes;
  Ads.value = dataPro[i].Ads;
  Discount.value = dataPro[i].Discount;
  Categroe.value = dataPro[i].Categroe;
  Count.style.display = "none";
  btnSubmit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

// Funcation Searching Date
let searchMoodTitle = "title";
function searchingMood(id) {
  let sreachBox = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    sreachBox.placeholder = "Search By Title";
  } else {
    searchMood = "categorey";
    sreachBox.placeholder = "Search By Category";
  }
  sreachBox.focus();
  sreachBox.value = "";
  dateShow();
}
function searchDate(value) {
  let tabel = "";
  if ((searchMood = "title")) {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Title.includes(value.toLowerCase())) {
        tabel += `<tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].Title}</td>
                <td>${dataPro[i].Price}</td>
                <td>${dataPro[i].Taxes}</td>
                <td>${dataPro[i].Ads}</td>
                <td>${dataPro[i].Discount}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].Categroe}</td>
                <td><button onclick="updateDate(${i})" id="update">UPDATE</button></td>
                <td><button onclick="dataDelete(${i})" id="delete">DELETE</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Categroe.includes(value.toLowerCase())) {
        tabel += `<tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].Title}</td>
                <td>${dataPro[i].Price}</td>
                <td>${dataPro[i].Taxes}</td>
                <td>${dataPro[i].Ads}</td>
                <td>${dataPro[i].Discount}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].Categroe}</td>
                <td><button onclick="updateDate(${i})" id="update">UPDATE</button></td>
                <td><button onclick="dataDelete(${i})" id="delete">DELETE</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tabel;
}

dateShow();
