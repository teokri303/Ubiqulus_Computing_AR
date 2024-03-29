var coursor_activation = 1;

//orizoume auti tin metavliti oste na min fortonei mono mia fora ta components
// 1 shmainei oti den exei energopoihthei kai theloyme na energopoihthei
var lamp_function_activation = 1;

// fires the events after marker detection
AFRAME.registerComponent('markerhandler', {
    init: function () {
        this.el.addEventListener('markerFound', (evt) => {
            console.log("marker found");
            console.log(evt);

            //mouse cursor shouldnt added more than one time dhmiourgei buggs an den perioristei
            if (lamp_function_activation == 1 && coursor_activation == 1 ) {
                const scene = AFRAME.scenes[0];
                const mouseCursor = document.createElement('a-entity');
                mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
                mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
                scene.appendChild(mouseCursor);

                lamp_create_panel();
                lamp_function_activation = 0;
                coursor_activation = 0;
            }
            else if (lamp_function_activation == 1 && coursor_activation == 0) {
                lamp_create_panel();
                lamp_function_activation = 0;

            }
        })
    }
});


function lamp_create_panel() {
    $.ajax({
        type: "GET",
        url: "/lamp/create/panel",
        success: function (result) {

            //console.log(result[0][0].rows[0]) //permissions
            //console.log(result[0][1].rows[0]) //attributes
            //console.log(result[0][2].rows[0]) //values
            //console.log(result[0][3].rows[0]) // columns names
            //console.log(result[0][4].rows[0]) // functions

            //console.log(result[1]) // user permission
            var status = result[1]
            // status = 1 shmainei oti einai proffesional user kai exei ola ta permissions
            // status = 0 shmainei oti einai apla regular user kai exei mono ta epitrepta permissions



            for (let i = 1; i < Object.keys(result[0][0].rows[0]).length; i++) {

                //xrhsimopoio to eval  gia na kano ta onomata pou xreiazomai metavlitew oste na mporesoyn na xrisimopoihthoun
                // ws orismata gia ta apotelesmata mou

                var permisson = "result[0][0].rows[0]"
                var per_value = eval(permisson + '.' + result[0][3].rows[i].column_name)

                if (per_value == 1 || status == 1) {

                    var data = "result[0][1].rows[0]"
                    var d_value = eval(data + '.' + result[0][3].rows[i].column_name)
                    //console.log(d_value)

                    var values = "result[0][2].rows[0]"
                    var v_value = eval(values + '.' + result[0][3].rows[i].column_name)
                    //console.log(v_value)

                    var functions = "result[0][4].rows[0]"
                    var f_value = eval(functions + '.' + result[0][3].rows[i].column_name)
                    //console.log(f_value)



                    if (d_value == 'a-gui-button') {
                        const controlpanel = document.getElementById('thepanel');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '2');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', result[0][3].rows[i].column_name + "ON/OFF");
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('background-color', v_value);
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', result[0][3].rows[i].column_name)

                        controlpanel.appendChild(widget);
                    }
                    else {
                        const controlpanel = document.getElementById('thepanel');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '2.1');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', result[0][3].rows[i].column_name);
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('percent', v_value);
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', result[0][3].rows[i].column_name)

                        controlpanel.appendChild(widget);

                    }




                }


            }


        }

    });
};





var blinds_function_activation = 1;
AFRAME.registerComponent('markerhandler2', {
    init: function () {
        this.el.addEventListener('markerFound', (evt) => {
            console.log("marker 2 found");
            console.log(evt);

            //mouse cursor shouldnt added more than one time dhmiourgei buggs an den perioristei

            //mouse cursor shouldnt added more than one time dhmiourgei buggs an den perioristei
            if (blinds_function_activation == 1 && coursor_activation == 1 ) {
                const scene = AFRAME.scenes[0];
                const mouseCursor = document.createElement('a-entity');
                mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
                mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
                scene.appendChild(mouseCursor);

                blinds_create_panel();
                blinds_function_activation = 0;
                coursor_activation = 0;
            }    
            else if(blinds_function_activation == 1 && coursor_activation == 0 ){
                blinds_create_panel();
                blinds_function_activation = 0;
            }    

        })
    }
});

function blinds_create_panel() {
    $.ajax({
        type: "GET",
        url: "/blinds/create/panel",
        success: function (result) {

            //console.log(result[0][0].rows[0]) //permissions
            //console.log(result[0][1].rows[0]) //attributes
            //console.log(result[0][2].rows[0]) //values
            //console.log(result[0][3].rows[0]) // columns names
            //console.log(result[0][4].rows[0]) // functions

            //console.log(result[1]) // user permission
            const status = result[1]
            // status = 1 shmainei oti einai proffesional user kai exei ola ta permissions
            // status = 0 shmainei oti einai apla regular user kai exei mono ta epitrepta permissions



            for (let i = 1; i < Object.keys(result[0][0].rows[0]).length; i++) {

                const permisson = "result[0][0].rows[0]"
                const per_value = eval(permisson + '.' + result[0][3].rows[i].column_name)

                if (per_value == 1 || status == 1) {

                    var data = "result[0][1].rows[0]"
                    var d_value = eval(data + '.' + result[0][3].rows[i].column_name)
                    //console.log(d_value)

                    var values = "result[0][2].rows[0]"
                    var v_value = eval(values + '.' + result[0][3].rows[i].column_name)
                    //console.log(v_value)

                    var functions = "result[0][4].rows[0]"
                    var f_value = eval(functions + '.' + result[0][3].rows[i].column_name)
                    //console.log(f_value)

                    var labels = ["Shades UP/DOWN", "Antiglare Mode", "Smode"]

                    if (d_value == 'a-gui-button') {
                        let id = result[0][3].rows[i].column_name + '2'
                        console.log(id)
                        const controlpanel = document.getElementById('thepanel2');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '2');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', labels[i-1] );
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('background-color', v_value);
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', id)

                        controlpanel.appendChild(widget);
                    }
                    else {
                        let id = result[0][3].rows[i].column_name + '2'
                        console.log(id)
                        const controlpanel = document.getElementById('thepanel2');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '0.4');
                        widget.setAttribute('height', '1');
                        widget.setAttribute('value', labels[i-1]);
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('percent', v_value);
                        widget.setAttribute('margin', "0 0 0.2 0");
                        widget.setAttribute('onclick', f_value);
                        widget.setAttribute('id', id)

                        controlpanel.appendChild(widget);

                    }




                }


            }


        }

    });
};









//----------------------------- lamp functions ----------------------------------------------------|

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


function lamp_change_color() {

    var colors = ['#E0E0E0', '#FF0000', '#FF8000', '#00CC00', '#0000FF']
    var c_names = ['REGULAR WHITE', 'RED', 'ORANGE', 'GREEN', 'BLUE']

    $.ajax({
        type: "POST",
        url: "/change/color",
        success: function (result) {
            //console.log(result)

            var potition = parseInt(result)

            console.log(potition)



            const rgb = document.getElementById('color');
            rgb.setAttribute('value', c_names[potition])
            rgb.setAttribute('background-color', colors[potition])



        }
    });
};


function lamp_smode_on_off() {
    $.ajax({
        type: "GET",
        url: "/smode/on/off",
        success: function (result) {
            if (result == '#FF5252') {
                const smode_switch = document.getElementById('smode');
                smode_switch.setAttribute('value', 'smode ON')
                smode_switch.setAttribute('background-color', '#00FF00')

            }
            else {
                const smode_switch = document.getElementById('smode');
                smode_switch.setAttribute('value', ' smode OFF')
                smode_switch.setAttribute('background-color', '#FF5252')
            }
        }
    });
};

//----------------------------- lamp functions ----------------------------------------------------|





/*
//----------------------------- blinds functions ----------------------------------------------------|

function blinds_on_off() {
    $.ajax({
        type: "GET",
        url: "/blinds/on/off",
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


function blinds_height(click, percent) {
    var data = percent
    //console.log(data)
    $.ajax({
        type: "POST",
        url: "/change/blinds/height",
        data: { 'value': data },
        success: function (result) {
            console.log(result)
        }
    });
};




//----------------------------- blinds functions ----------------------------------------------------|

*/



