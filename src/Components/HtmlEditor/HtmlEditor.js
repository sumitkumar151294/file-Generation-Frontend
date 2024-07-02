/* eslint-disable react-hooks/exhaustive-deps */

import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import JoditEditor from 'jodit-react'
 
const HtmlEditor = ({ data, setData, setVariableUsed,seterror }) => {
  const options = [ 'bold', 'italic', '|', 'ul', 'ol', '|', 'font', 'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', '|', 'fullsize', 'brush', '|', 'table', 'link', '|', 'undo', 'redo','source'];
  const variableData = useSelector((state) => state?.variableReducer?.getVariableData);
  const extractVariables = (str) => {
    const regex = /{{@(.*?)}}/g;
    const matches = str.match(regex);
    if (!matches) {
      return [];
    }
    return matches.map(match => {
      return match.substring(2, match.length - 2).trim();
    });
  }

  const config = useMemo(
    () => ({
    readonly: false,
    placeholder: '',
    defaultActionOnPaste: 'insert_as_html',
    defaultLineHeight: 1.5,
    enter: 'div',
   // options that we defined in above step.
    buttons: options,
    buttonsMD: options,
    buttonsSM: options,
    buttonsXS: options,
    statusbar: false,
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    toolbarAdaptive: false,
    }),
    [],
   );


  const findVariableByName = (variableName) => {
    return variableData.find(item => item.variableName === variableName);
  }
  const handleChange = (content) => {
    setData(content);
    const variableData = extractVariables(content)
    const mySet = [];
    variableData.forEach(item => {
      const data = findVariableByName(item);
      if (data) {
        const res = mySet.includes(data.id);
        if (!res) {
          mySet.push(data.id);
        }
      }
    });

    setVariableUsed(mySet);
  };


  return (
    <div>
      <JoditEditor
      value={data}       
        config={config}
        onChange={handleChange}
        placeholder="Write something..."
/>
    </div>
  );
};
export default HtmlEditor;
/* eslint-enable react-hooks/exhaustive-deps */
