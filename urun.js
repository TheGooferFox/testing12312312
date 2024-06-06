document.addEventListener("keydown", function (e) {
    alert("Key pressed: " + e.key + " Ctrl key pressed: " + e.ctrlKey);  // Alert key press
    if (e.key == "~" && e.ctrlKey) {
        alert("Correct keys pressed, opening new window");
        var t = window.open("", "_blank", "width=500,height=300");
        var iframe = t.document.createElement("iframe");
        iframe.src = "https://raw.githubusercontent.com/TheGooferFox/testing12312312/main/popup.html";
        iframe.style.cssText = "width:100%; height:100%; border:none;";
        t.document.body.appendChild(iframe);
        t.document.title = "uRun";
        alert("Iframe created and appended to the new window");

        t.addEventListener("message", async function (event) {
            alert("Message received from iframe: " + event.data);
            if (event.data.toString().startsWith("execute:")) {
                const code = event.data.toString().replace("execute:", "");
                alert("Executing code: " + code);
                try {
                    const response = await fetch("https://small-frog-a57d.whalemo71.workers.dev/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code })
                    });
                    const result = await response.json();
                    if (result.error) {
                        alert("Error executing script: " + result.error);
                    } else {
                        alert("Script result: " + result.result);
                    }
                } catch (error) {
                    alert("Error communicating with Cloudflare Worker: " + error);
                }
                t.close();
            }
        });
    }
});
