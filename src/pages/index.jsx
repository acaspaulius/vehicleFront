// src/pages/index.js
import { useQuery, gql } from '@apollo/client';

const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      vehicle_make
      vehicle_model
      vehicle_year
      plate_number
      transmission
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className='container my-4'>
      <div className='grid mx-4 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {data &&
          data.vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_make + vehicle.vehicle_model} className='border p-4 rounded shadow flex flex-col gap-2'>
              <h2 className='text-xl'>
                {vehicle.vehicle_make} {vehicle.vehicle_model}
              </h2>
              <p>Year: {vehicle.vehicle_year}</p>
              <p>Plate Number: {vehicle.plate_number}</p>
              <p>Transmission: {vehicle.transmission}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
