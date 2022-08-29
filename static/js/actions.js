
//orizoume auti tin metavliti oste na min fortonei mono mia fora ta components
var function_activation = 1;

//component registration for in-built events (this case, fired when marker is detected)
AFRAME.registerComponent('markerhandler', {
    init: function () {
        this.el.addEventListener('markerFound', (evt) => {
            console.log("marker found");
            console.log(evt);

            const scene = AFRAME.scenes[0];
            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
            mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
            scene.appendChild(mouseCursor);


            while (function_activation == 1) {
                create_panel();
                function_activation = 0;
            }





        })

    }
});


function my_func() {
    console.log("TESTTTTTTTTTTTTTTTTTTTTT PASSED ");
};



function create_panel() {
    $.ajax({
        type: "GET",
        url: "/create/panel",
        success: function (result) {

            console.log(result[0].rows[0]) //permissions
            console.log(result[1].rows[0]) //attributes
            console.log(result[2].rows[0]) //values
            console.log(result[3].rows[0]) // columns names

            //best to define the mouse cursor after the scene initialisation, to get appropriate
            //Evala pano ton coursor mipos ftaiei ayto kai den leitourgei to on state
            /*
            const scene = AFRAME.scenes[0];
            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
            mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
            scene.appendChild(mouseCursor);*/



            for (let i = 1; i < Object.keys(result[0].rows[0]).length; i++) {

                var permisson = "result[0].rows[0]"
                var per_value = eval(permisson + '.' + result[3].rows[i].column_name)

                if (per_value == 1) {

                    var data = "result[1].rows[0]"
                    var d_value = eval(data + '.' + result[3].rows[i].column_name)
                    console.log(d_value)

                    var values = "result[2].rows[0]"
                    var v_value = eval(values + '.' + result[3].rows[i].column_name)
                    console.log(v_value)

                    var functions = "result[4].rows[0]"
                    var f_value = eval(functions + '.' + result[3].rows[i].column_name)
                    console.log(f_value)



                    if (d_value == 'a-gui-button') {
                        const controlpanel = document.getElementById('thepanel');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '2');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', result[3].rows[i].column_name + "ON/OFF");
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('background-color', v_value);
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', result[3].rows[i].column_name)

                        controlpanel.appendChild(widget);
                    }
                    else {
                        const controlpanel = document.getElementById('thepanel');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '2.1');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', result[3].rows[i].column_name);
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('percent', v_value);
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', result[3].rows[i].column_name)

                        controlpanel.appendChild(widget);

                    }




                }


            }


        }

    });
};



function ajaxGet() {
    $.ajax({
        type: "GET",
        url: "/get/info",
        success: function (result) {
            console.log(result)
            return result;
        }
    });

}



function lamp_on_off() {
    $.ajax({
        type: "GET",
        url: "/get/on/off",
        success: function (result) {
            if (result == '#FF5252') {
                const lamp_switch = document.getElementById('power');
                lamp_switch.setAttribute('value', 'power ON')
                lamp_switch.setAttribute('background-color', '#00FF00')

            }
            else {
                const lamp_switch = document.getElementById('power');
                lamp_switch.setAttribute('value', ' power OFF')
                lamp_switch.setAttribute('background-color', '#FF5252')
            }
        }
    });
};

function lamp_diming(click, percent) {
    var data = percent
    //console.log(data)
    $.ajax({
        type: "POST",
        url: "/get/diming",
        data: { 'value': data },
        success: function (result) {
            console.log(result)
        }
    });
};


function change_color() {

    var colors = ['#E0E0E0', '#FF0000', '#FF8000', '#00CC00', '#0000FF']
    var c_names = ['REGULAR WHITE', 'RED', 'ORANGE', 'GREEN', 'BLUE']

    $.ajax({
        type: "POST",
        url: "/change/color",
        success: function (result) {
            //console.log(result)

            var potition = parseInt(result) + 1

            //DEN ALLAZOUN SOSTA TA NOUMERA
           

            if (potition == colors.length -1 ) {
                potition = 0
              }

            console.log(potition)

            

            const rgb = document.getElementById('color');
            rgb.setAttribute('value', c_names[potition])
            rgb.setAttribute('background-color', colors[potition])



        }
    });
};






/*
--- comments for next session 

1) εχει δουλεψει το on_off τωρα πρεπει μετα να κανω λογικα ενα νεο πινακα ωστε να κανει assign 
απευθειας τα functions στα σωστα κουμπια ενα ενα 

2) μετα να φτιαξω τα functions για το τι θα κανει καθε κουμπι για το καθενα

3) και τελος να βλεπω πως να μπει μεσα σε ολο αυτο να παιρνει τον clearence code του ανθρωπου
και να του δινει τα καταλληλα εργαλεια αναλογα με την δικαιοδοσια του 

4) πολυ μετα απο αυτο να κανω απλα και αλλο ενα marker scene 

5) πρεπει να φτιαξω στα functions των αλλαγων να τσεκαρει το res αν ειναι οκ και αν δεν ειναι
    να πεταει σφαλμα οτι η τιμη δεν αλλαξε



*/