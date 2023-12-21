import { BrowserRouter as Routers,Routes,Route,Link} from "react-router-dom";
import StudentData from "./StudentData";
import StudentForm from "./StudentForm";
import StudentEdit from "./StudentEdit";
import Registration from "./Registration";
import Login from "./Login";

function App(){
  return(
    <div>
      <Routers>
        <Routes>
          <Route path="/" element={<Registration/>}/>
          <Route path="/admin" element={<Login/>}/>
          <Route path="/home" element={<StudentData/>}/>
          <Route path="/studentForm" element={<StudentForm/>}/>
          <Route path="/studentedit/:studentid" element={<StudentEdit/>}/>
        </Routes>
      </Routers>
    </div>
  )
}
export default App;
