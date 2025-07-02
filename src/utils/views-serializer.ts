import axios from 'axios';
import { format } from 'date-fns';
import { format as jformat } from 'date-fns-jalali';

interface DeviceData {
  label: string;
  value: number;
}

interface BrowserData {
  label: string;
  value: number;
  icon: string; // Add an optional icon property
}

interface GeoInfo {
  country: string;
  city: string;
  // Add other properties based on the response structure if needed
}

function serializeDevicesData(browserArray: string[]): DeviceData[] {
  // Create an empty object to store browser counts
  const browserCounts: { [browser: string]: number } = {};

  // Iterate over the browserArray and count occurrences
  browserArray.forEach((browser) => {
    if (browserCounts[browser]) {
      browserCounts[browser]++;
    } else {
      browserCounts[browser] = 1;
    }
  });

  // Transform the counts into the desired format
  const serializedData: DeviceData[] = Object.keys(browserCounts).map((browser) => ({
    label: browser,
    value: browserCounts[browser],
  }));

  return serializedData;
}

function serializeBrowserData(browserArray: string[]): BrowserData[] {
  // Create a mapping of browser names to icons
  const browserIcons: { [browser: string]: string } = {
    Chrome: 'mdi:google-chrome',
    Edge: 'mdi:microsoft-edge',
    Safari: 'mdi:apple-safari',
    Firefox: 'mdi:firefox',
    Opera: 'mdi:opera',
    IE: 'mdi:microsoft-internet-explorer',
  };

  // Create an empty object to store browser counts
  const browserCounts: { [browser: string]: number } = {};

  // Iterate over the browserArray and count occurrences
  browserArray.forEach((browser) => {
    if (browserCounts[browser]) {
      browserCounts[browser]++;
    } else {
      browserCounts[browser] = 1;
    }
  });

  // Transform the counts into the desired format with icons
  const serializedData: BrowserData[] = Object.keys(browserCounts).map((browser) => ({
    label: browser,
    value: browserCounts[browser],
    icon: browserIcons[browser] || 'mdi:web', // Set the icon based on the mapping or an empty string if not found
  }));

  return serializedData;
}

async function getGeoInfo(ip: string): Promise<GeoInfo | undefined> {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
}

async function fetchGeoInfoForIpList(
  ipList: string[]
): Promise<{ value: number; label: string }[]> {
  const geoInfoPromises = ipList.map((ip) => getGeoInfo(ip));
  const geoInfoResults = await Promise.all(geoInfoPromises);

  const cityCounts: { [city: string]: number } = {};

  geoInfoResults.forEach((geoInfo) => {
    if (geoInfo) {
      const cityName = geoInfo.city;
      if (cityCounts[cityName]) {
        cityCounts[cityName]++;
      } else {
        cityCounts[cityName] = 1;
      }
    }
  });

  const cityArray: { value: number; label: string }[] = Object.keys(cityCounts).map((city) => ({
    value: cityCounts[city],
    label: city,
  }));

  return cityArray;
}

function serializeDateData(
  dateArray: Date[],
  dynamicName: string,
  isRtl: boolean
): { categories: string[]; data: { name: string; data: number[] }[] } {
  if (!dateArray) {
    // Handle the case where dateArray is undefined
    return { categories: [], data: [] };
  }

  const dayCounts: { [key: string]: number } = {};

  dateArray.forEach((dateString) => {
    const date = new Date(dateString);
    const formattedDate = isRtl ? jformat(date, 'MMMM dd') : format(date, 'MMM dd');
    dayCounts[formattedDate] = (dayCounts[formattedDate] || 0) + 1;
  });

  const categories = Object.keys(dayCounts);
  const data = [{ name: dynamicName, data: Object.values(dayCounts) }];

  return { categories, data };
}

function serializeBooleanData(
  dateArray: Date[],
  dynamicName: string,
  shouldSum: boolean[],
  isRtl: boolean
): { categories: string[]; data: { name: string; data: number[] }[] } {
  if (!dateArray) {
    // Handle the case where dateArray is undefined
    return { categories: [], data: [] };
  }

  const dayCounts: { [key: string]: number } = {};

  dateArray.forEach((dateString, index) => {
    const date = new Date(dateString);
    const formattedDate = isRtl ? jformat(date, 'MMMM dd') : format(date, 'MMM dd');

    if (shouldSum[index]) {
      dayCounts[formattedDate] = (dayCounts[formattedDate] || 0) + 1;
    }
  });

  const categories = Object.keys(dayCounts);
  const data = [{ name: dynamicName, data: Object.values(dayCounts) }];

  return { categories, data };
}

export {
  serializeDevicesData,
  serializeBrowserData,
  getGeoInfo,
  fetchGeoInfoForIpList,
  serializeDateData,
  serializeBooleanData,
};
