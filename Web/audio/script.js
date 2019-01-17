window.addEventListener("load", function(evt) {
    var slider = document.getElementById("volume");
    var text = document.getElementById("volumedisplay");
    
    slider.oninput = function() {
        text.innerHTML = this.value;
    }
});