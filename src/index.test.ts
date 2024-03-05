import { describe, it, expect } from 'vitest';
import { geospread } from './index';

const points: [number, number][] = [
	[40.7481, -73.9956],
	[40.7479, -73.993],
	[40.7466, -73.9939],
	[40.7454, -73.9915],
	[40.7461, -73.9909]
];

describe('geospread', () => {
	it('should filter points based on minimum distance', () => {
		const minDistance = 130;
		const startPoint: [number, number] = [40.7454, -73.9915];
		const result = geospread(points, minDistance, startPoint);

		expect(result).toEqual([
			[40.7454, -73.9915],
			[40.7481, -73.9956],
			[40.7479, -73.993],
			[40.7466, -73.9939]
		]);
	});

	it('should handle empty points array', () => {
		const points: [number, number][] = [];
		const minDistance = 2;
		const startPoint: [number, number] | null = [0, 0];

		const result = geospread(points, minDistance, startPoint);

		expect(result).toEqual([[0, 0]]);
	});

	it('should handle null startPoint', () => {
		const minDistance = 130;
		const result = geospread(points, minDistance);

		expect(result).toEqual([
			[40.7481, -73.9956],
			[40.7479, -73.993],
			[40.7466, -73.9939],
			[40.7454, -73.9915]
		]);
	});
});
