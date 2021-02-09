document.getElementById('Search').addEventListener('click', function () {
  document.getElementById('container').innerHTML = ``;
  const input = document.getElementById('inputItem');
  const inputValue = input.value;
  const urlForMusic = `https://api.lyrics.ovh/suggest/:+${input.value}`;
  //console.log(urlForMusic);
  fetch(urlForMusic)
    .then(response => response.json())
    .then(data => mainPart(data));
  function mainPart(data) {
    //data=data.data;

    const mainData = data.data;
    console.log(data.data);
    mainData.forEach(songs => {
      //console.log(songs.title);
      const divi = document.getElementById('container');
      const div = document.createElement('div');
      //console.log(typeof ((songs.artist.name)));
      let artistName = songs.artist.name;
      let artist = '';

      for (let i = 0; i < artistName.length; i++) {
        if (artistName[i] === ' ') {
          artist += "%20";
          //console.log(id[i]);

        }
        else {
          artist += artistName[i];
        }
      }

      let songName = songs.title;
      let songTitle = '';
      for (let i = 0; i < songName.length; i++) {
        if (songName[i] === ' ') {
          songTitle += "%20";
          //console.log(id[i]);

        }
        else {
          songTitle += songName[i];
        }
      }
      //console.log(artist);
      //console.log(songTitle);
      div.className = "single-result  row align-items-center my-3 p-3";
      div.innerHTML = `
       <div class="col-md-9">
      <h3 class="lyrics-name">${songs.title}</h3>
      <p class="author lead">Album by ${songs.artist.name}</p>
      <audio controls>
          <source src="${songs.preview}" type="audio/mp3">    
      </audio>

      </div>
      <div class="col-md-3 text-md-right text-center">
           <b class="lyrics-name text-center">rank:${songs.rank}</b>
           <button onclick="getLyric('${artist}','${songTitle}')" class="btn btn-success text-center">Get Lyrics</button>
      </div>
      `
      divi.appendChild(div);


    });
  }
});
const getLyric = (artist, title) => {
  const lyricsUrl = `https://api.lyrics.ovh/v1/:${artist}/${title}`;
  
  //console.log(lyricsUrl);
  fetch(lyricsUrl)
    .then(res => res.json())
    .then(song => displayLyrics(song.lyrics));
}

const displayLyrics = lyrics => {
  document.getElementById('singleLyrics').innerText = lyrics;
  document.getElementById('singleLyrics').scrollTop = 100;
  if(lyrics.length==0){
    document.getElementById('singleLyrics').innerText = `There is no lyrics for this song name.please try another`;

  }
  
  //console.log(lyrics);

}




// https://api.lyrics.ovh/v1/:Coldplay/Adventure%20of%20a%20Lifetime
