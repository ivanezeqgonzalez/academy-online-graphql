import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';
import _ from 'lodash';

const type: IResolvers = {
    Student: {
        courses: parent => {
            const arrCourses: Array<any> = [];
            parent.courses.map((course: String) => {
                arrCourses.push(
                    _.filter(database.courses, ['id', course])[0]
                )
            })
            return arrCourses;
        }
    },
    Course: {
        students: parent => {
            const arrStudents: Array<any> = [];
            const idCourse = parent.id;
            database.students.map((student: any) => {
                if (student.courses.filter( 
                    ( id: any ) => id ===  idCourse) > 0) {
                        arrStudents.push(student)
                }
            });
            return arrStudents
        },
        path: parent => `https://www.udemy.com${parent.path}`
        
    }
}

export default type;