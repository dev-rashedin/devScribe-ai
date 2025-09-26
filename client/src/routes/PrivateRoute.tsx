import { JSX } from 'react'
import useAuth from '../hooks'
import { Navigate, useLocation } from 'react-router'


const PrivateRoute = ({ children } : {children: JSX.Element}) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // loading state
  if (loading) {
    return (
      <div className='h-screen flex-center '>
        <div className='flex flex-col m-8 rounded shadow-md max-w-3xl w-full h-[80vh] animate-pulse'>
          <div className='h-48 rounded-t bg-gray-700'></div>
          <div className='flex-1 space-y-4 p-4 sm:p-8 bg-gray-900'>
            <div className='w-full h-40 rounded bg-gray-700'></div>
            <div className='w-full h-28 rounded bg-gray-700'></div>
            <div className='w-full h-16 rounded bg-gray-700'></div>
            <div className='w-11/12 h-8 rounded bg-gray-700'></div>
            <div className='w-3/4 h-8 rounded bg-gray-700'></div>
          </div>
        </div>
      </div>
    );
  }


  if (user)
  { return children }

  return <Navigate to='/signin' state={location.pathname} replace />
}

export default PrivateRoute
