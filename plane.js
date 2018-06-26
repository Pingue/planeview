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
    ]
    return planes
}

function clearPlanes()
{
    $('.plane').remove()
}

function drawPlanes(planes)
{
    for (var plane in planes)
    {
        var x = planes[plane]['lat'] // (not really)
        var y = planes[plane]['long'] // (not really)

        $('#canvas').append("<div class='plane' id='"+planes[plane]['name']+"'>"+planes[plane]['name']+"<br/>"+planes[plane]['start']+" - "+planes[plane]['end']+"</div>")
        $('#'+planes[plane]['name']).css({position: 'absolute', width: '100px', height: '40px', top: x, left: y})
    }
}
