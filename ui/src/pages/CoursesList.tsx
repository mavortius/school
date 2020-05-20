import React, {useEffect, useState} from "react";
import CourseDataService, {Course} from "../services/CourseDataService";
import { RouteComponentProps } from "react-router-dom";

const CoursesList: React.FC<RouteComponentProps> = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    refreshCourses();
  }, []);

  const refreshCourses = () => {
    CourseDataService.retrieveAllCourses('mavortius')
      .then((response) => {
        setCourses(response.data);
      });
  };

  const handleDeleteCourseButtonClick = (courseId: number) => {
    CourseDataService.deleteCourse("mavortius", courseId)
      .then(() => {
        setFeedbackMessage(`Delete of course ${courseId} successful`);
        refreshCourses();
      });
  }

  const handleUpdateCourseClick = (courseId: number) => {
    props.history.push(`/courses/${courseId}`);
  };

  const handleAddCourseClick = () => {
    props.history.push('/courses/-1');
  };

  return (
    <div className="container">
      <h3>All Courses</h3>
      {feedbackMessage && <div className="alert alert-success">{feedbackMessage}</div>}
      <div className="row">
        <button className="btn btn-primary" onClick={handleAddCourseClick}>Add</button>
      </div>
      <div className="container">
        <table className="table">
          <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th colSpan={2}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.description}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleDeleteCourseButtonClick(course.id)}>Delete</button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleUpdateCourseClick(course.id)}>Update</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CoursesList;
