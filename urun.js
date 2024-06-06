document.addEventListener("keydown", function (e) {
	if (e.key == "~" && e.ctrlKey) {
		var t = window.open("", "_blank", "width=500,height=300");
		var e = t.document.createElement("iframe");
		(e.src = "https://raw.githubusercontent.com/TheGooferFox/testing12312312/main/popup.html"),
			(e.style.cssText = "width:100%; height:100%; border:none;"),
			t.document.body.appendChild(e),
			t.document.title = "uRun",
			t.addEventListener("message", async function (e) {
				if (e.data.toString().startsWith("execute:")) {
					const code = e.data.toString().replace("execute:", "");
					try {
						const response = await fetch("https://small-frog-a57d.whalemo71.workers.dev/", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ code })
						});
						const result = await response.json();
						if (result.error) {
							console.error("Error executing script:", result.error);
						} else {
							console.log("Script result:", result.result);
						}
					} catch (error) {
						console.error("Error communicating with Cloudflare Worker:", error);
					}
					t.close();
				}
			});
	}
});
