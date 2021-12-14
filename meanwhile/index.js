
// Initial variables
//

// counters for current progression through the text 
current_line = 0;
current_seg = "b";

// revealing the poem title when everything has loaded
$(document).ready(function(){
    setTimeout( $("#title p").addClass("revealed"), 1000);
})

// hiding instructions panel as soon as the user interacts with the screen
$(document).click(function(){
    if ( !($("#instruction").hasClass("invis")) ) {
        $("#instruction").addClass("invis")
    }
});

// function to control the revela of the text based on user input (down or right key/swipe)
function read_on(move) {
    //identifying new position
    if (move == "down") {
        current_line = current_line + 1;
    }
    if (move == "right") {
        if (current_seg == "a") {
            current_seg = "b";
        } else {
            if (current_seg == "b") {
                current_line = current_line + 1;
                current_seg = "a";
            }
        }
    }
    new_pos_selector = ".line."+String(current_line) + " .seg."+current_seg;
    //displaying new segment
    $(new_pos_selector).addClass("revealed");

    if (current_line == 14) {
        $("#restart").removeClass("invis");
    }

}

//controlling the Restart button - resetting and hiding the poem
$("#restart").click(function(){
    current_line = 0;
        current_seg = "b";
        $(".seg").removeClass("revealed");
        $("#title p").addClass("revealed");
        $("#restart").addClass("invis");
});

//detecting key presses by the user 
$(document).keydown(function(event){
    dir = null;
    if (event.which == 40) {
        dir = "down";
    }
    if (event.which == 39) {
        dir = "right";
    }
    console.log(dir);
    if (dir != null) {
        read_on(dir); 
    }
  });

// adding touchscreen capability
$(function() {      
    //Enable swiping...
    $(document).swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        
        if ( !($("#instruction").hasClass("invis")) ) {
                $("#instruction").addClass("invis")
        }

        if (direction == "down" || direction == "right") {
            read_on(direction);
        }
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:10
    });
});


$("#title").click(function(){
    current_line = 0;
    current_seg = "b";
    $(".seg").removeClass("revealed");
    $("#title p").addClass("revealed");
});


