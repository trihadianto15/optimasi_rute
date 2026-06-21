export async function getRealRoute(route) {
  if (!route || route.length < 2) {
    return [];
  }

  const coordinates = route
    .map(
      (p) =>
        `${p.longitude},${p.latitude}`
    )
    .join(';');

  const url =
    `https://router.project-osrm.org/route/v1/driving/${coordinates}` +
    '?overview=full&geometries=geojson';

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (
      !data.routes ||
      data.routes.length === 0
    ) {
      return [];
    }

    return data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );

  } catch (error) {
    console.error(
      'Routing error:',
      error
    );

    return [];
  }
}