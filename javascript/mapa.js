var map;
    function initMap(){
         if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var latlng = new google.maps.LatLng(pos);
            map = new google.maps.Map(document.getElementById('map'),{
                center: latlng,
                zoom: 17,
                streetViewControl: false,
                mapTypeId: 'roadmap'
            });
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Ubicacion'
            });
             // Create the search box and link it to the UI element.
        var input = document.getElementById('search-box');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
           swal({
              title: "Iniciar Viaje",
              text: "Deseas confirmar viaje?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
              closeOnConfirm: false,
              closeOnCancel: false
            },
                function(isConfirm){
                  if (isConfirm) {
                    swal("Viaje", "Tu viaje a sido confirmado te enviaremos los datos de tu conductor.", "success");
                  } else {
                    swal("Cancelado", "Viaje Cancelado", "error");
                  }
                });
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        
        document.getElementById('search-box').addEventListener('change', onChangeHandler);
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: pos,
          destination: document.getElementById('search-box').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
          },function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
         }else{
              handleLocationError(false, infoWindow, map.getCenter());
         }
       
    }