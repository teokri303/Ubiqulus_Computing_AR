
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

                    /*
                    if (d_value == 'a-gui-button') {

                        const controlpanel = document.getElementById('thepanel');
                        const widget = document.createElement(d_value);
                        widget.setAttribute('width', '1.25');
                        widget.setAttribute('height', '0.25');
                        widget.setAttribute('value', 'LAMP widget');
                        widget.setAttribute('font-size', '0.15');
                        widget.setAttribute('line-height', '0.3');
                        widget.setAttribute('letter-spacing', '0.0');
                        widget.setAttribute('margin', '0 0 0.1 0');
                        widget.setAttribute('background-color', '#FF5252');

                        controlpanel.appendChild(widget);
                    }
*/




                
                    //edw prospatho na kskiniso to toggle me on state alla den douleuei me tipota
                    //milisa kai me sunadelfoys kai me ola kai den ginetai tipota opote anagkastika pame 
                    //se koumpia me diaforetika xromata

                    const controlpanel = document.getElementById('thepanel');
                    const widget = document.createElement('a-gui-toggle');
                    widget.setAttribute('width', '1.25');
                    widget.setAttribute('height', '0.25');
                    widget.setAttribute('value', 'TOGGLEEEEE widget');
                    widget.setAttribute('font-size', '0.1');
                    widget.setAttribute('onclick', "my_func"); //δουλευειιιι

                    controlpanel.appendChild(widget);
                    



                }


            }


        }

    });

    console.log("IM HEREEEEEEEEEE")

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



function on_off() {
    $.ajax({
        type: "GET",
        url: "/get/on",
        success: function (result) {
            console.log("CHANGE DONE")
        }
    });
};






/*
--- comments for next session 




*/