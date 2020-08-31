import React, { useEffect, useRef } from 'react'
import { Loader } from 'google-maps';

export default function MapComponent() {
    const mapRef = useRef(null)
    const searchRef = useRef(null)
    let map = null
    let geocoder = null
    const loader = new Loader('AIzaSyAkadZeAoRuPFr12A_t-fXnpw2xgrGrPac');
    let src = 'https://gist.githubusercontent.com/ayushgupta11/1a58c11ff1996a84ca9224b84ee82646/raw/b2013a840335cb4637fee94d8f087201dc70116e/points.kml';
    useEffect(() => {
        loader.load().then((google) => {
            map = new google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            geocoder = new google.maps.Geocoder()
            const ctaLayer = new google.maps.KmlLayer({
                url: src,
                map: map
            });
        });
    })
    const geocodeLocation = (event) => {
        if (event.charCode === 13) {
            let address = event.target.value
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            })
        }
    }
    return (
        <>
            <input placeholder="Search here..." className="map-search" ref={searchRef} onKeyPress={geocodeLocation} />
            <div ref={mapRef} className="map-container">
            </div>
        </>
    )
}
