type Connection = {
  PowerKW?: number;
  Level?: {IsFastChargeCapable?: boolean};
  CurrentType?: {Title?: string};
  StatusType?: {Title?: string};
  ConnectionType?: {Title?: string};
  Quantity?: number;
};

type Station = {
  Connections?: Connection[];
  AddressInfo?: {
    Distance?: number;
    DistanceUnit?: number;
  };
};

export const getPlugScore = (station: Station): string => {
  const connections = station.Connections || [];
  if (connections.length === 0) return '0.0';

  const totalScore = connections.reduce((score, conn) => {
    let connectionScore = 0;

    if (conn.PowerKW) {
      if (conn.PowerKW >= 100) connectionScore += 5;
      else if (conn.PowerKW >= 50) connectionScore += 4;
      else if (conn.PowerKW >= 22) connectionScore += 3;
      else if (conn.PowerKW >= 7) connectionScore += 2;
      else connectionScore += 1;
    }

    if (conn.Level?.IsFastChargeCapable) connectionScore += 2;
    if (conn.CurrentType?.Title?.includes('DC')) connectionScore += 1;
    if (conn.StatusType?.Title === 'Operational') connectionScore += 1;

    return score + connectionScore;
  }, 0);

  const averageScore = totalScore / connections.length;
  return Math.min(10, averageScore).toFixed(1);
};

export const calculateDistance = (station: Station): string => {
  const isMiles = station.AddressInfo?.DistanceUnit === 1;
  const rawDistance = station.AddressInfo?.Distance || 0;
  const distanceInKm = isMiles ? rawDistance * 1.60934 : rawDistance;

  const distance =
    distanceInKm < 1
      ? `${Math.round(distanceInKm * 1000)} m`
      : `${distanceInKm.toFixed(1)} km`;

  return distance;
};

export const getTotalChargers = (connections: Connection[]): number =>
  connections?.reduce((sum, conn) => sum + (conn.Quantity || 0), 0) || 0;

export const getPlugTypes = (connections: Connection[]): string =>
  [
    ...new Set(
      connections.map(conn => conn.ConnectionType?.Title).filter(Boolean),
    ),
  ].join(', ');

export const hasFastCharger = (connections: Connection[]): boolean =>
  connections?.some(conn => conn.Level?.IsFastChargeCapable === true);

export const shouldUpdateRegion = (prev: any, newRegion: any) => {
  const hasChanged =
    !prev ||
    Math.abs(prev.latitude - newRegion.latitude) > 0.0001 ||
    Math.abs(prev.longitude - newRegion.longitude) > 0.0001;
  console.log('hasChanged', hasChanged);

  return hasChanged;
};
