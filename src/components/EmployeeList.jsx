// EmployeeList.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_COMMON_EMPLOYEE = gql`
  query {
    CommonEmployee(sortByRole: CEO) {
      participateProjectCount
      employee {
        id
        name
      }
    }
  }
`;

const EmployeeList = () => {
  const { loading, error, data } = useQuery(GET_COMMON_EMPLOYEE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Common Employees (CEO)</h1>
      <ul>
        {data.CommonEmployee.map((item, index) => (
          <li key={index}>
            <p>Name: {item.employee.name}</p>
            <p>Projects Participated: {item.participateProjectCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
