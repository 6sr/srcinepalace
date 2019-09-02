window.onscroll = function() {myFunction()};

function myFunction() {
    if(window.scrollY == 0) {
        // Removes arraw when on top of page
        document.getElementById("bounceDoubleArrow").style.display = "none";
    }
    else {
        // Shows arraw when not on top of page
        document.getElementById("bounceDoubleArrow").style.display = "inline";
    }
}

