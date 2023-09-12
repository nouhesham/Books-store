"strict";
var book = document.querySelector(".book");
var publishSection = document.querySelector(".publish");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get("id");

let xhrsearch = new XMLHttpRequest();

xhrsearch.open("GET", `https://www.googleapis.com/books/v1/volumes/${id}`);
xhrsearch.send();
xhrsearch.onload = function () {
  if (xhrsearch.status != 200) {
    console.log("not found"); // e.g. 404: Not Found
  } else {
    datasearch = JSON.parse(xhrsearch.response);
    console.log(datasearch);
    displayBook(datasearch);
  }
};

function displayBook(element) {
  //select the attributes of the element

  var title = element.volumeInfo.title;
  var author = element.volumeInfo.authors;
  var descrip = element.volumeInfo.description;
  var page = element.volumeInfo.printedPageCount;
  var publish = element.volumeInfo.publisher;
  var publisheddate = element.volumeInfo.publishedDate;

  //creating paragraph inside the divs
  var ppage = document.createElement("p");
  var ppublish = document.createElement("p");
  var pdate = document.createElement("p");

  //innerhtmls
  ppage.innerHTML = "<b>Pages</b> : " + page;
  ppublish.innerHTML = "<b>The publisher</b> : " + publish;
  pdate.innerHTML = "<b>The publish date :</b> " + publisheddate;
  //create elements
  var imagediv = document.createElement("div");
  var image = document.createElement("img");

  image.src = element.volumeInfo.imageLinks.thumbnail;

  var textdiv = document.createElement("div");
  var publishdiv = document.createElement("div");

  var ptitle = document.createElement("p");
  var pauthor = document.createElement("p");
  var pdescripe = document.createElement("p");

  pauthor.innerHTML = "<b>Authors</b> : " + author;
  ptitle.innerHTML = "<b>Title</b> : " + title;
  pdescripe.innerHTML = "<b>Description</b> : " + descrip;
  //style
  imagediv.classList.add("imagediv");
  publishSection.classList.add("flex");

  //appending
  textdiv.classList.add("width");
  textdiv.append(ptitle);
  textdiv.append(pauthor);
  textdiv.append(pdescripe);
  imagediv.append(image);
  book.append(imagediv);
  book.append(textdiv);

  publishdiv.append(ppage);
  publishdiv.append(ppublish);
  publishdiv.append(pdate);
  publishSection.append(publishdiv);
}
