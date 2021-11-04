//
// DOM CACHING
//
const form = document.querySelector('form');
const apply_button = form.apply;
const download_button = form.download;
const colour_primary = form.colourPrimary;
const colour_secondary = form.colourSecondary;
const image_hero = form.imageHero;


const updatePrimaryColour = () => {}

const updateSecondaryColour = () => {}

colour_primary.addEventListener('change', (e) => {
  let colour = getComputedStyle(document.documentElement).getPropertyValue('--colour--primary');

  colour = e.target.value;

  document.documentElement.style.setProperty('--colour--primary', colour);
});

colour_secondary.addEventListener('change', (e) => {
  let colour = getComputedStyle(document.documentElement).getPropertyValue('--colour--secondary');

  colour = e.target.value;

  document.documentElement.style.setProperty('--colour--secondary', colour);
});





function getAllComments(rootElem) {
  const comments = [];
  const iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT);
  const str = `<v:fill`;

  let currentNode;

  let startIndex;
  let endIndex;

  let img_src = `https://picsum.photos/640/240`;
  let substr = `<v:fill type="frame" src="./assets/email-master-bg-640x320.jpg" color="#ffffff" />`;
  let newSubstr = `<v:fill type="frame" src="${img_src}" color="#ffffff" />`;

  while (currentNode = iterator.nextNode()) {
    if (currentNode.nodeValue.includes(str)) {

      startIndex = currentNode.nodeValue.indexOf(str);
      endIndex = startIndex + substr.length;

      console.log('initial value: ' + currentNode.nodeValue);
      let newValue = currentNode.nodeValue.replace(substr, newSubstr);
      currentNode.nodeValue = newValue;
      console.log('updated value: ' + currentNode.nodeValue);

      // currentNode.nodeValue =

      comments.push(currentNode.nodeValue);

    }

    // comments.push(currentNode.nodeValue);
    // comments.push({currentNode});
  }

  // comments[3].nodeValue = 'AMENDED';

  return comments;
}

window.addEventListener("load", function() {
    console.log(getAllComments(document.body));
});
