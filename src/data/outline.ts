// The country's outline, from Natural Earth (1:110m, public domain), on a fixed box:
// longitude 34.0 to 56.5, latitude 15.5 to 32.5, mapped onto a 1000 x 816 view (equirectangular, slightly stretched north to south).
export const VIEW_BOX = '0 0 1000 816';
const LON0 = 34.0, LON1 = 56.5, LAT0 = 15.5, LAT1 = 32.5, W = 1000, H = 816;

// A point on the map for a place: x grows east, y grows south
export function project(lat: number, lon: number): { x: number; y: number } {
  return { x: ((lon - LON0) / (LON1 - LON0)) * W, y: ((LAT1 - lat) / (LAT1 - LAT0)) * H };
}

export const OUTLINE_PATH = 'M42.5 150.9 L92.0 158.5 L111.2 143.7 L121.8 126.5 L155.7 119.8 L163.0 103.7 L177.7 95.6 L133.4 47.6 L222.4 23.5 L230.9 16.3 L284.4 29.3 L350.7 62.9 L476.0 159.4 L558.6 163.2 L598.2 167.9 L609.3 190.7 L640.7 189.5 L658.1 230.9 L680.0 241.9 L687.6 258.7 L717.9 278.9 L720.6 298.7 L716.1 314.7 L721.8 330.8 L734.6 344.3 L740.5 360.0 L747.1 371.8 L760.6 381.3 L772.9 377.9 L781.3 396.2 L783.0 407.3 L800.0 455.9 L933.6 480.1 L942.6 470.0 L963.0 504.0 L933.3 600.0 L800.0 648.0 L671.9 666.4 L630.4 688.0 L598.5 738.4 L577.8 746.4 L566.7 730.4 L549.6 732.8 L506.7 728.0 L498.5 723.2 L447.2 724.3 L435.2 728.6 L416.9 716.2 L405.1 739.8 L409.7 760.0 L390.2 775.3 L384.4 754.8 L371.0 740.4 L367.6 721.2 L344.6 704.0 L321.0 663.8 L308.4 624.6 L277.7 591.6 L257.9 583.7 L228.4 538.0 L223.3 504.6 L225.2 476.2 L199.7 423.0 L178.8 404.2 L154.8 394.3 L140.2 366.8 L142.6 355.9 L130.3 331.1 L117.3 320.3 L100.0 284.6 L72.9 245.9 L50.2 213.0 L28.1 213.2 L35.0 186.8 L37.0 170.0 L42.5 150.9 Z';
