import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import CourseDataService, {Course} from '../services/CourseDataService';

interface CourseDetailsProps extends RouteComponentProps<{ id: string }> {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = (props) => {
  const [course, setCourse] = useState<Course>({id: parseInt(props.match.params.id), description: '', username: ''});

  useEffect(() => {
    if (course.id > 0) {
      CourseDataService.retrieveCourse('mavortius', course.id)
        .then((response) => setCourse(response.data));
    }
  }, [course.id]);

  const handleSubmit = (values: Course) => {
    let username = 'mavortius';

    if (course.id === -1) {
      CourseDataService.createCourse(username, values)
        .then(() => props.history.push('/courses'));
    } else {
      CourseDataService.updateCourse(username, course.id, values)
        .then(() => props.history.push('/courses'));
    }
  }

  const validate = (values: Course) => {
    let errors: any = {};

    if (!values.description) {
      errors.description = 'Enter a description';
    } else if (values.description.length < 5) {
      errors.description = 'Enter at least 5 characters in description';
    }

    return errors;
  }

  return (
    <div>
      <h3>Course</h3>
      <div className="container">
        <Formik initialValues={course} onSubmit={handleSubmit}
                validateOnChange={false} validateOnBlur={false}
                validate={validate} enableReinitialize={true}>
          {(props) => (
            <Form>
              <ErrorMessage name="description" component="div" className="alert alert-danger"/>
              <fieldset className="form-group">
                <label>Id</label>
                <Field className="form-control" type="text" name="id" disabled/>
              </fieldset>
              <fieldset className="form-group">
                <label>Description</label>
                <Field className="form-control" type="text" name="description"/>
              </fieldset>
              <button className="btn btn-success" type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default CourseDetails;
