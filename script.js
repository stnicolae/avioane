//draw a grid and place the planes
function drawGrid(planesPositions, gridClass, gridId) {
    var gridCode = "";
    gridCode += `
    <tr>
        <th></th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>D</th>
        <th>E</th>
        <th>F</th>
        <th>G</th>
        <th>H</th>
        <th>I</th>
        <th>J</th>
    </tr>
    `;
    for (i = 1; i <= 10; i++) {
        gridCode += '<tr>';

        for (j = 1; j <= 10; j++) {
            if (j == 1)
                gridCode += '<th>' + i + '</th>';

            if (planesPositions[i][j])
                gridCode += '<td class="'+planesPositions[i][j]+'"></td>';
            else
                gridCode += '<td></td>';
        }

        gridCode += '</tr>';
    }
    $("#" + gridId).html(gridCode);
}

//
function computePlanes(humanPlanesPositions, direction, j, i, plane) {
    var newBoard = {
        currentPlane: plane,
        humanPlanesPositions: humanPlanesPositions,
        planeOK:true,
    };
    let newPlanePositions = Array(11).fill().map(() => Array(11).fill(0));

    switch(direction){
        case "leftArrow":
            if (i>1 && i<10 && j<8){
                newPlanePositions[i][j]     = "planeHead"+plane;
                newPlanePositions[i-1][j+1] = "planeBody"+plane;
                newPlanePositions[i][j+1]   = "planeBody"+plane;
                newPlanePositions[i+1][j+1] = "planeBody"+plane;
                newPlanePositions[i][j+2]   = "planeBody"+plane;
                newPlanePositions[i-1][j+3] = "planeBody"+plane;
                newPlanePositions[i][j+3]   = "planeBody"+plane;
                newPlanePositions[i+1][j+3] = "planeBody"+plane;                        
            } else {
                newBoard.planeOK = false;
                console.log("nu se poate pune aici!");
            }    
        break;
        case "rightArrow":
            if (i>1 && i<10 && j>3){
                newPlanePositions[i][j]     = "planeHead"+plane;
                newPlanePositions[i-1][j-1] = "planeBody"+plane;
                newPlanePositions[i][j-1]   = "planeBody"+plane;
                newPlanePositions[i+1][j-1] = "planeBody"+plane;
                newPlanePositions[i][j-2]   = "planeBody"+plane;
                newPlanePositions[i-1][j-3] = "planeBody"+plane;
                newPlanePositions[i][j-3]   = "planeBody"+plane;
                newPlanePositions[i+1][j-3] = "planeBody"+plane;                        
            } else {
                newBoard.planeOK = false;
                console.log("nu se poate pune aici!");
            }    
        break;
        case "upArrow":
            if (j>1 && j<10 && i<8){
                newPlanePositions[i][j]     = "planeHead"+plane;
                newPlanePositions[i+1][j-1] = "planeBody"+plane;
                newPlanePositions[i+1][j]   = "planeBody"+plane;
                newPlanePositions[i+1][j+1] = "planeBody"+plane;
                newPlanePositions[i+2][j]   = "planeBody"+plane;
                newPlanePositions[i+3][j-1] = "planeBody"+plane;
                newPlanePositions[i+3][j]   = "planeBody"+plane;
                newPlanePositions[i+3][j+1] = "planeBody"+plane;                        
            } else {
                newBoard.planeOK = false;
                console.log("nu se poate pune aici!");
            }
        break;
        case "downArrow":
            if (j>1 && j<10 && i>3){
                newPlanePositions[i][j]     = "planeHead"+plane;
                newPlanePositions[i-1][j-1] = "planeBody"+plane;
                newPlanePositions[i-1][j]   = "planeBody"+plane;
                newPlanePositions[i-1][j+1] = "planeBody"+plane;
                newPlanePositions[i-2][j]   = "planeBody"+plane;
                newPlanePositions[i-3][j-1] = "planeBody"+plane;
                newPlanePositions[i-3][j]   = "planeBody"+plane;
                newPlanePositions[i-3][j+1] = "planeBody"+plane; 
            } else {
                newBoard.planeOK = false;
                console.log("nu se poate pune aici!");
            }
        break;
    }
    var collision = checkColision(humanPlanesPositions,newPlanePositions);
    
    if (collision){
        console.log("se suprapun avioanele");
        newBoard.planeOK = false;
    } else {    
        for(i=1;i<=10;i++)
            for(j=1;j<=10;j++)
                if (newPlanePositions[i][j])
                    humanPlanesPositions[i][j] = newPlanePositions[i][j];
        newBoard.currentPlane++;
    }

    if (newBoard.currentPlane<=3){
        $("#currentPlaneTitle").html("Place plane <span>"+ newBoard.currentPlane + "</span> on the board");
    }
    //console.log(i + " " + j + ", plane :" + plane);

    return newBoard;
}

function checkColision(humanPlanesPositions,newPlanePositions){
    var i=0, j=0;
    for(i=1;i<=10;i++)
        for(j=1;j<=10;j++)
            if (newPlanePositions[i][j]&&humanPlanesPositions[i][j])
                return true;
    return false;
}

function generateComputerPlanes(computerPlanesPositions){
    var col=0, row=0, newPlane=1;
    const directions = ["leftArrow", "rightArrow", "upArrow", "downArrow"];
    
    while (newPlane<=3){
        col=Math.floor((Math.random() * 10) + 1);
        row=Math.floor((Math.random() * 10) + 1);
        var planeDirection = directions[Math.floor(Math.random() * directions.length)];
        console.log(planeDirection);
        //newPlanePositions[i][j]
        
        newBoard = computePlanes(computerPlanesPositions, planeDirection, col, row, newPlane);
        if (newBoard.planeOK){
            computerPlanesPositions = newBoard.humanPlanesPositions;
            newPlane++;
            drawGrid(computerPlanesPositions, "board", "computerBoard");
        }            
         
        //var collision = checkColision(computerPlanesPositions,newPlanePositions);
                   
    }
    return computerPlanesPositions;
}

function hitPlane(board, positions, col, row){
    console.log(board);
    
    if (board=="human"){
        var flag = true;

        while (flag){                    
            col = Math.floor((Math.random() * 10) + 1);
            row = Math.floor((Math.random() * 10) + 1);
            
            var poz = positions[row][col];
            if ((poz != "air") && (poz != "PlaneDead") && (poz != "PlaneHit"))
                flag = false;
        }
    }

    console.log(col,row);

    if (positions[row][col] == 0){
        positions[row][col] = "air";
    }
    else {
        var poz = positions[row][col];
              
        if (poz.substr(5, 4) == "Head"){
            positions[row][col] = "PlaneDead";
        }
        else if (poz.substr(5, 4) == "Body")
            positions[row][col] = "PlaneHit";
    }

    return positions;
}

function updateScore(player, positions){
    var hits = 0;
    var deads = 0;

    for(i=1;i<=10;i++){
        for(j=1;j<=10;j++){
            if (positions[i][j] == "PlaneDead")
                deads++;
            if (positions[i][j] == "PlaneHit")
                hits++;
        }
    }

    $("#"+player+"Score").html(player + ": &nbsp;&nbsp;&nbsp; <span class='deadCount'> "+ deads + "</span> dead &nbsp; | &nbsp; <span class='hitCount'> "+ hits + "</span> hit");
}

function checkEndGame(computerPlanesPositions, humanPlanesPositions){
    var cHits = 0,
        cDeads = 0,
        hHits = 0,
        hDeads = 0;

    for(i=1;i<=10;i++){
        for(j=1;j<=10;j++){
            if (computerPlanesPositions[i][j] == "PlaneDead")
                cDeads++;
            if (computerPlanesPositions[i][j] == "PlaneHit")
                cHits++;
        }
    }
    
    for(i=1;i<=10;i++){
        for(j=1;j<=10;j++){
            if (humanPlanesPositions[i][j] == "PlaneDead")
                hDeads++;
            if (humanPlanesPositions[i][j] == "PlaneHit")
                hHits++;
        }
    }

    if (hDeads==3||cDeads==3){
        $(".step2").fadeOut(500, function () {
            $(".step3").fadeIn(500);
        });

        $("#computerFinalScore").html("computer: &nbsp;&nbsp;&nbsp; <span class='deadCount'> "+ cDeads + "</span> dead &nbsp; | &nbsp; <span class='hitCount'> "+ cHits + "</span> hit");
        $("#humanFinalScore").html("human: &nbsp;&nbsp;&nbsp; <span class='deadCount'> "+ hDeads + "</span> dead &nbsp; | &nbsp; <span class='hitCount'> "+ hHits + "</span> hit");
    }


}

$(document).ready(function () {
    //initialize array with 0 
    var plane = 1;
    let humanPlanesPositions = Array(11).fill().map(() => Array(11).fill(0));
    let computerPlanesPositions = Array(11).fill().map(() => Array(11).fill(0));
    drawGrid(humanPlanesPositions, "board", "myEmptyBoard");

    //trebuie delegat evenimentul click pe celule (td-uri), pentru ca sunt dinamice (se sterg si se recreaza)
    $('#myEmptyBoard').on('click', "td", function () {
        if (plane <= 3) {
            var col = $(this).index(),
                row = $(this).parent().index();
            //console.log("col index:" + col + ", row index :" + row);

            var planeDirection = $(".selectedDirection").attr("id");
            //console.log(planeDirection);

            newBoard = computePlanes(humanPlanesPositions, planeDirection, col, row, plane);
            humanPlanesPositions = newBoard.humanPlanesPositions;
            plane = newBoard.currentPlane;
            drawGrid(humanPlanesPositions, "board", "myEmptyBoard");
        }
    });
   

    $("#continueButton").click(function () {
        $(".step1").fadeOut(500, function () {
            $(".step2").fadeIn(500);
        });
        drawGrid(humanPlanesPositions, "board", "humanBoard");
        computerPlanesPositions = generateComputerPlanes(computerPlanesPositions);
        drawGrid(computerPlanesPositions, "board", "computerBoard");
    });
    $("#backButton").click(function () {
        $(".step2").fadeOut(500, function () {
            $(".step1").fadeIn(500);
        });
    });

    $(".directionSelector").click(function () {
        $(".directionSelector").removeClass("selectedDirection");
        $(this).addClass("selectedDirection");
    });

    $("#computerBoard").on('click', "td", function () {
        var col = $(this).index(),
        row = $(this).parent().index();

        //human hits computer planes
        computerPlanesPosition = hitPlane("computer", computerPlanesPositions, col, row);
        drawGrid(computerPlanesPositions, "board", "computerBoard");

        //computer hits human planes randomly
        humanPlanesPositions = hitPlane("human", humanPlanesPositions, 0, 0);
        drawGrid(humanPlanesPositions, "board", "humanBoard");

        //update score
        updateScore("computer", computerPlanesPositions);
        updateScore("human", humanPlanesPositions);

        checkEndGame(computerPlanesPositions,humanPlanesPositions);
    });

    $("#reloadButton").click(function () {
        location.reload();
    });
});