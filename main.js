
const iconSection = document.querySelector('#icon-display');
const svgPath = './icons.json';
const form = filter;
const svgSpritePath = './svg-def.svg';

addEventListener("DOMContentLoaded", createIcons);

function createIcons () {
    fetch(svgPath)
  .then(response => response.json())
  .then(result => markupBuild(result));
}

function markupBuild (json) {
    const elements = json.children
    
    elements.forEach((el,i) => {
      let idAttr = el.attributes.id;
      // console.log(idAttr)
        if(idAttr && idAttr != '.DS_Store') {
            let id = el.attributes.id
            let iconContainer = document.createElement('div');
            iconContainer.classList.add(`hrvg-icon-${id}`, 'icon')
            iconContainer.style.setProperty('--link',`url(${svgSpritePath}#${id})`)
            // console.log(`url(./svg-def.svg#${id})`)
            iconSection.append(iconContainer)

        }
    });

}

filter.addEventListener('submit', (e)=>{
    e.preventDefault();
    let value = filter.elements[0].value;

    let icons = document.getElementsByClassName('icon');
    console.log(icons)
  // Itera sui div e controlla le classi
  for (let icon of icons) {
    if (icon.className.includes(value)) {
      icon.style.border = '2px solid red';  // Applica lo stile desiderato
    }
  }
})