import { useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Toast from '../components/Toast';

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

const ADD_VEHICLE = gql`
  mutation AddVehicle($vehicle_make: String!, $vehicle_model: String!, $vehicle_year: Int!, $plate_number: String!, $transmission: String!) {
    addVehicle(
      vehicle_make: $vehicle_make
      vehicle_model: $vehicle_model
      vehicle_year: $vehicle_year
      plate_number: $plate_number
      transmission: $transmission
    ) {
      success
      message
      vehicle {
        vehicle_make
        vehicle_model
        vehicle_year
        plate_number
        transmission
      }
    }
  }
`;

export default function AddVehicle() {
  const vehicleMakeRef = useRef();
  const vehicleModelRef = useRef();
  const vehicleYearRef = useRef();
  const plateNumberRef = useRef();
  const transmissionRef = useRef();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [addVehicle, { loading, error }] = useMutation(ADD_VEHICLE, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data.addVehicle.success) {
        triggerToast('Vehicle added successfully!', 'success');
        vehicleMakeRef.current.value = '';
        vehicleModelRef.current.value = '';
        vehicleYearRef.current.value = '';
        plateNumberRef.current.value = '';
        transmissionRef.current.value = '';
      } else {
        triggerToast(data.addVehicle.message, 'error');
      }
    },
    onError: (error) => {
      triggerToast(error.message, 'error');
    },
    refetchQueries: [{ query: GET_VEHICLES }],
  });

  const triggerToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submission triggered');

    const vehicle_make_value = vehicleMakeRef.current.value;
    const vehicle_model_value = vehicleModelRef.current.value;
    const vehicle_year_value = vehicleYearRef.current.value;
    const plate_number_value = plateNumberRef.current.value;
    const transmission_value = transmissionRef.current.value;

    if (!vehicle_year_value || isNaN(vehicle_year_value) || vehicle_year_value.length !== 4) {
      triggerToast('Year must be a four-digit number.', 'error');
      return;
    }

    const variables = {
      vehicle_make: vehicle_make_value,
      vehicle_model: vehicle_model_value,
      vehicle_year: parseInt(vehicle_year_value, 10),
      plate_number: plate_number_value,
      transmission: transmission_value.toLowerCase(),
    };

    try {
      await addVehicle({ variables });
    } catch (e) {
      triggerToast(e.message || 'An error occurred while adding the vehicle.', 'error');
    }
  };

  return (
    <div className='mx-4 sm:mx-0 p-4 shadow border my-4 rounded'>
      {toast.show && <Toast message={toast.message} onClose={() => setToast({ ...toast, show: false })} type={toast.type} />}
      <h1 className='text-2xl font-bold mb-4'>Add a New Vehicle</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full md:w-1/2'>
        <input className='p-2 border shadow rounded' type='text' placeholder='Vehicle Make' ref={vehicleMakeRef} required />
        <input className='p-2 border shadow rounded' type='text' placeholder='Vehicle Model' ref={vehicleModelRef} required />
        <input className='p-2 border shadow rounded' type='number' placeholder='Vehicle Year' ref={vehicleYearRef} required />
        <input className='p-2 border shadow rounded' type='text' placeholder='Plate Number' ref={plateNumberRef} required />

        <select className='p-2 border shadow rounded' ref={transmissionRef} required defaultValue=''>
          <option value='' disabled hidden>
            Select Transmission
          </option>
          <option value='Manual'>Manual</option>
          <option value='Automatic'>Automatic</option>
        </select>

        <div className='flex justify-end'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
