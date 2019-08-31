window.onscroll = function() {myFunction()};

function myFunction() {
    if(window.scrollY == 0) {
        document.getElementById("bounceDoubleArrow").style.display = "none";
    }
    else {
        document.getElementById("bounceDoubleArrow").style.display = "inline";
    }
}

// var footerElement = document.getElementsByTagName("footer")[0];
// var bottom = $(window).height();
// console.log(bottom);
// footerElement.style.height = "10px";
// footerElement.offsetTop = (bottom).toString() + "px";
