function updateGif(searchTerm) {
    const apiKey = "ysNMO89bq3vh9HQtkwfconzJD5RadqiI"
    const linkPrefix = "https://api.giphy.com/v1/gifs/translate"
    const link = `${linkPrefix}?api_key=${apiKey}&s=${searchTerm}`

    fetch(link, { mode: 'cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            if (data.meta.status !== 200) {
                throw new Error("GIF not found")
            }
            const img = document.querySelector("img")
            img.src = data.data.images.original.url
        })
        .catch(error => {
            console.error("Error fetching GIF:", error)
        })
}

const form = document.querySelector("form")
const input = document.querySelector("input")

form.addEventListener("submit", event => {
    event.preventDefault()
    const searchTerm = input.value.trim() || "cats"
    updateGif(searchTerm)
    input.value = ""
})

// Initial GIF load
updateGif("cats")
