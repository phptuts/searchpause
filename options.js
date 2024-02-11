const buttonEl = document.querySelector("button");
const secondsEl = document.querySelector('#seconds');
const messageEl = document.querySelector("#message");
chrome.storage.sync.get(['time', 'message'], function({time, message}) {
    if (time !== undefined) {
        secondsEl.value = time;
    }
    if (message !== undefined) {
        messageEl.value = message;
    }
});
buttonEl.addEventListener('click', () => {
    const seconds = +secondsEl.value;
    chrome.storage.sync.set({ time: seconds });
    chrome.storage.sync.set({ message: messageEl.value });
    Toastify({
        text: "Your setting have been saved!",
        position: 'right',
        duration: 2000
      }).showToast();
})