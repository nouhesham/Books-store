"strict";
var row = document.querySelector(".row");
var inputval = document.querySelector(".form-control");

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=software");

// 3. Send the request over the network
xhr.send();
var data;

xhr.onload = function () {
  if (xhr.status != 200) {
    console.log("not found"); // e.g. 404: Not Found
  } else {
    data = JSON.parse(xhr.response);
    displayitems(data.items);
  }
};

xhr.onerror = function () {
  console.log("failed");
};

var link;
var linkbook;
var autho1;

function displayitems(items) {
  row.innerHTML = null;
  items.forEach((element) => {
    var elementid = element.id;
    var title = element.volumeInfo.title;
    var titlepart = title.slice(0, 25);
    var author = element.volumeInfo.authors;
    var descrip = element.volumeInfo.description;
    var imagelink = element.volumeInfo.imageLinks.thumbnail;
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var image = document.createElement("img");
    var ptitle = document.createElement("p");
    var pauthor = document.createElement("p");
    var pdescripe = document.createElement("p");
    var imagediv = document.createElement("div");
    //setting the button, its position
    var buttonview = document.createElement("button");
    var anchor = document.createElement("a");
    anchor.append(buttonview);
    anchor.href = "indexsearch.html?id=" + elementid;

    //inner html
    ptitle.innerHTML = titlepart;
    buttonview.innerHTML = " View Details";
    pdescripe.innerHTML = "<b>Description :</b> " + descrip;
    pauthor.innerHTML = "<b>Authors :</b> " + author.slice(0, 1);
    //image adjust
    image.src = imagelink;
    image.classList.add("img");
    imagediv.classList.add("img_div");
    //the main div for each book
    div1.append(imagediv);
    //the div for each image
    imagediv.append(image);
    //setting the div for title , author and shortdescirption
    div1.append(div2);
    div2.append(ptitle);
    div2.append(pauthor);
    div2.append(pdescripe);
    div2.append(anchor);
    //styling
    div1.classList.add("col-3", "col-sm-6", "col-md-4", "col-lg-3");
    div1.classList.add("card");
    ptitle.classList.add("title");
    pdescripe.classList.add("des");
    buttonview.classList.add("btn");
    buttonview.classList.add("btn-primary");
    div2.classList.add("divtext");
    pauthor.classList.add("authorstyle");

    row.append(div1);
  });
}

//searching function
function search() {
  var inputsearch = inputval.value.trim();
  if (inputsearch) {
    let xhr2 = new XMLHttpRequest();
    xhr2.open(
      "GET",
      `https://www.googleapis.com/books/v1/volumes?q=${inputsearch}`
    );

    xhr2.send();

    xhr2.onload = function () {
      if (xhr.status != 200) {
        console.log("not found");
      } else {
        datanew = JSON.parse(xhr2.response);
      }
      displayitems(datanew.items);
    };
  } else {
    alert("please enter a valid search");
  }
}
