'use client';

import { useState } from 'react';

const MAPS = [
  {
    id: 'map1',
    label: 'Chhatral campus',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.3861735597484!2d72.44821857509959!3d23.265413779004323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c243f00000001%3A0x2928ed1abd681467!2sHB%20Kapadia%20School!5e0!3m2!1sen!2sin!4v1748626415830!5m2!1sen!2sin',
  },
  {
    id: 'map2',
    label: 'Chandkheda campus',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.3328548016834!2d72.5959195!3d23.1215057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8237443d43c1%3A0xdbee7af6287a625d!2sThe%20H%20B%20Kapadia%20New%20High%20School%2C%20Chandkheda!5e0!3m2!1sen!2sin!4v1748968499991!5m2!1sen!2sin',
  },
  {
    id: 'map3',
    label: 'IFFCO',
    src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3667.4687530373894!2d72.549473!3d23.1895817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2955d49ca625%3A0x13bc0e570cfb373d!2sIFFCO%20Township%2C%20kalol!5e0!3m2!1sen!2sin!4v1767950328774!5m2!1sen!2sin',
  },
  {
    id: 'map4',
    label: 'Kadi',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.7959063854546!2d72.3494542!3d23.286864500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c22942f73fd0b%3A0x20bcec37a0ec7585!2sVRAJ%20VIHAR%20SOCIETY!5e0!3m2!1sen!2sin!4v1748968221407!5m2!1sen!2sin',
  },
  {
    id: 'map5',
    label: 'Shela',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4022532559484!2d72.46628199999999!3d23.0089982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe76e58fcb4db81%3A0x6cdebad3a849979f!2sKapadia%20High%20School%2C%20Shela!5e0!3m2!1sen!2sin!4v1767950887803!5m2!1sen!2sin',
  },
];

export default function MapTabs() {
  const [active, setActive] = useState(MAPS[0].id);

  return (
    <div className="map-tabs">
      <div className="map-tab-buttons" role="tablist" aria-label="Campus maps">
        {MAPS.map((map) => (
          <button
            key={map.id}
            type="button"
            className={`map-tab-btn ${active === map.id ? 'active' : ''}`}
            role="tab"
            aria-selected={active === map.id}
            onClick={() => setActive(map.id)}
          >
            {map.label}
          </button>
        ))}
      </div>
      <div className="map-tab-content">
        <div className="map-container">
          {MAPS.map((map) => (
            <iframe
              key={map.id}
              id={map.id}
              src={map.src}
              title={`Map of the ${map.label}`}
              width="100%"
              height={450}
              style={active === map.id ? { border: 0 } : { border: 0, display: 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
}
