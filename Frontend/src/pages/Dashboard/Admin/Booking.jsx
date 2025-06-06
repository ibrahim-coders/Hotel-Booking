import { useQuery } from '@tanstack/react-query';
import useAxiosSequrity from '../../../hooks/useCustomer';
import { FaTrashCan } from 'react-icons/fa6';

const Booking = () => {
  const axiosSequrity = useAxiosSequrity();
  const { data: allBooking } = useQuery({
    queryKey: ['allBooking'],
    queryFn: async () => {
      const res = await axiosSequrity.get('/allBooking');
      return res.data;
    },
  });
  console.log(allBooking);

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold text-blue-500">Booking Management</h2>
        <input
          type="text"
          className="border-2 border-blue-600 px-4 py-2 focus:outline-non text-sm rounded"
          placeholder="Search"
        />
      </div>
      <table className="w-full text-left border border-separate rounded border-slate-200">
        <thead>
          <tr>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Booking ID
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Guest
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Hotel
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Check-in
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Check-out
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Amount
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Status
            </th>
            <th className="h-10 px-4 text-sm font-medium bg-slate-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-slate-100">
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              BK001
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              John Smith
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              Grand Plaza Hotel
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              2025-06-15
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              2025-06-18
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              $747
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              <button className="bg-blue-300 hover:to-blue-400 rounded-full p-1 ">
                confirmed
              </button>
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500 flex items-center gap-4">
              <div className="cursor-pointer bg-red-600 hover:bg-red-800 p-1.5 rounded">
                <FaTrashCan className="size-3 text-white" />
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-100">
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              BK001
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              John Smith
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              Grand Plaza Hotel
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              2025-06-15
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              2025-06-18
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              $747
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500">
              <button className="bg-blue-300 hover:to-blue-400 rounded-full p-1 ">
                confirmed
              </button>
            </td>
            <td className="h-10 px-4 text-sm border-t border-l text-slate-500 flex items-center gap-4">
              <div className="cursor-pointer bg-red-600 hover:bg-red-800 p-1.5 rounded">
                <FaTrashCan className="size-3 text-white" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
