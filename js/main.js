function addActiveClass(e, lis) {
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  e.target.classList.add("active");
}

let settings = document.querySelector(".settings");
let sets = document.querySelector(".sets-div i");
let options = document.querySelector(".options");
let yes = document.querySelector("span.Yes");
let no = document.querySelector("span.No");
sets.onclick = function () {
  settings.classList.toggle("open");
  sets.classList.toggle("fa-spin");
};
settings.onclick = function (e) {
  e.stopPropagation(); // inside settings too
};
document.body.onclick = function (e) {
  if (!e.target.classList.contains("settings")) {
    if (settings.classList.contains("open")) {
      settings.classList.remove("open");
      sets.classList.remove("fa-spin");
    }
    // tap anywhere to close settings if it is open
  }
};
let Lis = document.querySelectorAll(".settings ul li");
if (localStorage.color) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.color
  );
  switch (localStorage.color) {
    case "#0bc9b6": {
      document.querySelector(".landing img").src = "images/landing-5.png";
      break;
    }
    case "#6b05e0": {
      document.querySelector(".landing img").src = "images/landing-2.png";
      break;
    }
    case "#F00": {
      document.querySelector(".landing img").src = "images/landing-3.png";
      break;
    }
    case "#2196f3": {
      document.querySelector(".landing img").src = "images/landing-1.png";
      break;
    }
    case "#ffa319": {
      document.querySelector(".landing img").src = "images/landing-4.png";
      break;
    }
  }
  Lis.forEach((li) => {
    if (li.dataset.color !== localStorage.color) {
      li.classList.remove("active");
    } else {
      li.classList.add("active");
    }
  });
}
if (localStorage.bullet) {
  if (JSON.parse(localStorage.bullet)) {
    options.style.opacity = "1";
    options.style.right = "5px";
    no.classList.remove("active");
    yes.classList.add("active");
  } else {
    options.style.opacity = "0";
    options.style.right = "-15px";
    no.classList.add("active");
    yes.classList.remove("active");
  }
}

Lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color", e.target.dataset.color);
    addActiveClass(e, Lis);
    switch (e.target.dataset.color) {
      case "#0bc9b6": {
        document.querySelector(".landing img").src = "images/landing-5.png";
        break;
      }
      case "#6b05e0": {
        document.querySelector(".landing img").src = "images/landing-2.png";
        break;
      }
      case "#F00": {
        document.querySelector(".landing img").src = "images/landing-3.png";
        break;
      }
      case "#2196f3": {
        document.querySelector(".landing img").src = "images/landing-1.png";
        break;
      }
      case "#ffa319": {
        document.querySelector(".landing img").src = "images/landing-4.png";
        break;
      }
    }
  });
});

// let images = ["landing-2.png","landing-4.png","landing-5.png","landing-6.png"];
// setInterval(function() {
//     document.querySelector(".landing img").src = `images/${images[Math.floor(Math.random() * images.length)]}`
// },15000)

let arrayOfOffsets = [
  document.getElementById("header"),
  document.getElementById("articles"),
  document.getElementById("gallery"),
  document.getElementById("features"),
  document.getElementById("tests"),
  document.getElementById("team"),
  document.getElementById("services"),
  document.getElementById("skills"),
  document.getElementById("work"),
  document.getElementById("events"),
  document.getElementById("pricing"),
  document.getElementById("videos"),
  document.getElementById("statists"),
  document.getElementById("discount"),
  document.getElementById("footer"),
];
let lis = document.querySelectorAll(".options li");

lis.forEach((li) => {
  li.addEventListener("click", function (e) {
    addActiveClass(e, lis);
    document.querySelector(`#${e.target.dataset.id}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});
//  Skills Transition
let skills = document.querySelector(".skills");
let skillsContainer = document.querySelector(".skills .container");

window.onscroll = function () {

  if (window.pageYOffset >= 400) {
    options.style.opacity = "1";
    options.style.right = "5px";
  }
  
  let skillsTop = skills.offsetTop; // the height of all content before skills
  let skillsContainerHeight = skillsContainer.offsetHeight; // the height of the container
  let windowHeight = this.innerHeight; // height of window
  let windowscrollTop = this.pageYOffset; // scrolled height
  if (windowscrollTop >= skillsTop + skillsContainerHeight - windowHeight) {
    document.querySelectorAll(".total span").forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }

  // bullets

  arrayOfOffsets.forEach((sec) => {
    if (window.pageYOffset >= sec.offsetTop - 200) {
      lis.forEach((li) => {
        if (li.dataset.id === sec.id) {
          li.classList.add("active");
        } else {
          li.classList.remove("active");
        }
      });
    }
  });
  if (JSON.parse(localStorage.bullet)) {
    if (window.pageYOffset >= 100) {
      options.style.opacity = "1";
      options.style.right = "5px";
    } else {
      options.style.opacity = "0";
      options.style.right = "-15px";
    }
  }
};

//gallery

let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let img = document.querySelector(".img-box img");
    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    img.src = e.target.src;
    overlay.onclick = function () {
      if (overlay.style.display === "block") {
      }
      overlay.style.display = "none";
    };
    let close = document.querySelector(".img-box span");
    close.onclick = function () {
      overlay.style.display = "none";
    };
  });
});

// bullets yes/no

let choice = document.querySelectorAll(".choice span");

choice.forEach((span) =>
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("Yes")) {
      no.classList.remove("active");
      yes.classList.add("active");
      if (window.pageYOffset >= 400) {
        options.style.opacity = "1";
        options.style.right = "5px";
      }
      localStorage.bullet = "true";
    } else {
      no.classList.add("active");
      yes.classList.remove("active");
      options.style.opacity = "0";
      options.style.right = "-15px";
      localStorage.bullet = "false";
    }
  })
);

//reset

let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  localStorage.clear(); // if there were other things in local its better to remove()
  window.location.reload();
});

// Mega Menu

let myLink = document.querySelector(".header .main-menu li#other-link");
let megaMenu = document.querySelector(".mega-menu");
myLink.addEventListener("click", () => {
  megaMenu.classList.toggle("mega-menu-show");
});

// CountDown

let countDownDate = new Date("August 31,2022 23:59:59").getTime();
let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let dateDiff = countDownDate - dateNow;
  // Get Time Units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.getElementById("Days").innerHTML = days;
  document.getElementById("Hours").innerHTML = hours;
  document.getElementById("Minutes").innerHTML = minutes;
  document.getElementById("Seconds").innerHTML = seconds;
}, 1000);
