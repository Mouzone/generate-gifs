async function updateGif(searchTerm) {
    const apiKey = "ysNMO89bq3vh9HQtkwfconzJD5RadqiI"
    const linkPrefix = "https://api.giphy.com/v1/gifs/translate"
    const link = `${linkPrefix}?api_key=${apiKey}&s=${searchTerm}`

    try {
        const response = await fetch(link, { mode: 'cors' })
        const gifData = await response.json()
        if (gifData.data.length === 0) {
            throw new Error("GIF not found")
        } else {
            const img = document.querySelector("img")
            img.src = gifData.data.images.original.url
        }
    } catch(error) {
        console.error("Error fetching GIF:", error)
    }
}

const form = document.querySelector("form")
const input = document.querySelector("input")

form.addEventListener("submit", async event => {
    event.preventDefault()
    const searchTerm = input.value.trim() || "cats"
    await updateGif(searchTerm)
    input.value = ""
})

// Initial GIF load
updateGif("cats")
