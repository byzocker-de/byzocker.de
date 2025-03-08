
declare var lanyard: any;
const discord_id = '322035497826385920';
document.addEventListener('DOMContentLoaded', () => {
    lanyard({
        userId: discord_id,
        socket: true,
        onPresenceUpdate: lanyardData
    });
});
// Defining the html elements
let htmlName = document.getElementById('test').innerText;
// Defining the function that will be called when the presence is updated
function lanyardData(data) {
    console.log("updated Presence data\n ", data);

    let testElement = document.getElementById('test');

    let title = document.getElementById('activity-title') as HTMLHeadingElement;
    let description = document.getElementById('activity-description') as HTMLParagraphElement;
    let icon = document.getElementById('activity-icon') as HTMLImageElement;
    let songElapsed = document.getElementById('song-elapsed') as HTMLDivElement;
    let songProgressbar = document.getElementById('song-progressbar') as HTMLDivElement;
    let songProgress = document.getElementById('song-progress') as HTMLDivElement;
    let songRemaining = document.getElementById('song-remaining') as HTMLDivElement;







    // Check if the user is Listening to spotify
    updateData();

    function updateData() {

        // Start out with isListening set to nothing (except for development)
        let isListening = false;

        // Check every Second if user is Listening to Spotify

        function checkListening() {
            if (data.listening_to_spotify == true) {
                document.getElementById('progressbar-spanning').classList.remove('hidden');
                return isListening = true;

            }
            else if (data.listening_to_spotify == false) {
                document.getElementById('progressbar-spanning').classList.add('hidden');
                return isListening = false;
            }
        }

        setInterval(() => {
            // comment out for development
            //checkListening();
        }, 1000);

        if (isListening == true) {
            // If the user is listening to spotify, then the listening_to_spotify key will be true
            // Calculate the progress of the song
            let songStart = data.spotify.timestamps.start;
            let songEnd = data.spotify.timestamps.end;
            let songLength = (songEnd - songStart) / 1000;
            let songElapsedData = (Date.now() - songStart) / 1000;
            let songRemainingData = (songLength - (Date.now() - songStart)) / 1000;


            // If the Song title has changed, break the function and update the data


            // Update the data every second
            // Rather buggy when song changes or is being rewinded, may need to comment out
            setInterval(() => {
                songElapsedData = (Date.now() - songStart) / 1000;
                setSpotifySongProgressData();
                checkSpotifySongProgressData();
                console.log('Song Time Elapsed Updated');


            }, 1000);

            function checkSpotifySongProgressData() {
                // Check if the song has ended since the last update
                if (songElapsedData >= songLength) {
                    // If the song has ended, then update the data
                    updateData();
                    console.log('Song Ended');
                }
            }

            // Set Spotify Title Data, then call setSpotifyProgressData
            function setSpotifyTitleData() {
                title.innerText = data.spotify.song;
                description.innerText = data.spotify.artist;
                icon.src = data.spotify.album_art_url;

                setSpotifySongProgressData();
                console.log('Spotify Title Data Updated');
            }
            setSpotifyTitleData();

            // Set Spotify Song Progress Data
            function setSpotifySongProgressData() {
                // Set the song progress
                songElapsed.innerText = `${Math.floor(songElapsedData / 60)}:${(Math.floor(songElapsedData % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;

                // Set how long the song is
                songRemaining.innerText = `${Math.floor(songLength / 60)}:${(Math.floor(songLength % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;

                // Set the progress bar
                songProgress.style.width = `${(songElapsedData / songLength) * 100}%`;

                //console.log('Spotify Song Progress Data Updated');
            }



            // Set Activity div href to Spotify link
            let activityDiv = document.getElementById('activity'); 
            activityDiv.style.cursor = 'pointer';
            activityDiv.title = 'Open Spotify';
            activityDiv.onclick = function () {
                window.open("https://open.spotify.com/track/" + data.spotify.track_id, '_blank');
            };
        } else if (isListening == false) {
            // If the user isn't listening to spotify, then the listening_to_spotify key will be false
            // Select other activity instead
            let dataActivity;



            // Remove the progress bar
            document.getElementById('progressbar-spanning').innerHTML = 'none';

            // If first activity's name is Spotify, then select the second activity
            function checkIsActivitySpotify(){
                if (data.discord.activities[0].id == 'spotify:1') {
                    return dataActivity = data.discord.activities[1];
                }
                else {
                    return dataActivity = data.discord.activities[0];
                };
            };

            //console.log(data.discord.activities[3].id);

            checkIsActivitySpotify();

            // Set the data for the activity
            title.innerText = data.discord.status;
            description.innerText = dataActivity.name;
            icon.src = dataActivity.assets.large_image;



            // console.log('Discord Activity Data Updated');
        }
        console.log('Data Updated');
    }
}
