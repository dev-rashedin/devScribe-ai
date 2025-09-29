const LoadingDots = () => {
  return (
    <main className='flex my-2 space-x-2 justify-center items-center'>
      <div className='h-2 w-2 bg-card-secondary rounded-full animate-bounce [animation-delay:-0.3s] bg-card-secondary'></div>
      <div className='h-2 w-2 bg-card-secondary  rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-2 w-2 bg-card-secondary  rounded-full animate-bounce'></div>
    </main>
  );
}
export default LoadingDots