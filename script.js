let IMG_PATH = "https://image.tmdb.org/t/p/w1280"
let API_URL = 'https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=e50c47262530bec5989fcc4936bc543a'
let SEARCH_URL = 'https://api.themoviedb.org/4/search/movie?api_key=e50c47262530bec5989fcc4936bc543a&query="'
let SEARCH = document.querySelector(".input-search")


//Initial Movies 
getMovies(API_URL)
async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()

    let movies = data.results
    movies.forEach(movie =>{
        document.querySelector('.box-movies').innerHTML += `
        <div class="movie">
            <img src="${IMG_PATH + movie.poster_path}">
            <div class="movie-description">
                <div class="title-movie">${movie.title}</div>
                <div class="indicator">${movie.vote_average.toString().padEnd(3,".0")}</div>
            </div>
            <div class="overview">
                <h6 class="over-title">Overview</h6>
                <p class="over-body">${movie.overview}</p>
            </div>
        </div>`
    })

    document.querySelectorAll(".indicator").forEach(item =>{
        let average = Number(item.textContent)
        if(average < 5){
            item.classList.add("red")
        }else if(average >= 5 && average < 8){
            item.classList.add("yellow")
        }else if(average >= 8){
            item.classList.add("green")
        }
    })
}

//Search Movies
document.querySelector('form').addEventListener("submit",(e)=>{    
    e.preventDefault()
    let TERM_SEARCH = SEARCH.value
    if(TERM_SEARCH && TERM_SEARCH !== ""){
        document.querySelector('.title-search').innerHTML = `Search Results For "${TERM_SEARCH}"`
        document.querySelector('.box-movies').innerHTML = ""
        getMovies(SEARCH_URL + TERM_SEARCH)
        TERM_SEARCH = ""
    }

})
    
