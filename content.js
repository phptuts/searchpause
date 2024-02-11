    const blockerDiv = document.createElement('div');
    blockerDiv.style.width = '100%';
    blockerDiv.style.height = '100%';
    blockerDiv.style.margin = '0';
    blockerDiv.style.backgroundColor = 'black';
    blockerDiv.style.position = 'fixed';
    blockerDiv.style.left = '0';
    blockerDiv.style.top = '0';
    blockerDiv.style.zIndex = '1000';
    blockerDiv.id = 'cover';
    document.body.appendChild(blockerDiv);
    console.log(blockerDiv, 'div');

    const modalDiv = document.createElement('div');
    modalDiv.style.width = '800px';
    modalDiv.style.height = '500px';
    modalDiv.style.margin = '0';
    modalDiv.style.backgroundColor = '#fddcdc';
    modalDiv.style.position = 'fixed';
    modalDiv.style.left = '50%';
    modalDiv.style.top = '50%';
    modalDiv.style.transform = 'translate(-50%, -50%)';
    blockerDiv.appendChild(modalDiv)

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    const h1 = document.createElement('h1');
    h1.style.textAlign = 'center';
    h1.style.fontSize = '40px';
    h1.style.color = 'black';
    h1.style.marginTop = '30px';
    h1.style.padding = '20px';
    
    modalDiv.appendChild(h1);

    const cancelButton = document.createElement('button');

    cancelButton.style.backgroundColor = 'red';
    cancelButton.style.color = 'white';
    cancelButton.style.display = 'block';
    cancelButton.style.margin = '30px auto';
    cancelButton.style.border = 'none';
    cancelButton.style.fontSize = '30px';
    cancelButton.style.padding = '30px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.textContent = 'STOP!';
    cancelButton.addEventListener('click', () => {
        window.location = 'https://google.com';
    })
    modalDiv.appendChild(cancelButton);

    const h2 = document.createElement('h1');
    h2.style.textAlign = 'center';
    h2.style.fontSize = '30px';
    h2.style.color = 'black';
    h2.style.marginTop = '30px';
    h2.style.padding = '20px';
    

    const continueButton = document.createElement('button');
    continueButton.style.backgroundColor = 'green';
    continueButton.style.color = 'white';
    continueButton.style.display = 'block';
    continueButton.style.margin = '30px auto';
    continueButton.style.border = 'none';
    continueButton.style.fontSize = '30px';
    continueButton.style.padding = '30px';
    continueButton.style.cursor = 'pointer';
    continueButton.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
        blockerDiv.remove();
    })

    chrome.storage.sync.get(['time', 'message'], function({time, message}) {
        let countDown = time === undefined ? 3 : +time;
        h1.textContent = message === undefined ? `Is this search skillful?` : message;
        h2.textContent = `Continue in ${countDown} seconds.`;
        if (time <= 0) {
            modalDiv.appendChild(continueButton);
            return;
        }

        modalDiv.appendChild(h2);
        const timerId = setInterval(() => {
            if (countDown == 1) 
            {
                h2.remove();
                modalDiv.appendChild(continueButton);
                clearInterval(timerId);
            }
            countDown -= 1;
            h2.textContent = `Continue in ${countDown} seconds.`;
        }, 1000);

    });

