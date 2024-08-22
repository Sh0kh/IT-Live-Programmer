import React from 'react';
import Calendar from '/images/FinanceCalendar.png';
import Money from '/images/FinanceMoney.png';
import FinanceType from '/images/FinanceType.png';
import { gql, useQuery } from '@apollo/client';

const GET_MYPAYMENTS = gql`
    query{
    EmployeeFinance(EmployeeId:24){
      id
      type
      comment
      createdAt
    }
  }
`
function Payments() {
  const {data:MyPayments} = useQuery(GET_MYPAYMENTS)



  return (
    <div className='Payment w-full pb-[50px]'>
      <div className='mt-[50px]'>
        <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
          Ish haqqim
        </h1>
        <div className='PaymentTable bg-white rounded-[16px] p-[30px] w-[466px] mt-[25px]'>
          <table className='w-full'>
            <thead className='w-full'>
              <tr className='w-full'>
                <th className='text-left mr-[60px]'>
                  <span className='text-[#83818E] font-[400] text-[16px] flex items-center gap-[8px]'>
                    <img src={Calendar} alt="Calendar icon" />
                    Oy
                  </span>
                </th>
                <th className='text-left mr-[60px]'>
                  <span className='text-[16px] text-[#83818E] font-[400] flex items-center gap-[8px]'>
                    <img src={Money} alt="Money icon" />
                    Summa
                  </span>
                </th>
                <th className='text-left mr-[60px]'>
                  <span className='text-[16px] text-[#83818E] font-[400] flex items-center gap-[8px]'>
                    <img src={FinanceType} alt="Finance Type icon" />
                    Turi
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {MyPayments?.EmployeeFinance?.map((item, index) => (
                <tr key={index} className='mt-[25px]'>
                  <td className='text-left pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{index + 1}.</span>
                    <span className='text-[16px] font-[400] text-[#2C393D]'> {item.createdAt}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.price}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
