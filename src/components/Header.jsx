import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className='bg-white py-4 px-6 shadow flex justify-between items-center border-b'>
      <img src='' alt='Logo' />
      {router.pathname === '/add-vehicle' ? (
        <Link href='/' className='text-blue-600 hover:underline'>
          Back to Vehicle List
        </Link>
      ) : (
        <Link href='/add-vehicle' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add Vehicle
        </Link>
      )}
    </header>
  );
}
