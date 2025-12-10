import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ongoingTuitions = [], isLoading } = useQuery({
    queryKey: ['ongoingTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approvedTuitions/approved');
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ongoing Tuitions</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Days</th>
            <th>Time</th>
            <th>Location</th>
            <th>Tracking ID</th>
            <th>Payment Status</th>
          </tr>
        </thead>
    <tbody>
  {Array.isArray(ongoingTuitions) ? ongoingTuitions.map((tuition, index) => (
    <tr key={tuition._id}>
      <th>{index + 1}</th>
      <td>{tuition.studentName}</td>
      <td>{tuition.subject}</td>
      <td>{tuition.class}</td>
      <td>{tuition.days}</td>
      <td>{tuition.time}</td>
      <td>{tuition.location}</td>
      <td>{tuition.trackingId}</td>
      <td>{tuition.paymentStatus}</td>
    </tr>
  )) : <tr><td colSpan="9">No ongoing tuitions found</td></tr>}
</tbody>

      </table>
      {ongoingTuitions.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No ongoing tuitions found.</p>
      )}
    </div>
  );
};

export default OngoingTuitions;
