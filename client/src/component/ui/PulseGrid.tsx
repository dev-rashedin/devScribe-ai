const delays = [
  '-0.8s',
  '-0.6s',
  '-0.4s',
  '-0.6s',
  '-0.4s',
  '-0.2s',
  '-0.4s',
  '-0.2s',
  '0s',
];

const PulseGrid= () => {
  return (
    <div className='size-12 my-12 mx-auto grid grid-cols-3 gap-0.5'>
      {delays.map((delay, index) => (
        <div
          key={index}
          className='bg-blue-500 rounded-sm animate-pulse'
          style={{
            animationDelay: delay,
            animationDuration: '3s',
          }}
        ></div>
      ))}
    </div>
  );
};

export default PulseGrid;
