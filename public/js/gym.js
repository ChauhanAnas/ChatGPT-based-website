const submit = document.getElementById("submit");
const dish = document.getElementById("gym1");
const desc = document.getElementById("desc");

const fillDataInCard = (ottClone, artical) => {
  const title = ottClone.querySelector("#title1");
  const plan = ottClone.querySelector("#recp");
  const img = ottClone.querySelector("#img");
  title.innerHTML = artical.title;
  artical.image ? (img.src = artical.image) : (img.src = "../images/gym.jpg");
  plan.addEventListener("click", () => {
    location.href = artical.url;
  });
};

const bindData = (articals) => {
  const cards = document.getElementById("carts");
  const ott = document.getElementById("ott1");
  cards.innerHTML = "";

  articals.forEach((artical) => {
    const ottClone = ott.content.cloneNode(true);
    fillDataInCard(ottClone, artical);
    cards.appendChild(ottClone);
  });
};

const getRecipe = async (event) => {
    event.preventDefault();
    const val = dish.value;
    dish.value = "";
    document.getElementById("carts").innerHTML = "";
    console.log(val);
    desc.innerHTML = `Please wait... fetching the best result for ${val}`;
    const url = 'https://copilot5.p.rapidapi.com/fitness-trainer';
    const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '9a64f0d648mshfed30c5d1938973p1dcd60jsn6b7c873f4c99',
        'x-rapidapi-host': 'copilot5.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
        message: val,
        conversation_id: null,
        markdown: false,
        photo_url: null
    })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const rost = [result];
        desc.innerHTML = "";
        desc.innerHTML = rost[0].data.message;
        bindData(rost[0].data.sources);
        console.log(rost[0].data.message);
        console.log(rost[0].data.sources);
    } catch (error) {
        console.error(error);
    }
};

let execute = false;
const removeImg = () => {
  if (!execute) {
    // console.log("hello")
    document.getElementById("image_X").src = "";
    execute = true;
  }
};

submit.addEventListener("click", getRecipe);
submit.addEventListener("click", removeImg);
