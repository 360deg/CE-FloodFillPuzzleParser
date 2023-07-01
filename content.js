parseTableData();

function parseTableData() {
    var buttons = document.querySelectorAll('#controls .btn');

    buttons.forEach(function(button, index) {
        window['clickButton' + (index + 1)] = function() {
            button.click();
        }
    });

    const tableData = document.querySelector('#board').outerHTML;

    // send request to the API
    fetch('https://localhost:44393/Main', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: tableData
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
            clickAll(response);
        })
        .catch(error => console.error(`Fetch Error =\n`, error));

}

function clickAll(path) {
    path.forEach((item) => {
        switch (item) {
            case 0: clickButton4(); break;
            case 1: clickButton1(); break;
            case 2: clickButton3(); break;
            case 3: clickButton5(); break;
            case 4: clickButton2(); break;
        }
    });

    setTimeout(() => {
        var button = document.querySelector('.styles__Button-sc-1tfs2h7-0.kHrBTK');

        button.click();

        setTimeout(() => {
            parseTableData();
        }, 200)
    }, 2000);
}

// Bej = 0,
// Black = 1,
// Blue = 2,
// White = 3,
// Red = 4,

// clickButton1() - black
// clickButton2() - red
// clickButton3() - blue
// clickButton4() - bej
// clickButton5() - white
