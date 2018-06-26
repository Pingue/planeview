/* global $ */

$(function () {

    const planes = new Map();

    const canvas = $('#canvas');

    /** This would be replaced by a JSON style call? */
    function getPlaneData() {
        var data = [];

        data.push({
            flight_number: "YYY111",
            operator: "PinguAir",
            from: "London",
            from_code: "LHR",
            to: "Amsterdam",
            to_code: "AMS",
            aircraft_type: "A320",
            lat: "100",
            lon: "200",
            alt: "3",
        });

        data.push({
            flight_number: "YYY222",
            operator: "PinguAir",
            from: "London",
            from_code: "LHR",
            to: "Amsterdam",
            to_code: "AMS",
            aircraft_type: "A320",
            lat: "400",
            lon: "500",
            alt: "6",
        });

        data.push({
            flight_number: "YYY333",
            operator: "PinguAir",
            from: "London",
            from_code: "LHR",
            to: "Amsterdam",
            to_code: "AMS",
            aircraft_type: "B747",
            lat: "4",
            lon: "500",
            alt: "6",
        });

        data.push({
            flight_number: "YYY444",
            operator: "PinguAir",
            from: "Gotham",
            from_code: "GOT",
            to: "Amsterdam",
            to_code: "AMS",
            aircraft_type: "A320",
            lat: "0",
            lon: "0",
            alt: "6",
        });

        data.push({
            flight_number: "YYY555",
            operator: "PinguAir",
            from: "London",
            from_code: "LHR",
            to: "London",
            to_code: "LGW",
            aircraft_type: "B777",
            lat: "0",
            lon: "0",
            alt: "100",
        });


        return data
    }


    function addPlane(plane) {

        plane.top = "100px";
        plane.left = "100px";
        plane.lastseen = Date.now();

        let template = `
        <div class="plane" id="${plane.flight_number}">
            <div>
            <div class="number">${plane.flight_number}</div><div class="operator">${plane.operator}</div>
            </div>
            <div>
                <div class="from"><div class="code">${plane.from_code}</div>${plane.from}</div><div class="icon"><i class="fas fa-2x fa-plane"></i></div><div class="to"><div class="code">${plane.to_code}</div>${plane.to}</div>
            </div>
            <hr/>
            <div><div class="aircraft">${plane.aircraft_type}</div></div>
        </div>
    `;

        planes.set(plane.flight_number, plane);
        plane.element = $(template).appendTo(canvas);
    }


    /** Processes the returned plane data from the server to see if we need to add now visible planes, or remove non visible ones */
    function addAndRemovePlanes(planeData) {

        planeData.forEach((plane) => {

            const localplane = planes.get(plane.flight_number);

            if (typeof localplane === "undefined") {
                // We don't have this plane locally, so generate it.
                addPlane(plane);
            } else {
                // Update a local plane with new data
                localplane.lat = plane.lat;
                localplane.long = plane.long;
                localplane.alt = plane.alt;
                localplane.lastseen = Date.now();
            }
        });

        // Find any planes which haven't been visible for a while, and remove them from the local store.
        planes.forEach((plane, number) => {
            if(Date.now() - plane.lastseen > 60 * 1000){
                planes.delete(number);
            }
        });


    }

    function getAndDrawPlanes() {
        let planeData = getPlaneData();

        addAndRemovePlanes(planeData);

        recalculatePlanePositions();
        updatePlanePositions();

        setTimeout(getAndDrawPlanes, 10000)
    }


    function recalculatePlanePositions() {
        let browserWidth = canvas.width();
        let browserHeight = canvas.height();

        planes.forEach((plane) => {

            // Start by subtracting my location from the plane location to get a relative location
            let x = (browserWidth / 2) - (browserWidth / 2) * plane.lat / plane.alt;
            let y = (browserHeight / 2) - (browserHeight / 2) * plane.lon / plane.alt;
            console.info(x, y);
            plane.top = x + "px";
            plane.left = y + "px";

        });

    }


    /** Updates the positions of the elements with the values in the planes array */
    function updatePlanePositions() {
        planes.forEach((plane) => {
            plane.element.css({top: plane.top, left: plane.left})
        });
    }


    getAndDrawPlanes();


});

