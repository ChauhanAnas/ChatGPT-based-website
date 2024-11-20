const submit = document.getElementById("submit");
const from = document.getElementById("from");
const to = document.getElementById("to");
const msg = document.getElementById('message')

const  fillDataInCard = (ottClone, artical) => {
  const title = ottClone.querySelector('#title')
  const plan = ottClone.querySelector('#plan')
  title.innerHTML = artical.title
  plan.addEventListener('click',()=>{
      location.href = artical.url
  })
}


const bindData = (articals) =>{
  const cards = document.getElementById('package')
  const ott = document.getElementById('ott')
  cards.innerHTML = "";

  articals.forEach(artical => {
      const ottClone = ott.content.cloneNode(true)
      fillDataInCard(ottClone, artical)
      cards.appendChild(ottClone)
  });
}

const getVocation = async (event) => {
  event.preventDefault();
  const source = from.value;
  const dest = to.value;
  console.log(source)
  msg.innerHTML = `Please wait... Getting the best vocation plan from ${source} to ${dest}.`
  try {
    const url = "https://copilot5.p.rapidapi.com/vacation-planner";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "9a64f0d648mshfed30c5d1938973p1dcd60jsn6b7c873f4c99",
        "x-rapidapi-host": "copilot5.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body:  JSON.stringify({
        message: `Plan a trip from ${source} to ${dest}`, // User-defined message
        conversation_id: null,
        markdown: false,
        photo_url: null
      })
    };
    const response = await fetch(url, options);
    const result = await response.json();
    const rost = [result]
    const what = rost[0].data.message
    msg.innerHTML = ""
    msg.innerHTML = what
    bindData(rost[0].data.sources)
    console.log(rost[0].data.sources)
  } catch (error) {
    console.log(error);
  }
};

let execute = false
const removeImg = () => {
    if(!execute){
        console.log("hello")
        document.getElementById('image_X').src=''
        execute = true
    }
}

submit.addEventListener("click", getVocation);
submit.addEventListener('click', removeImg)
