//triggarei to ti tha ginei otan anixneutei o marker kai ta epakoloytha...
//einai aparaithto gia na ginetai olo auto me to marker dynamically

//component registration for in-built events (this case, fired when marker is detected)
AFRAME.registerComponent('markerhandler', {
    init: function () {
        this.el.addEventListener('markerFound',  (evt) => {
            console.log("marker found");
            console.log(evt);
            create_panel();
            
           
            

        })
        //add_wig();
        //create_panel();
    }
});





/*
//example of adding a scene component (this case, mouse cursor and a UI widget) dynamically, after scene is loaded
AFRAME.registerComponent('dynamic-elements', {
    init: function () {

        //best to define the mouse cursor after the scene initialisation, to get appropriate
        //viewport coordinates...
        const scene = AFRAME.scenes[0];
        const mouseCursor = document.createElement('a-entity');
        mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
        mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
        scene.appendChild(mouseCursor);

        const controlpanel = document.getElementById('thepanel');
        const widget = document.createElement('a-gui-toggle');
        widget.setAttribute('width', '1.25');
        widget.setAttribute('height', '0.25');
        widget.setAttribute('value', 'GOGO widget');
        widget.setAttribute('toggle-state', 'true');
        widget.setAttribute('font-size', '0.15');
        widget.setAttribute('line-height', '0.3');
        widget.setAttribute('letter-spacing', '0.0');
        widget.setAttribute('margin', '0 0 0.1 0');
        controlpanel.appendChild(widget);
    },
}); */

function create_panel() {
    $.ajax({
        type: "GET",
        url: "/create/panel",
        success: function (result) {

            //console.log(result[0].rows[0])
            //console.log(result[1].rows[0])
            console.log(result[2].rows[0])
            //console.log("IM IN THE CREATE PANEL")
            
        }

    });

    console.log(result)
    

    // deutero register component
    AFRAME.registerComponent('dynamic-elements', {
        init: function () {

            //best to define the mouse cursor after the scene initialisation, to get appropriate
            //viewport coordinates...
            const scene = AFRAME.scenes[0];
            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
            mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
            scene.appendChild(mouseCursor);

            const controlpanel = document.getElementById('thepanel');
            const widget = document.createElement('a-gui-toggle');
            widget.setAttribute('width', '1.25');
            widget.setAttribute('height', '0.25');
            widget.setAttribute('value', 'LAMP widget');
            widget.setAttribute('toggle-state', 'true');
            widget.setAttribute('font-size', '0.15');
            widget.setAttribute('line-height', '0.3');
            widget.setAttribute('letter-spacing', '0.0');
            widget.setAttribute('margin', '0 0 0.1 0');
            controlpanel.appendChild(widget);

        },
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

function my_func() {
    console.log("TEST PASSED ");
};

function on_off() {
    $.ajax({
        type: "GET",
        url: "/get/on",
        success: function (result) {
            console.log("CHANGE DONE")
        }
    });
};

function add_wig() {
    //example of adding a scene component (this case, mouse cursor and a UI widget) dynamically, after scene is loaded
    AFRAME.registerComponent('dynamic-elements', {
        init: function () {

            //best to define the mouse cursor after the scene initialisation, to get appropriate
            //viewport coordinates...
            const scene = AFRAME.scenes[0];
            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin: mouse; fuse: false');
            mouseCursor.setAttribute('raycaster', 'objects: [gui-interactable]');
            scene.appendChild(mouseCursor);

            const controlpanel = document.getElementById('thepanel');
            const widget = document.createElement('a-gui-toggle');
            widget.setAttribute('width', '1.25');
            widget.setAttribute('height', '0.25');
            widget.setAttribute('value', 'LAMP widget');
            widget.setAttribute('toggle-state', 'true');
            widget.setAttribute('font-size', '0.15');
            widget.setAttribute('line-height', '0.3');
            widget.setAttribute('letter-spacing', '0.0');
            widget.setAttribute('margin', '0 0 0.1 0');
            controlpanel.appendChild(widget);
        },
    });
}





/*
--- comments for next session 

to thema einai sto markerhandler resistration pou den ginetai kai kala alla den ksero giati




*/