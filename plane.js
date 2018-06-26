firstobj = {x: 1, y: 2, z: 3}
secondobj = {x: 1, y: 2, z: 1}

$(function () {

    var planes = [];


    var plane = {
        flightnumber: "YYY123",
        operator: "PinguAir",
        from: "London",
        from_code: "LHR",
        to: "Amsterdam",
        to_code: "AMS",
        aircraft_type: "A320",
        top: "100px", // These will be dynamically updated
        left: "100px"
    };

    var template = `
        <div class="plane" id="${plane.flightnumber}">
            <div>
            <div class="number">${plane.flightnumber}</div><div class="operator">${plane.operator}</div>
            </div>
            <div>
                <div class="from"><div class="code">${plane.from_code}</div>${plane.from}</div><div class="icon"><i class="fas fa-2x fa-plane"></i></div><div class="to"><div class="code">${plane.to_code}</div>${plane.to}</div>
            </div>
            <hr/>
            <div><div class="aircraft">${plane.aircraft_type}</div></div>
        </div>
    `;

    planes.push(plane);
    plane.element = $(template).appendTo('#canvas');

    updatePlanePositions();

    function updatePlanePositions(){
        planes.forEach((plane) => {
            plane.element.css({top: plane.top, left: plane.left})
        });
    }

})
