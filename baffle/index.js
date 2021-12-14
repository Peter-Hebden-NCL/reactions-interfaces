
// Initial variables
// HERE


// DELAY ON PAGE LOAD TO MAKE SURE EVERYTHING LOADS PROPERLY
$(document).ready(function(){
    setTimeout( $("#instruction").addClass("invis"), 6000);
})

// COUNTING ALL WORDS AND LINES IN THE POEM

line_num = 1;

$("#container p").each(function(){
    if ( $(this).html() != "&nbsp;" ) {
        $(this).addClass("line "+String(line_num));
        
        
        word_num = 1;
        $(".line."+String(line_num)+" span").each(function() {
            $(this).addClass("word "+String(word_num));
            word_num = word_num + 1;
        })

        line_num = line_num+1;
    }
});

total_words = 0;
$("span").each(function(){
    total_words = total_words + 1;
    start_word = Math.floor(Math.random()*120);
    if (start_word < 3) {
        $(this).addClass("revealed");
    }
});


// FUNCTION TO CONTROL THE SLOW REVEAL OF THE TEXT

function grow() {
    console.log("growing...");
    total_revealed = 0;
    $(".revealed").each(function(){
        total_revealed = total_revealed + 1;
        will_grow = Math.random();
        if (will_grow >= 0.5) {
            agitate(this);
        }
    });

    if (total_revealed == total_words) {
        clearInterval(start_growing);
        $("#title").addClass("revealed");
    }
};

//FUNCTION TO REGISTER USER INTERACTION AND MAKE WORDS APPEAR AT THAT POINT 

function agitate(spot) {
    //getting line position
    parent_classes = $(spot).parent().attr("class").split(" ");
    for (l in parent_classes) {
        if ( Number.isInteger(parseInt(parent_classes[l])) ) {
            line_pos = parseInt(parent_classes[l]);
            console.log("line "+line_pos);
        }
    }

    //getting word position
    word_classes = spot.className.split(" ");
    for (n in word_classes) {
        if ( Number.isInteger(parseInt(word_classes[n])) ) {
            word_pos = parseInt(word_classes[n]);
            console.log("word "+word_pos);
        }
    }

    dir_y = Math.floor(Math.random()*3)-1;
    console.log(dir_y);
    dir_x = Math.floor(Math.random()*3)-1;
    console.log(dir_x);

    new_line_pos = line_pos+dir_y;
    new_word_pos = word_pos+dir_x;

    $(".line."+String(new_line_pos)+" .word."+String(new_word_pos)).addClass("revealed");
}


// APPLYING AGITATE FUNCTION TO ALL HIDDEN WORDS ON THE SCREEN
$("span").click(function(){
    if ( !($(this).hasClass("revealed")) ) {
        $(this).addClass("revealed");
    }
    agitate(this);
});

//CONTROL FOR THE RESTART BUTTON
$("#restart").click(function(){
    current_line = 0;
        current_seg = "b";
        $(".seg").removeClass("revealed");
        $("#title p").addClass("revealed");
        $("#restart").addClass("invis");
});

// TRIGGERING THE REVEAL PROCESS TO START AND PROGRESS AT A REGULAR INTERVAL
start_growing = setInterval(function(){grow()}, 3000);

