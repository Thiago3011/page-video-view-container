const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {

    const about = {
        avatar_url: "https://image.freepik.com/fotos-gratis/tecla-de-piano-closeup-com-luz-da-janela_9693-119.jpg",
        name: "Músicas Clássicas",
        intro: "As melhores e mais complexas peças",
        description: '"A técnica nasce do espírito." - <a href="https://www.britannica.com/biography/Franz-Liszt" target="_blank">Franz Liszt</a>',
        links: [
            { name: "Compositores", url: "https://www.suapesquisa.com/musicacultura/compositores_musica_classica.htm" },
            { name: "historia", url: "https://www.culturaclassica.com.br/conheca-a-musica-classica/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id;

    const video = videos.find(function (video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })

})

server.listen(5000, function () {
    console.log("Server is running!")
})