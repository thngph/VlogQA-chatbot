
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
    }, 1200);

    setTimeout(function () {
        chatbox.innerHTML += `<div class="chat-bubble friend">
                Đây là demo cho VlogQA. Trước khi đặt câu hỏi, vui lòng nhập URL đến video cần tìm hiểu.
                
              </div>`;
    }, 2000);
    setTimeout(function () {
        chatbox.innerHTML += `<div class="chat-bubble friend">
                Lần đầu sử dụng có thể mất khoảng 20s để mô hình khởi động, mong mọi người thông cảm.
              </div>`;
    }, 3000);


};


let transcript = ""

// Get transcript
const urlinput = document.getElementById("url");
urlinput.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var content = urlinput.value;

        async function getRecord(vidId) {


            return fetch(`https://vlgchtsrv.vercel.app/get-transcript/${vidId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response =>
                response.json())
                .then(response => JSON.parse(JSON.stringify(response))['transcript'])
                .catch((error) => {
                    console.error('Error:', error);
                    console.log("server is down!!")  
                    return "Lỗi 503 Service Unavailable là mã trạng thái HTTP (HTTP status code), có nghĩa là máy chủ của trang web tạm thời ngừng hoạt động. Lỗi này xảy ra vì máy chủ quá “bận” hoặc trang web đang trong quá trình bảo trì." 
                  });

            // await new Promise(r => setTimeout(r, 2000));
            // return "This is just the UI for the site. The API server is not working."


        }
        transcript = await getRecord(content.slice(-10. - 1));
        document.getElementById("transcript-holder").innerHTML = transcript;
    }
});




// Get bot response
async function getResponse(content) {
    console.log({ "question": `${content}`, "context": `${transcript}` })
    try {
        const response = await fetch('https://huggingface.co/KhoaDan9/xlmr_10k_ques_10epoches', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({ "question": `${content}`, "context": `${transcript}` })
        })

        if (!response.ok) {
            throw new Error('Server is down or undergoing maintenance')
        }

        const data = await response.json()
        if (!data['score']) {
            throw new Error('Server is down or undergoing maintenance')
        }
        if (data['score'] > 0.0005) {
            return data['answer']
        } else {
            return "Xin vui lòng hỏi lại, câu hỏi chưa rõ ràng hoặc không nằm trong phạm vi ngữ cảnh."
        }
    } catch (error) {
        console.error(error)
        return "Lỗi kết nối tới máy chủ, vui lòng thử lại sau."
    }
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
