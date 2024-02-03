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

