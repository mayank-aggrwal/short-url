$(document).ready(function() {
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            console.log("I'm in scrolling motion")
            $('.navbar').addClass('sticky');
        }
        else {
            $('.navbar').removeClass('sticky');
        }
    })

    // toggle menu/navbar active state
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })

})

button = document.getElementById('submit')
url = document.getElementById('url')
code = document.getElementById('code')
result = document.getElementById('result')

async function shortenURL() {
    
    urlToShorten = url.value
    customCode = code.value
    console.log(`URL: ${urlToShorten}\nCode: ${customCode}`);
    let shortenedURL = ':)'

    let requestURL = "https://shortt-ly.herokuapp.com/api/custom"
    // let requestURL = "http://localhost:5000/api/custom"
    let requestBody = {
        longUrl: urlToShorten,
        urlCode: customCode
    }
    if(customCode == '') {
        requestURL = "https://shortt-ly.herokuapp.com/api/short"
        // requestURL = "http://localhost:5000/api/short"
        requestBody = {
            longUrl: urlToShorten
        }
    }
    console.log(customCode)

    // Make an API call to the URL shortening service and get the json and display the shortened URL or errors(if any)
    // await fetch("https://shortt-ly.herokuapp.com/api/short", {
    await fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
      .then(json => {
            console.log(json)
            if(json.hasOwnProperty('errors')) {
                let displayText = `Error: ${json.errors.message}`
                result.innerHTML = displayText
            }
            else {
                shortenedURL = json.shortUrl;
                let displayText = shortenedURL
                result.innerHTML = `<a href="` + displayText + `" target="_blank">` + displayText + `</a>`
            }
      })
      .catch(err => console.log(err));
}
