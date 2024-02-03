// not sure why i need this
function insertHTML() {
	return `
        <div id='mainbox'>
			<div id='spritebox' class='rightalign'>
				<img src=''>
			</div>
			<div id='namebox'>
					<span>Loading...</span>
			</div>
			<div id='textbox'>
				<p>Loading...</p>
				<div id='optionsbox'></div>
			</div>
		</div>
    `
}

const htmlData = insertHTML();
document.getElementById('VisualNoverlEngine').insertAdjacentHTML('beforebegin',
	htmlData);

const vnData = 'data.json';

const $textbox = document.querySelector("#textbox p");
const $optionsbox = document.querySelector('#optionsbox');
const $namebox = document.querySelector('#namebox span');
const $spritebox = document.querySelector('#spritebox img');
const $mainbox = document.querySelector('#mainbox');

let json, to;

var pageNum = 0;
var currentPage;

async function grabData() {
	// load data
	const resp = await fetch(vnData)

	json = await resp.json();

	currentPage = Object.keys(json.Scene1.PAGES)[pageNum];

	// init data 
	initialize(json);
	handleOptions(json);
}

// init data + page turning
async function initialize(data) {
	$spritebox.src = '';
	$namebox.innerText = '';
	$textbox.innerText = '';

	// switch html element based on page turn or program init
	$spritebox.src = data.Characters[data.Scene1.PAGES[currentPage].Character][data.Scene1.PAGES[currentPage].Sprite];

	$namebox.innerText = data.Scene1.PAGES[currentPage].Character;

	$textbox.innerText = data.Scene1.PAGES[currentPage].PageText;

	// I dont think I need this if i just import my images 
	$mainbox.style.backgroundImage = "url(" + data.Scene1.Background + ")";
}

function handleOptions(data) {
	$optionsbox.innerHTML = '';

	if (data.Scene1.PAGES[currentPage].hasOwnProperty('Options')) {
		var 0 = data.Scene1.PAGES[currentPage].Options;
		var str = Object.keys(o).forEach(k => {
			row.innerHTML = `${k}`
			$optionsbox.appendChild(row);
			row.addEventListener('click', () => {
				currentPage = (o[k]);
				pageNum = Object.keys(json.Scene1.PAGES).indexOf(currentPage);
				initialize(json);
				$optionsbox.innerHTML = "";
			})
		})
	}
}

function checkPage(data) {
	if (data.Scene1.PAGES[currentPage].hasOwnProperty('Options'))
		return false;
	if (data.Scene1.PAGES[currentPage].hasOwnProperty('NextPage')) {
		if (data.Scene1.PAGES[currentPage].NextPage == "End")
			return false;
	}
	return true;
}

document.addEventListener('keydown', (e) => {
	if (!json) return;
	if (e.key == "ArrowRight" && checkPage(json)) {
		if (json.Scene1.PAGES[currentPage].hasOwnProperty('NextPage')) {
			currentPage = json.Scene1.PAGES[currentPage].nextPage;
		}
		else {
			pageNum++;
			currentPage = Object.keys(json.Scene1.PAGES)[pageNum];
		}

		initialize(json);
		handleOptions(json);
	}
	else return;
})

// grab data from server 

grabData();