const buttonEl = document.querySelector("button");
const inputEl = document.querySelector('input');
chrome.storage.sync.get(['time'], function({time}) {
    if (time !== undefined) {
        inputEl.value = time;
    }
});
buttonEl.addEventListener('click', () => {
    const seconds = +inputEl.value;
    chrome.storage.sync.set({ time: seconds }, function() {
        alert('Pause Time Set');
     });

})