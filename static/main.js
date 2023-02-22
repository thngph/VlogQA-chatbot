
// First message

window.onload = function () {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div class="chat-bubble friend bounce-loading" style="padding: 1.5rem 1rem .6rem">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
              </div>`;
    setTimeout(function () {
        document.querySelectorAll(".bounce-loading").forEach(el => el.remove());
        chatbox.innerHTML += `<div class="chat-bubble friend">
                Chào mừng đến với bình nguyên vô tận.
              </div>`;
    }, 3000);


};


// Get transcript
const urlinput = document.getElementById("url");
urlinput.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var content = urlinput.value;

        async function getRecord(vidId) {


            // return fetch(`http://127.0.0.1:8000/get-transcript/${vidId}`, {
            //     method: 'GET',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            // }).then(response => response.json())
            //     .then(response => JSON.parse(JSON.stringify(response))['transcript'])

            await new Promise(r => setTimeout(r, 2000));
            return "This is just the UI for the site. The API server is not working."


        }
        let transcript = await getRecord(content.slice(-10. - 1));
        document.getElementById("transcript-holder").innerHTML = transcript;
    }
});




// Get bot response
async function getResponse(content) {
    // return fetch('http://127.0.0.1:8000/bot-response', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ "question": `${content} + 1`, "context": "aa" })
    // })
    //     .then(response => response.json())
    //     .then(response => JSON.parse(JSON.stringify(response))['text'])

    await new Promise(r => setTimeout(r, 2000));
            return "The bot is down at the momment. Contact the maintainers for further information."
}

const input = document.getElementById("askInput");

const chatbox = document.getElementById("chatbox");

input.addEventListener("keypress", async function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        var content = input.value;
        input.value = '';
        chatbox.innerHTML += `<div class="chat-bubble user">
                ${content}
              </div>`;


        chatbox.lastChild.scrollIntoView({ behavior: "smooth", block: "end" });

        chatbox.innerHTML += `<div class="chat-bubble friend bounce-loading" style="padding: 1.5rem 1rem .6rem">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
              </div>`;
        chatbox.lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
        await new Promise(r => setTimeout(r, 2000));

        let response = await getResponse(content);

        document.querySelectorAll(".bounce-loading").forEach(el => el.remove());



        chatbox.innerHTML += `<div class="chat-bubble friend">
                ${response}
              </div>`;
        chatbox.lastChild.scrollIntoView({ behavior: "smooth", block: "end" });


    }
});