import { database } from './../data/data.store';
import { IResolvers} from 'graphql-tools';
import _ from 'lodash';
import { UserInputError } from 'apollo-server-express';

const mutation: IResolvers = {
    Mutation: {
        addCourse(__: void, { course }): any {
            const { title, description, clases, time, level, logo, path, teacher } = course;
            const newCourse = {
                id: String(database.courses.length + 1 ),
                title,
                description,
                clases,
                time,
                level,
                logo,
                path,
                teacher,
                reviews: []
            }
            if (database.courses.filter(itemCourse => 
                itemCourse.title === newCourse.title ).length === 0) {
                    database.courses.push(newCourse);
                    return newCourse;
            }
            throw new UserInputError(
                `Title '${title}' exists in database`
            );           
        },
        editCourse(__: void, { course }): any {
            const indexCourse  = _.findIndex(database.courses, (c) => {
                return c.id === course.id
            });

            if( indexCourse > -1 ) {
                const oldCOurse = database.courses[indexCourse];
                database.courses[indexCourse] = {
                    ...course,
                    reviews: oldCOurse.reviews
                };
                return database.courses[indexCourse];
            }
            throw new UserInputError(
                `Course doesn't exists in database`
            )
        }
    }
    
}

export default mutation;