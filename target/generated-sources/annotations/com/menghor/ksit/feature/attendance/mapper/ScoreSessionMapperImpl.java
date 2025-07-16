package com.menghor.ksit.feature.attendance.mapper;

import com.menghor.ksit.enumations.SemesterEnum;
import com.menghor.ksit.feature.attendance.dto.response.ScoreSessionResponseDto;
import com.menghor.ksit.feature.attendance.dto.response.StudentScoreResponseDto;
import com.menghor.ksit.feature.attendance.models.ScoreSessionEntity;
import com.menghor.ksit.feature.attendance.models.StudentScoreEntity;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.SemesterEntity;
import com.menghor.ksit.feature.school.model.CourseEntity;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class ScoreSessionMapperImpl implements ScoreSessionMapper {

    @Autowired
    private StudentScoreMapper studentScoreMapper;

    @Override
    public ScoreSessionResponseDto toDto(ScoreSessionEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ScoreSessionResponseDto scoreSessionResponseDto = new ScoreSessionResponseDto();

        scoreSessionResponseDto.setScheduleId( entityScheduleId( entity ) );
        scoreSessionResponseDto.setTeacherId( entityTeacherId( entity ) );
        scoreSessionResponseDto.setTeacherName( mapTeacherName( entity.getTeacher() ) );
        scoreSessionResponseDto.setClassId( entityScheduleClassesId( entity ) );
        scoreSessionResponseDto.setClassCode( mapClassName( entityScheduleClasses( entity ) ) );
        scoreSessionResponseDto.setCourseId( entityScheduleCourseId( entity ) );
        scoreSessionResponseDto.setSemester( entityScheduleSemesterSemester( entity ) );
        scoreSessionResponseDto.setCourseName( mapCourseName( entityScheduleCourse( entity ) ) );
        scoreSessionResponseDto.setStudentScores( studentScoreEntityListToStudentScoreResponseDtoList( entity.getStudentScores() ) );
        scoreSessionResponseDto.setId( entity.getId() );
        scoreSessionResponseDto.setStatus( entity.getStatus() );
        scoreSessionResponseDto.setSubmissionDate( entity.getSubmissionDate() );
        scoreSessionResponseDto.setTeacherComments( entity.getTeacherComments() );
        scoreSessionResponseDto.setStaffComments( entity.getStaffComments() );
        scoreSessionResponseDto.setCreatedAt( entity.getCreatedAt() );

        return scoreSessionResponseDto;
    }

    private Long entityScheduleId(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        Long id = schedule.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityTeacherId(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        UserEntity teacher = scoreSessionEntity.getTeacher();
        if ( teacher == null ) {
            return null;
        }
        Long id = teacher.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityScheduleClassesId(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        ClassEntity classes = schedule.getClasses();
        if ( classes == null ) {
            return null;
        }
        Long id = classes.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private ClassEntity entityScheduleClasses(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        ClassEntity classes = schedule.getClasses();
        if ( classes == null ) {
            return null;
        }
        return classes;
    }

    private Long entityScheduleCourseId(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Long id = course.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private SemesterEnum entityScheduleSemesterSemester(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        SemesterEntity semester = schedule.getSemester();
        if ( semester == null ) {
            return null;
        }
        SemesterEnum semester1 = semester.getSemester();
        if ( semester1 == null ) {
            return null;
        }
        return semester1;
    }

    private CourseEntity entityScheduleCourse(ScoreSessionEntity scoreSessionEntity) {
        if ( scoreSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = scoreSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        return course;
    }

    protected List<StudentScoreResponseDto> studentScoreEntityListToStudentScoreResponseDtoList(List<StudentScoreEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<StudentScoreResponseDto> list1 = new ArrayList<StudentScoreResponseDto>( list.size() );
        for ( StudentScoreEntity studentScoreEntity : list ) {
            list1.add( studentScoreMapper.toDto( studentScoreEntity ) );
        }

        return list1;
    }
}
