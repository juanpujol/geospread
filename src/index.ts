/**
 * Calculates the haversine distance between two coordinates on Earth.
 * @param coord1 The first coordinate in the format [latitude, longitude].
 * @param coord2 The second coordinate in the format [latitude, longitude].
 * @returns The haversine distance between the two coordinates in meters.
 */
export function haversineDistance(coord1: [number, number], coord2: [number, number]): number {
	const [lat1, lon1] = coord1;
	const [lat2, lon2] = coord2;
	const toRadians = (angle: number): number => angle * (Math.PI / 180);

	const R = 6371e3; // Earth radius in meters
	const φ1 = toRadians(lat1);
	const φ2 = toRadians(lat2);
	const Δφ = toRadians(lat2 - lat1);
	const Δλ = toRadians(lon2 - lon1);

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
}

/**
 * Filters an array of points based on a minimum distance constraint.
 *
 * @param points - The array of points to filter.
 * @param minDistance - The minimum distance between points.
 * @param startPoint - The optional starting point. If provided, it will be included in the filtered points.
 * @returns An array of points that satisfy the minimum distance constraint.
 */
export function geospread(
	points: [number, number][],
	minDistance: number,
	startPoint: [number, number] | null = null
): [number, number][] {
	const filteredPoints: [number, number][] = startPoint ? [startPoint] : []; // Start with the specified startPoint if provided

	for (let i = 0; i < points.length; i++) {
		if (startPoint && points[i] === startPoint) continue; // Skip if it's the startPoint

		let isValid = true;

		for (let j = 0; j < filteredPoints.length; j++) {
			const distance = haversineDistance(points[i], filteredPoints[j]);

			if (distance < minDistance) {
				isValid = false;
				break;
			}
		}

		if (isValid) {
			filteredPoints.push(points[i]);
		}
	}

	return filteredPoints;
}

export default geospread;
