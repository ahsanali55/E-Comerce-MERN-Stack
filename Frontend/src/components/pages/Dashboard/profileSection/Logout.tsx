import React from 'react'
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/hook';
import { logout } from '../../../../store/authSlice';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLagout = async() => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <>
    <div className='flex cursor-pointer items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 hover:shadow-sm' onClick={handleLagout}>
        <MdLogout className='text-xl' />
      <h1>Logout</h1>
    </div>
    </>
  )
}

export default Logout

