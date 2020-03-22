// alert(1);
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');

loadingElement.style.display = '';

const API_URL = "http://localhost:5000/mews";

listAllMews();

form.addEventListener('submit', (e) => {
    console.log('submitted');
    e.preventDefault();

    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name, content
    };


    loadingElement.style.display = '';
    form.style.display = 'none';

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(mew),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
    .then(createNew =>{
        console.log(createNew);

    loadingElement.style.display = 'none';
    form.style.display = '';

    });

});

function listAllMews(){
    fetch(API_URL).then(response => response.json()).then(mews =>{
        mews.forEach(mew =>{
            const div = document.createElement('div');

            const header = document.createElement('h3');
            header.textContent = mew.name;

            const contents = document.createElement('p');
            contents.textContent = mew.content;

            div.appendChild(header);
            div.appendChild(contents);

            mewsElement.appendChild(div);
        });
    });
}