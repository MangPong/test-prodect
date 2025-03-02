"use client";

type BookingButtonProps = {
  dormitoryName: string;
};

export default function BookingButton({ dormitoryName }: BookingButtonProps) {
  const handleBooking = () => {
    alert(`🎉 คุณจองหอพัก ${dormitoryName} สำเร็จแล้ว!`);
  };

  return (
    <button
      onClick={handleBooking}
      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl shadow-lg text-lg transition-transform transform hover:scale-105"
    >
      🚀 จองเลย
    </button>
  );
}
