// const BASE_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels';
// const HEADERS = {
//   'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
//   'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
// };

// // 🔍 Get hotels based on location name (e.g., "paris")
// export async function searchHotelsByLocationName(locationName: string) {
//   try {
//     // Step 1: Get destination/location ID
//     const destinationRes = await fetch(
//       `${BASE_URL}/searchDestination?query=${locationName}`,
//       { headers: HEADERS }
//     );
//     const destinationData = await destinationRes.json();
//     const locationId = destinationData?.data?.[0]?.location_id;

//     if (!locationId) {
//       throw new Error(`No matching location found for "${locationName}"`);
//     }

//     // Step 2: Use location ID to fetch hotels
//     const hotelsRes = await fetch(
//       `${BASE_URL}/searchHotel?location_id=${locationId}&checkin_date=2025-05-01&checkout_date=2025-05-05&adults_number=2`,
//       { headers: HEADERS }
//     );

//     if (!hotelsRes.ok) {
//       throw new Error(`Failed to fetch hotels for location "${locationName}"`);
//     }

//     const hotelsData = await hotelsRes.json();
//     return hotelsData?.data || [];
//   } catch (error) {
//     console.error('Hotel search error:', error);
//     return [];
//   }
// }

// // 🏨 Get details for a specific hotel by hotelId
// export async function fetchHotelDetails(hotelId: string) {
//   try {
//     const res = await fetch(
//       `https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotel_id=${hotelId}&locale=en-us`,
//       { headers: HEADERS }
//     );

//     if (!res.ok) {
//       throw new Error('Failed to fetch hotel details');
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Hotel details fetch error:', error);
//     return null;
//   }
// }
