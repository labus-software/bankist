'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// document.querySelectorAll('.nav__link').forEach(el=>
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   }))

// 1. add event listener to common parent element

document.querySelector('.nav__links').addEventListener('click', 
smoothPageNav);

// 2. determine what element originated the event
// we do EVENT delegation so that we don't repeat listener functions
// on the page where are multiple links
// (look lines of code 33-39)
// multiple listeners will slow down our app

// 3. implement matching strategy 

function smoothPageNav(e){
  e.preventDefault();
  
  // matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href'); 
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
}

// Select
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
//console.log(allSections);

//Create
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use coookies...';
message.innerHTML = "We use coookies... <button class='btn btn--close-cookie'>Got it</button>";

//Insert
header.prepend(message);

//Delete elements

document.querySelector('.btn--close-cookie').addEventListener('click', ()=>{
  message.remove();
});


//Styles

message.style.backgroundColor = 'cornflowerblue';
message.style.width = '120%';
message.style.padding = '5px';

document.documentElement.style.setProperty('--color-primary', '#ce1141');

//Attributes

const logo = document.querySelector('.nav__logo');

// console.log(logo.src); //absolute path
// console.log(logo.getAttribute('src')); //img relative path
logo.setAttribute('company', 'Bifrost'); 
// console.log(logo.getAttribute('company'))//company attr value

//Data attributes

// console.log(logo.dataset.versionProx); //dataset no

//Classes

logo.classList.add('s'); 
logo.classList.toggle('s');
logo.classList.contains('s');
logo.classList.remove('s');

const btnScrollTo = document
.querySelector('.btn--scroll-to');
const section1 = document
.querySelector('#section--1');

btnScrollTo.addEventListener('click',
(e) => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll x/y ',
 // window.pageXOffset, window.pageYOffset);

  // console.log('height/width viewport ', 
  // document.documentElement.clientHeight,
  // document.documentElement.clientWidth);

  //Scrooling

  // window.scrollTo(s1coords.left + 
  //   window.pageXOffset, s1coords.top
  //   + 
  //   window.pageYOffset);

  //Smooth scrolling -- OLDSCHOOL

  // window.scrollTo({
  //   left: s1coords.left + 
  //   window.pageXOffset, 
  //   top: s1coords.top
  //   + 
  //   window.pageYOffset,
  // behavior: 'smooth'});


  //Smooth scrolling -- MODERN WAY

  section1.scrollIntoView({behavior: 'smooth'})

})


// TABBED COMPONENT - On btn click present different content

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  // guard clause
  if(!clicked) return;

  // active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  tabsContent.forEach(tab => tab.classList.remove('operations__content--active')); // first remove
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); //activate
});


// MENU FADE ANIMATION

const nav = document.querySelector('.nav');

function fadeHandler(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    })
    
    logo.style.opacity = opacity;
  }
}

// Passing argument can also be done with bind method
// fadeHandler.bind(opacity-value)
// as callback f use like:: fadeHandler(0.5)

nav.addEventListener('mouseover', (e) => fadeHandler(e, 0.5));
nav.addEventListener('mouseout', (e) => fadeHandler(e, 1));


// STICKY NAVIGATION

// get initial coordinates with getBoundingClientRect
// const initialCoords = section1.getBoundingClientRect();

// // scroll function is also available on window object
// // not efficent, usually it should be avoided, fires events all the time
// // bad for performance
// // this is one way of doing it
// window.addEventListener('scroll', () => {
//   window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
// });

//////////////////////////////////////////////////////////////
///// Here is the other, modern way: INTERSECTION OBSERVER API

/////////////////////////
// const obsCallback = (entries, observer) => {
//   // entries are array of threshold entries 
//   entries.forEach(entry => console.log(entry))
// }
// const obsOptions = {
//   root:null, // target element we want to intersect, null (target el observes entire viewport)
//   threshold:[ 0, 0.24 ]// % of intersection in which observer callback will be called
//   // threshold is percentage that we want to be visible in our root, if it is less than 10%
//   // it's no longer intersecting
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions); // create observer
// observer.observe(section1); // method to start observing
/////////////////////

////////////////
// STICKY NAV OBSERVER
//////////////////////

const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries){
  const [entry] = entries;
  !entry.isIntersecting ? nav.classList.add('sticky') :  nav.classList.remove('sticky'); 
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // because we are intreset in entire viewport
  threshold: 0, // if 0 percent of HEADER is visible, something will happen
  rootMargin: `-${navHeight}px` // specify kind of margin when to intersect, only px unit works 
})
headerObserver.observe(header);

/////////////////////
// REVEAL SECTIONS
////////////////////////

// logic of observer
const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

// this is setup of observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
})

/////////////////////////////////
//////// LAZY LOADING IMAGES
////////////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

// console.log(imgTargets)

function loadImg(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  // REPLACE SRC WITH DATA-SRC (smalll image with image full capacity)

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target); // for performance, turn off observer
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold:0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////

///////////////////////////////
// SLIDER ///////////
//////////////////////////////

const slider = () => {

const slides = document.querySelectorAll('.slide');
const btnLeftSlider = document.querySelector('.slider__btn--left');
const btnRightSlider = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

///////////////////////////
// SLIDER FUNCTIONS
//////////////////////////

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"/>`)
  })
}

const activeDot = (slide) => {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

function goToSlide(slide){
  slides.forEach((s,i) => s.style.transform = `translateX(${100*(i - slide)}%)`);
}

// NEXT SLIDE ///////////
const nextSlide = () => {
  if(currentSlide === maxSlide - 1 ){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
}
// PREVIOUS SLIDE ///////////
const prevSlide = () => {
  if(currentSlide === 0){
    currentSlide = maxSlide - 1 ;
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

const init = () => {
  goToSlide(0);
  createDots();
  activeDot(0);
}

init();

/////////////////////////////////////////
// EVENT HANDLERS ///////////////////////
/////////////////////////////////////////

btnRightSlider.addEventListener('click', nextSlide);
btnLeftSlider.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
})

dotContainer.addEventListener('click', (e)=> {
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
})

}

slider();

// const h1 = document.querySelector('h1');

// h1.addEventListener('click', ()=>{
//   alert('Heeeey yaaaa!')
// })

// //rgb 255 255 255

// const randomInt = (min, max) =>
// Math.floor(Math.random() * (max-min + 1) + min);

// const randomColor = () => `rgba(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// console.log(randomColor());


//Event Handler F + event Propagation

// const navLink = document.querySelector('.nav__link');
// const nav = document.querySelector('.nav');
// const navLinks = document.querySelector('.nav__links');

// navLink.addEventListener('click', (e)=>{
//   navLink.style.backgroundColor = randomColor()

//   console.log('link', e.currentTarget)

//   e.stopPropagation()
  
// });

// nav.addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()  
//   console.log('container', e.currentTarget)
// })
// navLinks.addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('links', e.currentTarget)
// })

// going downwards: CHILD
 const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// child nodes list all elements that belong
// to h1 tag
// text, comment, span with highglight class, br tag
// even /n (new line) is read as text element
// childNodes is not in use 
// beacuse it returns everything 
// instead we use
// .children property 
// which returns html collection of ELEMENTS
// so only elements we can use and manipulate will apear

// console.log(h1.children);

 h1.firstElementChild.style.color = 'orangered';
 h1.lastElementChild.style.color = 'cornflowerblue';

// going upwards: PARENT

// console.log(h1.parentNode)
// console.log(h1.parentElement)

// parent NODE and parent ELEMENT return same thing
// parent
// use closest method 

h1.closest('.header').style.backgroundColor = 
'var(--color-primary-opacity)';

// going SIDEWAYS : SIBLINGS

// console.log(h1.previousElementSibling)
h1.nextElementSibling.style.backgroundColor = 'teal';
h1.nextElementSibling.style.color = '#fff';
h1.nextElementSibling.style.padding = '20px';
h1.nextElementSibling.style.borderRadius = '15px';
h1.nextElementSibling.style.border = '2px solid #333';

[...h1.parentElement.children].forEach((el) =>{
  el !== h1 ? el.style.transform = 'scale(.72)': null
});

///////////////
// DOMContentLoaded - execute code after the DOM is ready
// 

document.addEventListener('DOMContentLoaded', (e)=> {
  console.log("HTML parsed and DOM tree built!", e);
})

