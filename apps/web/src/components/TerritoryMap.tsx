import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { areas, type Visit } from '../domain/demo';
export function TerritoryMap({ selected, visits }: { selected: string; visits: Visit[] }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if (!element.current) return;
    const active = areas.filter(a=>selected==='all'||a.id===selected);
    const map = L.map(element.current, { scrollWheelZoom: false }).setView(selected==='all' ? [-7.235,-35.898] : active[0].position, selected==='all' ? 13 : 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    active.forEach(a=>{
      const foci = visits.filter(v=>v.areaId===a.id&&v.status==='synced').reduce((s,v)=>s+v.foci,0);
      const color = a.rank===1 ? '#c66c42' : a.rank===2 ? '#c1a452' : '#397c65';
      L.circle(a.position, { radius: 420, color, weight: 1, fillColor: color, fillOpacity: .12, interactive: false }).addTo(map);
      const icon = L.divIcon({ className: 'territory-marker', html: `<span style="--marker:${color}">${foci}</span>`, iconSize:[44,44], iconAnchor:[22,22] });
      L.marker(a.position, { icon, title: `${a.name} · ${foci} focos fictícios`, alt: `${a.name}: ${foci} focos fictícios`, keyboard:true }).addTo(map).bindPopup(`<strong>${a.name} · ${a.code}</strong><br>${foci} focos fictícios consolidados.<br>Centro da microárea apenas ilustrativo.`);
    });
    return ()=>{map.remove();};
  },[selected,visits]);
  return <div className="territory-map" ref={element} role="region" aria-label="Mapa demonstrativo de microáreas em Campina Grande"/>;
}
