type Connection = {
  powerKW?: number;
  level?: {isFastChargeCapable?: boolean};
  currentType?: {title?: string};
  statusType?: {title?: string};
  connectionType?: {title?: string};
  quantity?: number;
};

type Station = {
  connections?: Connection[];
  addressInfo?: {
    distance?: number;
    distanceUnit?: number;
  };
};

export const getPlugScore = (station: Station): string => {
  const connections = station.connections || [];
  if (connections.length === 0) return '0.0';

  const totalScore = connections.reduce((score, conn) => {
    let connectionScore = 0;

    if (conn.powerKW) {
      if (conn.powerKW >= 100) connectionScore += 5;
      else if (conn.powerKW >= 50) connectionScore += 4;
      else if (conn.powerKW >= 22) connectionScore += 3;
      else if (conn.powerKW >= 7) connectionScore += 2;
      else connectionScore += 1;
    }

    if (conn.level?.isFastChargeCapable) connectionScore += 2;
    if (conn.currentType?.title?.includes('DC')) connectionScore += 1;
    if (conn.statusType?.title === 'Operational') connectionScore += 1;

    return score + connectionScore;
  }, 0);

  const averageScore = totalScore / connections.length;
  return Math.min(10, averageScore).toFixed(1);
};

export const calculateDistance = (station: Station): string => {
  const isMiles = station.addressInfo?.distanceUnit === 1;
  const rawDistance = station.addressInfo?.distance || 0;
  const distanceInKm = isMiles ? rawDistance * 1.60934 : rawDistance;

  const distance =
    distanceInKm < 1
      ? `${Math.round(distanceInKm * 1000)} m`
      : `${distanceInKm.toFixed(1)} km`;

  return distance;
};

export const getTotalChargers = (connections: Connection[]): number =>
  connections?.reduce((sum, conn) => sum + (conn.quantity || 0), 0) || 0;

export const getPlugTypes = (connections: Connection[]): string =>
  [
    ...new Set(
      connections.map(conn => conn.connectionType?.title).filter(Boolean),
    ),
  ].join(', ');

export const hasFastCharger = (connections: Connection[]): boolean =>
  connections?.some(conn => conn.level?.isFastChargeCapable === true);

export const shouldUpdateRegion = (prev: any, newRegion: any) => {
  const hasChanged =
    !prev ||
    Math.abs(prev.latitude - newRegion.latitude) > 0.0001 ||
    Math.abs(prev.longitude - newRegion.longitude) > 0.0001;
  console.log('hasChanged', hasChanged);

  return hasChanged;
};
