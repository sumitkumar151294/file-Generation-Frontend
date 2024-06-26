import React from 'react'
import { useSelector } from 'react-redux';

const VariableDictionary = ({variableUsed}) => {
  const variableData = useSelector((state) => state?.variableReducer?.getVariableData);

  return (
    <div className="col-lg-4">
    <h2>Variable Dictionary</h2>
    <div className="loafer">
      <table className="w-100">
        <thead>
          <tr>
            <th scope="col">Variable Name</th>
            <th scope="col">Variable</th>
          </tr>
        </thead>
        <tbody>
          {variableData?.length ? (
            variableData.map((variable, index) => (
              <tr key={index}>
                <td data-label="Variable Name">{variable?.variableName} {variableUsed.includes(variable.id) && <i class="fa-solid fa-check"></i> } </td>
                <td data-label="Variable">{variable?.variable}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default VariableDictionary