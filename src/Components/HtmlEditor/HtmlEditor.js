import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const HtmlEditor = ({ data, setData, setVariableUsed, variableUsed }) => {
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
      <ReactQuill
        theme="snow"
        value={data}
        onChange={handleChange}
        modules={HtmlEditor?.modules}
        formats={HtmlEditor?.formats}
        placeholder="Write something..."
      />
    </div>
  );
};

// Quill modules to attach to editor
HtmlEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// Quill formats
HtmlEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default HtmlEditor;
