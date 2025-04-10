export const getPlugScore = (station: any): string => {
  const connections = station.Connections || [];
  if (connections.length === 0) return '0.0';

  let totalScore = 0;

  connections.forEach((conn: any) => {
    let score = 0;

    if (conn.PowerKW >= 100) score += 5;
    else if (conn.PowerKW >= 50) score += 4;
    else if (conn.PowerKW >= 22) score += 3;
    else if (conn.PowerKW >= 7) score += 2;
    else score += 1;

    if (conn.Level?.IsFastChargeCapable) score += 2;

    if (conn.CurrentType?.Title?.includes('DC')) score += 1;

    if (conn.StatusType?.Title === 'Operational') score += 1;

    totalScore += score;
  });

  const averageScore = totalScore / connections.length;
  return Math.min(10, averageScore).toFixed(1);
};

export const calculateDistance = (item: any) => {
  const isMiles = item.AddressInfo?.DistanceUnit === 1;
  const rawDistance = item.AddressInfo?.Distance || 0;
  const distanceInKm = isMiles ? rawDistance * 1.60934 : rawDistance;
  return distanceInKm < 1
    ? `${Math.round(distanceInKm * 1000)} m`
    : `${distanceInKm.toFixed(1)} km`;
};

export const getTotalChargers = (connections: any[]) =>
  connections?.reduce(
    (sum: number, conn: any) => sum + (conn.Quantity || 0),
    0,
  ) || 0;

export const getPlugTypes = (connections: any[]) =>
  [
    ...new Set(
      connections
        .map((conn: any) => conn.ConnectionType?.Title)
        .filter(Boolean),
    ),
  ].join(', ');

export const hasFastCharger = (connections: any[]) =>
  connections?.some((conn: any) => conn.Level?.IsFastChargeCapable === true);
