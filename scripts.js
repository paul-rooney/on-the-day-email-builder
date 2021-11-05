//
// DOM CACHING
//
const form = document.querySelector('form');
const apply_button = form.apply;
const download_button = form.download;
const colour_primary = form.colourPrimary;
const colour_secondary = form.colourSecondary;
const colour_text_primary = form.colourTextPrimary;
const image_hero = form.imageHero;

const hero = document.querySelector('.hero');
const hero_small = document.querySelector('.register');


//
// FUNCTIONS
//
const updateColour = (variable, e) => {
  let colour = getComputedStyle(document.documentElement).getPropertyValue(variable);
  colour = e.target.value
  document.documentElement.style.setProperty(variable, colour);
}

const updateHeroImages = (e) => {
  const file = e.target.files[0];
  const updated_image = document.createElement('img');

  updated_image.src = URL.createObjectURL(file);
  updated_image.width = 640;

  hero.setAttribute(`background`, `${updated_image.src}`);
  hero.style.backgroundImage = `url('${updated_image.src}')`;
  hero.style.backgroundSize = `640px`;

  hero_small.setAttribute(`background`, `${updated_image.src}`);
  hero_small.style.backgroundImage = `url('${updated_image.src}')`;
  hero_small.style.backgroundSize = `640px`;

  return updated_image;
}

const updateVML = (element, image) => {
  const iterator = document.createNodeIterator(element, NodeFilter.SHOW_COMMENT);
  const search_query = '<v:fill';

  let current_value = `<v:fill type="frame" src="./assets/email-master-bg-640x320.jpg" color="#ffffff" />`;
  let updated_value = `<v:fill type="frame" src="${image.src}" color="#ffffff" />`
  let currentNode, start, end;

  while (currentNode = iterator.nextNode()) {
    if (currentNode.nodeValue.includes(search_query)) {
      start = currentNode.nodeValue.indexOf(search_query);
      end = start + search_query.length;

      currentNode.nodeValue = currentNode.nodeValue.replace(current_value, updated_value);
    }
  }
}



//
// EVENT LISTENERS
//
colour_primary.addEventListener('change', (e) => updateColour('--colour--primary', e));

colour_secondary.addEventListener('change', (e) => updateColour('--colour--secondary', e));

colour_text_primary.addEventListener('change', (e) => updateColour('--colour--text1', e));

image_hero.addEventListener('change', (e) => {
  const new_image = updateHeroImages(e);
  updateVML(document.documentElement, new_image);
});
