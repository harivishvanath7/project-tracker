export function Container({ title }) {
  return (
    <div className="w-80 h-60 flex items-center justify-center bg-poGreen shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer">
      <h2 className="font-poppins text-3xl text-white font-semibold">{title}</h2>
    </div>
  );
}
