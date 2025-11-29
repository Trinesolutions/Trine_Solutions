/**
 * Default Static Clients Constants
 * 
 * Static clients that are always displayed on the Home page.
 * These clients are shown first, followed by any dynamic clients added via admin.
 * Logo files are located in the frontend/public folder.
 */

export const staticClients = [
  {
    id: "static-tmobile",
    name: "T-Mobile",
    logo_url: "/T-Mobile.png",
    website: "https://www.t-mobile.com",
    priority: 1
  },
  {
    id: "static-microsoft",
    name: "Microsoft",
    logo_url: "/microsoft.png",
    website: "https://www.microsoft.com",
    priority: 2
  },
  {
    id: "static-cvs",
    name: "CVS",
    logo_url: "/cvs.png",
    website: "https://www.cvs.com",
    priority: 3
  },
  {
    id: "static-talking-rain",
    name: "Talking Rain",
    logo_url: "/talking-rain.webp",
    website: "https://www.talkingrain.com",
    priority: 4
  },
  {
    id: "static-wizards-of-the-coast",
    name: "Wizards of the Coast",
    logo_url: "/Wizards_of_the_Coast_logo_.png",
    website: "https://company.wizards.com",
    priority: 5
  },
  {
    id: "static-city-of-seattle",
    name: "City of Seattle",
    logo_url: "/Official_Seal_of_Seattle.jpg",
    website: "https://www.seattle.gov",
    priority: 6
  },
  {
    id: "static-ryder",
    name: "Ryder",
    logo_url: "/ryder.jpg",
    website: "https://www.ryder.com",
    priority: 7
  },
  {
    id: "static-fis-global",
    name: "FIS Global",
    logo_url: "/fis.png",
    website: "https://www.fisglobal.com",
    priority: 8
  }
];

export default staticClients;
