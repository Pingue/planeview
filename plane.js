$(function() {
    getAndDrawPlanes()
})

function getAndDrawPlanes()
{
    var planeData = getPlaneData()
    clearPlanes()
    drawPlanes(planeData)
    setTimeout(getAndDrawPlanes, 10000)
}

function getPlaneData()
{
    var planes = [
        {name: "YYY111", lat: "100", long: "200", alt: "3", start: "LHR", end: "GOT"},
        {name: "YYY222", lat: "400", long: "500", alt: "6", start: "LGW", end: "LHR"},
        {name: "YYY333", lat: "4", long: "500", alt: "6", start: "LGW", end: "LHR"},
        {name: "YYY444", lat: "0", long: "0", alt: "6", start: "LGW", end: "LHR"},
        {name: "YYY555", lat: "0", long: "0", alt: "100", start: "LGW", end: "LHR"},
    ]
    return planes
}

function clearPlanes()
{
    $('.plane').remove()
}

function drawPlanes(planes)
{
    browserWidth = $( window ).width();
    browserHeight = $( window ).height();
    for (var plane in planes)
    {
        // Start by subtracting my location from the plane location to get a relative location
        var x = (browserWidth / 2) - (browserWidth / 2) * planes[plane]['lat']/planes[plane]['alt']
        var y = (browserHeight / 2) - (browserHeight / 2) * planes[plane]['long']/planes[plane]['alt']
        console.info(x)
        console.info(y)

        $('#canvas').append("<div class='plane' id='"+planes[plane]['name']+"'>"+planes[plane]['name']+"<br/>"+planes[plane]['start']+" - "+planes[plane]['end']+"</div>")
        $('#'+planes[plane]['name']).css({position: 'absolute', width: '100px', height: '40px', top: x, left: y})
    }
}
