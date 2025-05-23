import {verticalScale} from 'react-native-size-matters';

export const HEADER_HEIGHT = verticalScale(65);

export const OPEN_CH_API_PARAMS = {
  output: 'json',
  maxresults: 50, // how many stations you want
  distance: 20, // in km
  distanceunit: 'KM',
  compact: false,
  verbose: false,
  key: process.env.OPEN_CHARGE_MAP_API_KEY,
  camelcase: true,
};

export const REGION_DELTA = (lat: any, long: any) => {
  return {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
};

export const MAP_OPTIONS_LIST = [
  {
    id: 1,
    label: 'Coffee',
    iconType: 'feather',
    iconName: 'search',
  },
  {
    id: 2,
    label: 'All Filters',
    iconType: 'font-awesome',
    iconName: 'sliders',
  },
  {
    id: 3,
    label: 'Available',
    iconType: 'feather',
    iconName: 'check-circle',
  },
  {
    id: 4,
    label: '2+ Stations',
    iconType: 'font-awesome-5',
    iconName: 'gas-pump',
  },
  {
    id: 5,
    label: 'Fast',
    iconType: 'ionicon',
    iconName: 'flash-outline',
  },
  {
    id: 6,
    label: 'Lodging',
    iconType: 'ionicon',
    iconName: 'bed-outline',
  },
  {
    id: 7,
    label: 'Dining',
    iconType: 'material',
    iconName: 'dining',
  },
  {
    id: 8,
    label: 'Free',
    iconType: 'font-awesome',
    iconName: 'dollar',
  },
  {
    id: 9,
    label: 'Add Location',
    iconType: 'material-community',
    iconName: 'map-marker-plus-outline',
  },
];

export const LEGENDS = [
  {
    label: 'Restricted',
    iconType: 'font-awesome-5',
    iconName: 'map-marker',
    iconColor: 'rgba(156, 130, 91, 0.79)',
  },
  {
    label: 'In Use',
    iconType: 'font-awesome-5',
    iconName: 'map-marker',
    iconColor: 'rgba(172, 162, 162, 0.67)',
  },
  {
    label: 'Residential',
    iconType: 'material-community',
    iconName: 'home-circle',
    iconColor: 'rgba(172, 162, 162, 0.67)',
  },
  {
    label: 'Level 2',
    iconType: 'font-awesome-5',
    iconName: 'map-marker',
    iconColor: 'rgb(31, 191, 103)',
  },
  {
    label: 'High Power',
    iconType: 'font-awesome-5',
    iconName: 'map-marker',
    iconColor: 'rgba(221, 162, 24, 0.92)',
  },
  {
    label: 'Under Repair',
    iconType: 'ionicon',
    iconName: 'construct',
    iconColor: 'rgba(172, 162, 162, 0.67)',
  },
];

export const PLUG_TYPES = [
  {
    id: 1,
    label: 'CCS1',
  },
  {
    id: 2,
    label: 'CHAdeMO',
  },
  {
    id: 3,
    label: 'J-1772',
  },
  {
    id: 4,
    label: 'NACS (Tesla)',
  },
  {
    id: 5,
    label: 'NEMA 14-50',
  },
  {
    id: 6,
    label: 'NEMA TT-30',
  },
  {
    id: 7,
    label: 'Tesla (Roadster)',
  },
  {
    id: 8,
    label: 'Wall',
  },
];

export const STATION_COUNT = ['Any', '2+', '4+', '6+'];

export const AMENITIES_LIST = [
  {
    id: 1,
    label: 'Dining',
    iconType: 'material-community',
    iconName: 'silverware-fork-knife',
    iconSize: 22,
    isSelected: true,
  },
  {
    id: 2,
    label: 'Restroom',
    iconType: 'font-awesome-5',
    iconName: 'restroom',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 3,
    label: 'Shopping',
    iconType: 'font-awesome-5',
    iconName: 'shopping-bag',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 4,
    label: 'Lodging',
    iconType: 'ionicon',
    iconName: 'bed',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 5,
    label: 'Park',
    iconType: 'material-icon',
    iconName: 'park',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 6,
    label: 'Grocery',
    iconType: 'feather',
    iconName: 'shopping-cart',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 7,
    label: 'WiFi',
    iconType: 'feather',
    iconName: 'wifi',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 8,
    label: 'Valet',
    iconType: 'material-community',
    iconName: 'car-clock',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 9,
    label: 'Hiking',
    iconType: 'font-awesome-5',
    iconName: 'hiking',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 10,
    label: 'Camping',
    iconType: 'font-awesome-5',
    iconName: 'campground',
    iconSize: 22,
    isSelected: false,
  },
  {
    id: 11,
    label: 'Free Charge',
    iconType: 'font-awesome',
    iconName: 'dollar',
    iconSize: 22,
    isSelected: false,
  },
];

// latitudeDelta: 0.015,
// longitudeDelta: 0.041,

//password : 5038
