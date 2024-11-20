const sumbit = document.getElementById('sumbit')
const msg = document.getElementById('msg')
const add = document.getElementById('add')

const getData = async (event) => {
    event.preventDefault()
    if(msg.value === "") return
    const val = msg.value
    msg.value = ""
    // console.log(val)
    const usr = document.createElement('p')
    usr.setAttribute('id', 'myText');
    usr.innerHTML = val
    add.appendChild(usr)
    const AI = document.createElement('p')
    AI.setAttribute('id', 'AIText');
    AI.innerHTML = "Loading...😊"
    add.appendChild(AI)


    const url = 'https://copilot5.p.rapidapi.com/copilot';
    const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '9a64f0d648mshfed30c5d1938973p1dcd60jsn6b7c873f4c99',
        'x-rapidapi-host': 'copilot5.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: val,
        conversation_id: null,
        tone: 'BALANCED',
        markdown: false,
        photo_url: null
    })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const rost = [result]
        AI.innerHTML = ""
        const node = document.createTextNode(rost[0].data.message);
        AI.appendChild(node)
        add.appendChild(AI)
        console.log(rost[0].data.message)
    } catch (error) {
        console.error(error);
    }

}
let execute = false
const removeImg = () => {
    if(!execute){
        document.getElementById('image_X').src=''
        execute = true
    }
}

sumbit.addEventListener('click', getData)
sumbit.addEventListener('click', removeImg)