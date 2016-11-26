import '../css/app.scss';
import $ from "jquery";
import './player'

$(function() {
    var img = new Image();
    img.src = "http://images.christmastimeclipart.com/images/2/1271716593176_1788/img_1271716593176_17881.jpg";

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var isDragging = false;
    var canMouseX, canMouseY;
    
    var selectedId = 1;
    var nodes = [];
    
    
    //test
    var node = {
        id: 1,
        x: 0.5,
        y: 0.5
    }
    nodes.push(node);

    function findNode(id){
        for(var i = 0; i < nodes.length; i++) {
            if(id == nodes[i].id) return nodes[i];
        }
        console.log("id not found");
        return null;
    }

    
    function handleMouseDown(e) {
        updateNode(e);
        // set the drag flag
        isDragging=true;
    }

    function handleMouseUp(e) {
        updateNode(e);
        // clear the drag flag
        isDragging=false;
    }

    function handleMouseOut(e){ updateNode(e); }

    function handleMouseMove(e){ updateNode(e); }
    
    function updateNode(e){
        canMouseX = parseInt(e.clientX-offsetX);
        canMouseY = parseInt(e.clientY-offsetY);
        var x = canMouseX/canvas.width;//x value between 0-1
        var y = canMouseY/canvas.height;//y value between 0-1
        var selectedNode = findNode(selectedId);
        selectedNode.x = x;//the x value gets updated for only selected node
        selectedNode.y = y;//the y value now gets the current y value
        
        redraw();
    }


    function handleClick(e) {
        updateNode(e);
    }
    
    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var imageWidth = 0.1 * canvas.width;
        var imageHeight = 0.1 * canvas.height;
        
        for(var i = 0; i < nodes.length; i++) {
            var pixelX = nodes[i].x*canvas.width;
            var pixelY = nodes[i].y*canvas.height;
            
            ctx.drawImage(img, pixelX-imageWidth/2,pixelY-imageHeight/2, imageWidth, imageHeight)
        }
    }

    function handleResize(e) {
        var size = window.innerHeight <= window.innerWidth ? window.innerHeight : window.innerWidth;
        canvas.width = size - 20;//takes smallest value and makes square
        canvas.height = size - 20;

        $("#canvas").css('margin-left',-(canvas.width/2)+ "px");//canvas is red box
        $("#canvas").css('margin-top',-(canvas.height/2)+ "px");

        canvasOffset = $("#canvas").offset();
        offsetX = canvasOffset.left;
        offsetY = canvasOffset.top;
    }

    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});
    $("#canvas").click(function(e) {handleClick(e);});
    $(window).resize(function(e){handleResize(e)});

    handleResize();
});
