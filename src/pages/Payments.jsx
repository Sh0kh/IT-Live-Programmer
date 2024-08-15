import React from 'react';
import Calendar from '/images/FinanceCalendar.png';
import Money from '/images/FinanceMoney.png';
import FinanceType from '/images/FinanceType.png';

function Payments() {
  const PaymentFakeData = Array.from({ length: 10 }, (_, index) => ({
    month: `Yanvar`,
    Summa: `${25_000_000 + index * 1_000_000}`,
    Type: index % 2 === 0 ? 'naqt' : 'kartochka',
  }));

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
              {PaymentFakeData.map((item, index) => (
                <tr key={index} className='mt-[25px]'>
                  <td className='text-left pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{index + 1}.</span>
                    <span className='text-[16px] font-[400] text-[#2C393D]'> {item.month}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.Summa}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.Type}</span>
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
