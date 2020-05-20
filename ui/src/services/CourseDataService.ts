import axios from 'axios';

export interface Course {
  id: number;
  username: string;
  description: string;
}

class CourseDataService {
  private readonly apiUrl = process.env.PUBLIC_URL || '';
  private readonly coursesApiUrl = this.apiUrl + '/api/courses';

  retrieveAllCourses(username: string) {
    return axios.get<Course[]>(`${this.coursesApiUrl}/${username}`);
  }

  retrieveCourse(username: string, courseId: number) {
    return axios.get<Course>(`${this.coursesApiUrl}/${username}/${courseId}`);
  }

  createCourse(username: string, course: Course) {
    return axios.post(`${this.coursesApiUrl}/${username}`, course);
  }

  updateCourse(username: string, courseId: number, course: Course) {
    return axios.put<Course>(`${this.coursesApiUrl}/${username}/${courseId}`, course);
  }

  deleteCourse(username: string, courseId: number) {
    return axios.delete(`${this.coursesApiUrl}/${username}/${courseId}`);
  }
}
export default new CourseDataService();
