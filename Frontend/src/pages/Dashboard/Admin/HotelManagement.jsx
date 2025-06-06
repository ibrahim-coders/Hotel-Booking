import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import useAxiosSequrity from '../../../hooks/useCustomer';
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import AddHotel from './AddHotel';
import HotelUpdatePage from './HotelUpdatePage';

const HotelManagement = () => {
  const axiosSequrity = useAxiosSequrity();
  const [isHotel, setHotel] = useState(false);
  const [hotelUpdate, setHotelUpdate] = useState(null);

  const { data: hotels, refetch } = useQuery({
    queryKey: ['hotelManagement'],
    queryFn: async () => {
      const res = await axiosSequrity.get('/allhotels/admin');
      return res.data;
    },
  });

  const handleHotelDeleted = async id => {
    try {
      const res = await axiosSequrity.delete(`/singleHotels/${id}`);
      if (res.status === 200) {
        toast.success(res?.data?.message || 'Hotel deleted successfully!');
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete hotel');
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold text-blue-500">Hotel Management</h2>
        <button
          onClick={() => {
            setHotel(!isHotel);
            setHotelUpdate(null);
          }}
          className="flex items-center gap-2 text-white bg-blue-500 transition-colors duration-200 ease-in-out hover:bg-blue-800 cursor-pointer py-2 px-3 rounded shadow"
        >
          {isHotel ? (
            'View Hotels'
          ) : (
            <>
              <IoMdAdd className="size-6" />
              Add Hotel
            </>
          )}
        </button>
      </div>

      {isHotel ? (
        <AddHotel />
      ) : hotelUpdate ? (
        <HotelUpdatePage hotel={hotelUpdate} />
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-separate rounded border-slate-200">
            <thead>
              <tr>
                <th className="h-10 px-4 text-sm font-medium bg-slate-100">
                  Hotel Name
                </th>
                <th className="h-10 px-4 text-sm font-medium bg-slate-100">
                  Location
                </th>
                <th className="h-10 px-4 text-sm font-medium bg-slate-100">
                  Rating
                </th>
                <th className="h-10 px-4 text-sm font-medium bg-slate-100">
                  Revenue
                </th>
                <th className="h-10 px-4 text-sm font-medium bg-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {hotels?.map(hotel => (
                <tr key={hotel._id} className="hover:bg-slate-100">
                  <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
                    {hotel.name}
                  </td>
                  <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
                    {hotel.location}
                  </td>
                  <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
                    {hotel.rating}
                  </td>
                  <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
                    {hotel.price}
                  </td>
                  <td className="h-10 px-4 text-sm border-t border-l text-slate-500 flex items-center gap-4">
                    <FaEdit
                      className="size-4 text-blue-800 hover:text-blue-500 cursor-pointer"
                      onClick={() => setHotelUpdate(hotel)}
                    />
                    <div
                      className="cursor-pointer bg-red-600 hover:bg-red-800 p-1.5 rounded"
                      onClick={() => handleHotelDeleted(hotel._id)}
                    >
                      <FaTrashCan className="size-3 text-white" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default HotelManagement;
