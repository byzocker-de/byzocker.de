const userId = "322035497826385920";
const lanyardUrl = "https://api.lanyard.rest/v1/users/" + userId;
// 
async function fetchDiscordPresence() {
    try {
        const response = await fetch(lanyardUrl);
        const lanyardjson = await response.json();
        const lanyard = lanyardjson.data;
        const logspotify = (value) =>
            console.log("detected listening \n'" + value + "'");
        const logactivity = (value) =>
            console.log("detected activity \n'" + value + "'");

        const testp = document.getElementById("test");

        if (lanyardjson.success == true) {
            if (lanyard.listening_to_spotify == true) {
                const spotify = {
                    title: lanyard.spotify.song,
                    artist: lanyard.spotify.artist,
                    link:
                        "https://open.spotify.com/track/" +
                        lanyard.spotify.track_id,
                };
                var songRemaining = dayjs(lanyard.spotify.timestamps.end).from(Date.now(), true); // define remaining length of song
                // testp.textContent = songRemaining.toString(); 
                console.log(logspotify(spotify.artist + " - " + spotify.title)  + " with " + songRemaining + " remaining");
                activitiesT.textContent =
                    "♫ " + spotify.artist + " - " + spotify.title + " (" + songRemaining + " remaining" + ")";
                activitiesT.href = spotify.link;
                activitiesT.classList.add("spotLinkActive");
            } else {
                try {
                    if (typeof lanyard.activities[0].name === "string") {
                        const activity0 = {
                            name: lanyard.activities[0].name,
                            state: lanyard.activities[0].state,
                            details: lanyard.activities[0].details,
                        };
                        activitiesT.classList.remove("spotLinkActive");
                        activitiesT.removeAttribute("href");
                        logactivity(
                            activity0.name + " - " + activity0.details
                        );
                        if (activity0.name == "Code") {
                                activitiesT.textContent = "⌨ " + "Visual Studio Code" + " - " + activity0.details;
                                console.log(activity0.state);
                        } else {
                                activitiesT.textContent = "🎮 " + activity0.name + " - " + activity0.details;
                        }
                    }
                } catch (error) {
                    activitiesT.textContent =
                        "offline... ";
                    activitiesT.classList.remove("spotLinkActive");
                    activitiesT.removeAttribute("href");
                    console.log("not detected any activity")
                }
            }

        }

    } catch (error) {
        activitiesT.textContent = "Error";
        activitiesT.removeAttribute("href");
        activitiesT.classList.remove("spotLinkActive");
        console.log("Something went wrong connecting to Lanyard...");
    }
}
fetchDiscordPresence();
setInterval(fetchDiscordPresence, 10000);