const client = API_KEY;
const form = document.querySelector(".searchForm");
const input = document.querySelector(".textInput");
const gallery = document.querySelector(".gallery");
const moreBtn = document.querySelector(".more");
const spinner = document.querySelector(".spinner");
let search;
let page = 1;
let fetchLink;
let searchInput;

// ---------------------Form Input -----------------//
input.addEventListener("input", searchValue);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInput;
  searchPhotos(searchInput);
});

function searchValue(e) {
  searchInput = e.target.value;
}

// -----------------Refactoring code ----------------- //
async function api(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: client,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function genratePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("galleryImg");
    galleryImg.innerHTML = `<div class='details'>
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src = ${photo.src.large}></img>
    `;

    gallery.appendChild(galleryImg);
  });
}

// ----------------------popular photos ---------------------//
async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
  const data = await api(fetchLink);
  genratePhotos(data);
}

curatedPhotos();

// ------------------------clearing input ----------------------//
function clearInput() {
  gallery.innerHTML = " ";
  input.value = " ";
}

// --------------------searching photos -----------------------------//
async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await api(fetchLink);
  clearInput();
  genratePhotos(data);
}

// -----------------------loadMore -----------------------------------//
moreBtn.addEventListener("click", loadMore);
async function loadMore() {
  page++;
  if (search) {
    fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }

  const data = await api(fetchLink);
  genratePhotos(data);
}
