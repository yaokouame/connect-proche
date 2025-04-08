
import React, { useEffect, useRef } from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';

interface GoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  places: (Pharmacy | HealthCenter)[];
  mapLoaded: boolean;
}

const GoogleMap = ({ userLocation, places, mapLoaded }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !userLocation || !mapLoaded) return;
    
    // Initialize the map
    googleMapRef.current = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 14,
      mapTypeControl: false,
    });
    
    // Add a marker for the user's location
    new google.maps.Marker({
      position: userLocation,
      map: googleMapRef.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
      title: "Votre position",
    });
    
    // Add markers for places
    addMarkersToMap(places);

    return () => {
      // Clean up markers when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [userLocation, places, mapLoaded]);

  const addMarkersToMap = (places: (Pharmacy | HealthCenter)[]) => {
    if (!googleMapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Create an info window to share between markers
    const infoWindow = new google.maps.InfoWindow();
    
    // Add markers for all places
    places.forEach((place) => {
      const marker = new google.maps.Marker({
        position: place.location,
        map: googleMapRef.current,
        title: place.name,
        animation: google.maps.Animation.DROP,
      });
      
      // Create info window content
      const contentString = `
        <div class="p-2">
          <h3 class="font-bold">${place.name}</h3>
          <p class="text-sm">${place.address}</p>
          <p class="text-sm">${place.phone}</p>
        </div>
      `;
      
      // Add click listener to open info window
      marker.addListener("click", () => {
        infoWindow.setContent(contentString);
        infoWindow.open(googleMapRef.current, marker);
      });
      
      // Store marker reference for cleanup
      markersRef.current.push(marker);
    });
  };

  const centerMapOnLocation = (location: { lat: number; lng: number }) => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(location);
      googleMapRef.current.setZoom(16);
    }
  };

  // Expose the centerMapOnLocation method to parent components
  React.useImperativeHandle(
    React.forwardRef((_, ref) => ref),
    () => ({
      centerMapOnLocation
    })
  );

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px]"
    >
      {!mapLoaded && (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <p>Chargement de la carte...</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
