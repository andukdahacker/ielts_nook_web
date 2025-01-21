import { useContext } from "react";
import AuthContext from "../auth/auth.context";
import AdminClassView from "./admin_class.view";
import StudentClassView from "./student_class.view";
import TeacherClassView from "./teacher_class.view";

function ClassView() {
  const { role } = useContext(AuthContext);

  switch (role) {
    case "ADMIN":
      return <AdminClassView />;
    case "TEACHER":
      return <TeacherClassView />;
    case "STUDENT":
      return <StudentClassView />;
  }

  return <>Unsupported role</>;
}

export default ClassView;
