/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../Components/InputField/InputField';
import { onGetVariable } from '../../Store/Slices/variableSlice';


const VariableDictionary = ({ variableUsed ,TemplateType}) => {
  console.log(variableUsed)
  const dispatch=useDispatch()
  const [filterValue, setFilterValue] = useState('');
  const variableData = useSelector((state) => state?.variableReducer?.getVariableData);
  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };
  const templateMasterData = useSelector(
    (state) => state.templateMasterReducer?.postLoading
  );
const variableIsloading=useSelector((state) => state?.variableReducer?.isLoading)
  const filteredData =  variableData?.filter(variable =>
    variable?.variableName?.toLowerCase().includes(filterValue.toLowerCase()) && variable.templateTypeId===TemplateType
  )
useEffect(()=>{
if(!variableData){
  dispatch(onGetVariable())
}
},[])
  return (
    <>

    <div className="col-lg-4">
      <h2>Variable Dictionary</h2>
      <div className="customer-search mb-sm-0 mb-3">
        <div className="input-group search-area">
          <InputField
            type="text"
            className="form-control only-high"
            placeholder="Search here...."
            value={filterValue}
            onChange={handleInputChange}
          />
          <span className="input-group-text">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div className="loafer">
  {variableIsloading || templateMasterData ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <table className="w-100">
      <thead>
        <tr>
          <th scope="col">Variable Name</th>
          <th scope="col">Variable</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.length ? (
          filteredData.map((variable, index) => (
            <tr key={index}>
              <td data-label="Variable Name">
                {variable?.variableName}{' '}
                {variableUsed.includes(variable.id) && (
                  <i className="fa-solid fa-check"></i>
                )}
              </td>
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
  )}
</div>

    </div>
    </>
  )
}

export default VariableDictionary;
/* eslint-enable react-hooks/exhaustive-deps */
