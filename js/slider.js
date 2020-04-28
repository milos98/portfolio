var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("project");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

let slide = $("#slides");
if (screen.width < 769) {

  slide.on('swipeleft', function (e) { 
    e.preventDefault();
    slide.slideIt({direction:"left"});
  });

  slide.on('swiperight', function (e) {
    e.preventDefault(); 
    slide.slideIt({direction:"right"});
  });
}

fetch('projects.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let templateProject = $(".project").prop('outerHTML');
    let templateDot = $(".dot").prop('outerHTML');

    ((data.projects).reverse()).forEach(element => {
      if(element.id != 0) {
        let t = templateProject;
        let d = templateDot;
        
        $('.slider').append(t);
        $('.dots').append(d);
        console.log("doneA");
      }
      document.getElementById('%id-temp%').style = `background: url('img/${element.image}');`;
      document.getElementById('%id-temp%').id = element.id;
      document.getElementById('%project-name-temp%').innerHTML = element.project_name;
      document.getElementById('%project-name-temp%').id = `project-neme-${element.id}`;
      document.getElementById('%position-temp%').innerHTML = element.position;
      document.getElementById('%position-temp%').id = `position-temp-${element.id}`;
      document.getElementById('%a%').href = element.link;
      document.getElementById('%a%').id = `a-${element.id}`;
      document.getElementById('dot').setAttribute("onClick",`currentSlide(${element.id})`);
      document.getElementById('dot').id = `dot${element.id}`;
    });
  })
  .then(()=>{
    showSlides(slideIndex)
  });

