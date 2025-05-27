'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Fix missing default marker icon issue here
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default function LocationSelector({ formik }: { formik: any }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={L.icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();
    const displayName = data.display_name || `${lat}, ${lng}`;
    setAddress(displayName);
  };

  const handleUseLocation = () => {
    formik.setFieldValue('location', address);
    setOpen(false);
  };

  return (
    <div className="space-y-2 md:col-span-2">
      <Label>Property Location</Label>
      <div className="flex gap-2">
        <Input
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          placeholder="Select location from map"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">Choose on Map</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Select Location on Map</DialogTitle>
            </DialogHeader>
            <div className="w-full h-96 mb-4">
              <MapContainer center={[37.0902, -95.7129]} zoom={4} className="w-full h-full rounded z-0">
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
            {address && (
              <p className="text-sm text-muted-foreground mb-2">Selected: {address}</p>
            )}
            <Button onClick={handleUseLocation} disabled={!address}>
              Use This Location
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

