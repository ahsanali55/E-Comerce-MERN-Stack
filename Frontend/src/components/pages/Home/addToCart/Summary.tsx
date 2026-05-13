import React from 'react'
import { useAppSelector } from '../../../../hooks/hook'

const Summary = () => {
  const summarySubTotalPrice = useAppSelector((state: RootState) => state?.cart.summarySubTotalPrice)
  return (
    <div className='w-full md:max-w-[300px] min-h-[250px] border-[3px] my-4 ml-auto flex flex-col justify-between px-5 py-7'>
      <h1 className='font-semibold tracking-wide text-lg'>Selected Offer Summary</h1>
      <div className='flex justify-between text-[16px]'>
        <h1 className='opacity-40'>Sub Total:</h1>
        <h3>{summarySubTotalPrice.toString().split(".")[0]}</h3>
      </div>
     <div>
         <div className='flex justify-between text-[16px]'>
        <h1  className='opacity-40'>Tax:</h1>
        <h3>₹ 50</h3>
      </div>
      <hr  className='opacity-20' />
     </div>

      <div className='flex justify-between text-[16px]'>
        <h1  className='opacity-40'>Final Total:</h1>
        <h3>₹ {(summarySubTotalPrice > 0)? (Number(summarySubTotalPrice.toString().split(".")[0]) + 50): 0}</h3>
      </div>


    </div>
  )
}

export default Summary

