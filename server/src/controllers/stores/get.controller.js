import fetchPoints from '../../helpers/points'
import { success, internalServerError } from '../../config/responsetemplate'
import nodeGeocoder from 'node-geocoder'

export default (request, response) => {
    let { query } = request.params
    let options = {
        provider: 'openstreetmap'
    };

    let geoCoder = nodeGeocoder(options);
    geoCoder.geocode(query)
        .then((res) => {
            let geocodePoints = res
            if (geocodePoints.length) {
                let responseData = geocodePoints.map((item) => {
                    let nearestPoints = getNearest(item.latitude, item.longitude)
                    return nearestPoints
                })
                success(response, responseData)
            }
            else {
                internalServerError(response, {
                    message: 'Not found'
                })
            }
        })
        .catch((err) => {
            console.log(err);
            internalServerError(response, err)
        });
}

const getNearest = (lat, lng) => {
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    // console.log(lat, lng)
    let data = fetchPoints()
    let result = [];
    let coords = data.kml.Document.Placemark.map((item) => {
        let obj = {
            'name': item.name._text,
            'text': item.Point ? item.Point.coordinates._text : item.Polygon.outerBoundaryIs.LinearRing.coordinates._text
        }
        return obj
        }
    );
    for (let i = 0; i < coords.length; i++) {
        let points = coords[i].text.trim().split('\n              ')
        for(let j = 0; j < points.length; j++){
            let item = points[j]
            let pointCoord = item.split(',')
            if ((Math.abs(parseFloat(pointCoord[0]) - lng) < 0.1) && (Math.abs(parseFloat(pointCoord[1]) - lat) < 0.1)) {
                result.push(coords[i].name);
                break
            }
        }
    }
    return result;
}