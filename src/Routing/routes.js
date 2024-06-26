import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from '../Layout/Layout'
import FileTypeList from "../Pages/FileType/FileTypeList";
import VariableDictionaryList from "../Pages/VariableDictionary/VariableDictionaryList";
import Login from '../Login/LoginPage'
import ClientMasterList from "../Pages/ClientMaster/ClientMasterList";
import TemplateTypeMasterList from "../Pages/TemplateTypeMaster/TemplateTypeMasterList";
import Dashboard from '../Pages/Dashboard/Dashboard';
import TemplateMasterList from "../Pages/TemplateMaster/TemplateMasterList";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />} />
        <Route path="/file-type" element={<Layout Component={FileTypeList} />} />
        <Route path="/variable-dictionary" element={<Layout Component={VariableDictionaryList} />} />
        <Route path="/client-master" element={<Layout Component={ClientMasterList} />} />
        <Route path="/templatetype-master" element={<Layout Component={TemplateTypeMasterList} />} />
        <Route path="/template-master" element={<Layout Component={TemplateMasterList} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
