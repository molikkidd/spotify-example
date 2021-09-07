const express = require('express');
const app = express();
const { Album, Artist, Playlist, Song } = require('./models');

const PORT = process.env.PORT || 8002;

// more efficient way of getting all the songs from one album
app.get('/:artist/:album', async (req,res) => { //Smino: Z4L

    let artist = req.params.artist;
    let albumInput = req.params.album;
    // find the artist first
    // include all their albums and songs
    const findArtist = await Artist.findOne({
        where: { name: artist},
        include: [Album,Song]
    })
    // assign all associated albums to a variable
    const albums = findArtist.Albums;
    // filter through albums to find specific album
    let filterAlbums = albums.filter(oneAlbum => {
        oneAlbum = oneAlbum.toJSON();
        if(oneAlbum === albumInput) {
            return true;
        }
    });
    // assign that album to  variable 
    let findAlbum = filterAlbums[0];
    // get all songs from the album
    let songs = findAlbum.getSongs();
    console.log(songs);
});

app.get('/:artist/album', async (req,res) => { //Smino: Noir

    let artist = req.params.artist;
    const findAlbum = await Artist.findOne({
        where: { name: artist},
        include: [Album]
    })

    let fe
    console.log(findAlbum);
});

/*
[
    name: 'Smino',
    bio: 'different kinda music',
    Albums: [
        name:Noir,
        label:Independent,
        genre:Neo Soul,
        releaseYear: 2018,
        artistId: 2

    ]
]

*/

// find all the albums and songs from an artist
app.get('/:artist/album-songs', async (req,res) => { //Smino: Noir

    let artist = req.params.artist;
    const findAlbum = await Artist.findOne({
        where: { name: artist},
        include: [Album]
    })
    const albums = findAlbum.Albums;
    for (let i = 0; i < albums.length; i++) {
        const a = albums[i].toJSON();
        console.log('list of all the albums', a.name);    
        console.log('list of all the songs', a.getSongs());    
    }
  
    console.log(findAlbum);
});


app.listen(PORT, console.log('Docked at Port:', PORT));