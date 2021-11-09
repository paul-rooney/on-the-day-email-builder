//
// DOM CACHING
//
const form = document.querySelector('form');
const apply_button = form.apply;
const download_button = form.download;
const colour_primary = form.colourPrimary;
const colour_secondary = form.colourSecondary;
const colour_text_primary = form.colourTextPrimary;
const colour_text_secondary = form.colourTextSecondary;
const image_hero = form.imageHero;
const map_venue = form.mapVenue;
const map_latitude = form.mapLatitude;
const map_longitude = form.mapLongitude;

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

const getCSS = () => {
  const allCSS = [...document.styleSheets]
  .map(styleSheet => {
    try {
      return [...styleSheet.cssRules]
      .map(rule => rule.cssText);
    } catch (e) {
      console.warn(e);
    }
  })
  .filter(Boolean);

  return allCSS;
}

const updateMap = () => {
  const latitude = map_latitude.value;
  const longitude = map_longitude.value;
  const map = document.querySelector('#map');
  const src = `https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/static/pin-s-circle+000306(${longitude},${latitude})/${longitude},${latitude},14,0,60/350x233@2x?access_token=pk.eyJ1IjoiYm1mYnVzaW5lc3NzZXJ2aWNlcyIsImEiOiJjazVxenN2OWIwN2FjM29wMnB2bWdjemJ1In0.g39JtZJcvAQiBtu7_3rpTw&attribution=false&logo=false`;

  map.src = src;
}

const selectVenue = (e) => {
  const venue = e.target.value;

  switch (venue) {
    case 'croke_park':
      map_latitude.value = '53.360712';
      map_longitude.value = '-6.2533976';
      break;
    case 'dunboyne_castle':
      map_latitude.value = '53.4172243';
      map_longitude.value = '-6.4797211';
      break;
    case 'europa_hotel':
      map_latitude.value = '54.5948772';
      map_longitude.value = '-5.9373032';
      break;
    case 'galgorm_spa':
      map_latitude.value = '54.8777373';
      map_longitude.value = '-6.3503547';
      break;
    case 'gibson_hotel':
      map_latitude.value = '53.3485617';
      map_longitude.value = '-6.2307056';
      break;
    case 'la_mon_hotel':
      map_latitude.value = '54.5480531';
      map_longitude.value = '-5.8201026';
      break;
    case 'radisson_blu_royal':
      map_latitude.value = '53.3408795';
      map_longitude.value = '-6.2705112';
      break;
    case 'titanic_belfast':
    default:
      map_latitude.value = '54.6080972';
      map_longitude.value = '-5.9110183';
  }

  updateMap();
}



//
// EVENT LISTENERS
//
colour_primary.addEventListener('change', (e) => updateColour('--colour--primary', e));
colour_secondary.addEventListener('change', (e) => updateColour('--colour--secondary', e));
colour_text_primary.addEventListener('change', (e) => updateColour('--colour--text1', e));
colour_text_secondary.addEventListener('change', (e) => updateColour('--colour--text2', e));



image_hero.addEventListener('change', (e) => {
  const new_image = updateHeroImages(e);
  updateVML(document.documentElement, new_image);
});



map_latitude.addEventListener('input', () => updateMap());
map_latitude.addEventListener('change', () => updateMap());
map_longitude.addEventListener('input', () => updateMap());
map_longitude.addEventListener('change', () => updateMap());
map_venue.addEventListener('change', (e) => selectVenue(e));



download_button.addEventListener('click', () => {
    document.querySelector('#script').remove();
    document.querySelector('#control-panel').remove();
    document.querySelector('link[href="./control-panel.css"]').remove();

    const hidden_link = document.createElement('a');

    hidden_link.href = `data:text/html;charset=UTF-8,${encodeURIComponent(document.documentElement.outerHTML)}`;
    hidden_link.target = '_blank';
    hidden_link.download = 'on-the-day.html';
    hidden_link.click();
  },
  { once: true }
);

  // returns everything with a CSS Custom property
  let x = document.querySelectorAll('[style*="var(--"]')

  const propNames = [
    '--colour--primary',
    '--colour--secondary',
    '--colour--text1',
    '--colour--text2',
    '--colour--white',
    '--colour--grey01',
    '--colour--grey02'
  ]

  let htmlStyles = propNames.map((propName, i) => {
    let arr = [
      propNames[i],
      document.documentElement.style.getPropertyValue(propName).trim()
    ]
    return arr;
  });


x.forEach(item => {

  if (item.style.backgroundColor.startsWith('var(--')) {
    console.log(item.nodeName + ' Background color: ' + item.style.backgroundColor);

    propNames.forEach(name => {
      if (item.style.backgroundColor.includes(name)) {
        console.log(name);

        htmlStyles.forEach(obj => {});
      }
    })
    // let bgcolour = getComputedStyle(document.documentElement).getPropertyValue('variable');
    // document.documentElement.style.setProperty('backgroundColor', bgcolour);
  }

  // if (item.style.borderColor.startsWith('var(--')) {
  //   console.log(item.nodeName + ' Border color: ' + item.style.borderColor);
  // }
  //
  // if (item.style.color.startsWith('var(--')) {
  //   console.log(item.nodeName + ' Color: ' + item.style.color);
  // }
});
