package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.enumations.DayOfWeek;
import com.menghor.ksit.enumations.SemesterEnum;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.RoomEntity;
import com.menghor.ksit.feature.master.model.SemesterEntity;
import com.menghor.ksit.feature.school.model.CourseEntity;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import com.menghor.ksit.feature.survey.dto.response.StudentSurveyResponseDto;
import com.menghor.ksit.feature.survey.dto.response.SurveyResponseDetailDto;
import com.menghor.ksit.feature.survey.model.SurveyEntity;
import com.menghor.ksit.feature.survey.model.SurveyResponseEntity;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SurveyResponseMapperImpl extends SurveyResponseMapper {

    @Override
    public StudentSurveyResponseDto toStudentResponseDto(SurveyResponseEntity entity) {
        if ( entity == null ) {
            return null;
        }

        StudentSurveyResponseDto studentSurveyResponseDto = new StudentSurveyResponseDto();

        studentSurveyResponseDto.setSurveyId( entitySurveyId( entity ) );
        studentSurveyResponseDto.setSurveyTitle( entity.getSurveyTitleSnapshot() );
        studentSurveyResponseDto.setSurveyDescription( entity.getSurveyDescriptionSnapshot() );
        studentSurveyResponseDto.setUser( mapUserBasicInfo( entity.getUser() ) );
        studentSurveyResponseDto.setSections( mapSurveySnapshot( entity ) );
        studentSurveyResponseDto.setScheduleId( entityScheduleId( entity ) );
        studentSurveyResponseDto.setCourseName( entityScheduleCourseNameEn( entity ) );
        studentSurveyResponseDto.setCourseCode( entityScheduleCourseCode( entity ) );
        studentSurveyResponseDto.setCredit( entityScheduleCourseCredit( entity ) );
        studentSurveyResponseDto.setTheory( entityScheduleCourseTheory( entity ) );
        studentSurveyResponseDto.setExecute( entityScheduleCourseExecute( entity ) );
        studentSurveyResponseDto.setApply( entityScheduleCourseApply( entity ) );
        studentSurveyResponseDto.setTotalHour( entityScheduleCourseTotalHour( entity ) );
        studentSurveyResponseDto.setCourseDescription( entityScheduleCourseDescription( entity ) );
        studentSurveyResponseDto.setTeacherId( entityScheduleUserId( entity ) );
        studentSurveyResponseDto.setTeacherName( mapTeacherName( entityScheduleUser( entity ) ) );
        studentSurveyResponseDto.setTeacherEmail( entityScheduleUserEmail( entity ) );
        studentSurveyResponseDto.setDayOfWeek( entityScheduleDay( entity ) );
        studentSurveyResponseDto.setStartTime( entityScheduleStartTime( entity ) );
        studentSurveyResponseDto.setEndTime( entityScheduleEndTime( entity ) );
        studentSurveyResponseDto.setTimeSlot( mapTimeSlot( entity.getSchedule() ) );
        studentSurveyResponseDto.setRoomName( entityScheduleRoomName( entity ) );
        studentSurveyResponseDto.setClassName( entityScheduleClassesCode( entity ) );
        SemesterEnum semester = entityScheduleSemesterSemester( entity );
        if ( semester != null ) {
            studentSurveyResponseDto.setSemesterName( semester.name() );
        }
        studentSurveyResponseDto.setAcademyYear( entityScheduleSemesterAcademyYear( entity ) );
        studentSurveyResponseDto.setSemesterDisplay( mapSemesterDisplay( entityScheduleSemester( entity ) ) );
        studentSurveyResponseDto.setId( entity.getId() );
        studentSurveyResponseDto.setSubmittedAt( entity.getSubmittedAt() );
        studentSurveyResponseDto.setIsCompleted( entity.getIsCompleted() );
        studentSurveyResponseDto.setCreatedAt( entity.getCreatedAt() );

        return studentSurveyResponseDto;
    }

    @Override
    public SurveyResponseDetailDto toDetailDto(SurveyResponseEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SurveyResponseDetailDto surveyResponseDetailDto = new SurveyResponseDetailDto();

        surveyResponseDetailDto.setId( entity.getId() );
        surveyResponseDetailDto.setSurveyId( entitySurveyId( entity ) );
        surveyResponseDetailDto.setSurveyTitle( entity.getSurveyTitleSnapshot() );
        surveyResponseDetailDto.setSurveyDescription( entity.getSurveyDescriptionSnapshot() );
        surveyResponseDetailDto.setStudent( mapUserBasicInfo( entity.getUser() ) );
        surveyResponseDetailDto.setSchedule( mapScheduleBasicInfo( entity.getSchedule() ) );
        surveyResponseDetailDto.setSections( mapSurveySnapshot( entity ) );
        surveyResponseDetailDto.setSubmittedAt( entity.getSubmittedAt() );
        surveyResponseDetailDto.setIsCompleted( entity.getIsCompleted() );
        surveyResponseDetailDto.setCreatedAt( entity.getCreatedAt() );

        return surveyResponseDetailDto;
    }

    @Override
    public List<StudentSurveyResponseDto> toStudentResponseDtoList(List<SurveyResponseEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<StudentSurveyResponseDto> list = new ArrayList<StudentSurveyResponseDto>( entities.size() );
        for ( SurveyResponseEntity surveyResponseEntity : entities ) {
            list.add( toStudentResponseDto( surveyResponseEntity ) );
        }

        return list;
    }

    private Long entitySurveyId(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        SurveyEntity survey = surveyResponseEntity.getSurvey();
        if ( survey == null ) {
            return null;
        }
        Long id = survey.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityScheduleId(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        Long id = schedule.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityScheduleCourseNameEn(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        String nameEn = course.getNameEn();
        if ( nameEn == null ) {
            return null;
        }
        return nameEn;
    }

    private String entityScheduleCourseCode(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        String code = course.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private Integer entityScheduleCourseCredit(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer credit = course.getCredit();
        if ( credit == null ) {
            return null;
        }
        return credit;
    }

    private Integer entityScheduleCourseTheory(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer theory = course.getTheory();
        if ( theory == null ) {
            return null;
        }
        return theory;
    }

    private Integer entityScheduleCourseExecute(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer execute = course.getExecute();
        if ( execute == null ) {
            return null;
        }
        return execute;
    }

    private Integer entityScheduleCourseApply(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer apply = course.getApply();
        if ( apply == null ) {
            return null;
        }
        return apply;
    }

    private Integer entityScheduleCourseTotalHour(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer totalHour = course.getTotalHour();
        if ( totalHour == null ) {
            return null;
        }
        return totalHour;
    }

    private String entityScheduleCourseDescription(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        String description = course.getDescription();
        if ( description == null ) {
            return null;
        }
        return description;
    }

    private Long entityScheduleUserId(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        UserEntity user = schedule.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private UserEntity entityScheduleUser(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        UserEntity user = schedule.getUser();
        if ( user == null ) {
            return null;
        }
        return user;
    }

    private String entityScheduleUserEmail(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        UserEntity user = schedule.getUser();
        if ( user == null ) {
            return null;
        }
        String email = user.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }

    private DayOfWeek entityScheduleDay(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        DayOfWeek day = schedule.getDay();
        if ( day == null ) {
            return null;
        }
        return day;
    }

    private LocalTime entityScheduleStartTime(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        LocalTime startTime = schedule.getStartTime();
        if ( startTime == null ) {
            return null;
        }
        return startTime;
    }

    private LocalTime entityScheduleEndTime(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        LocalTime endTime = schedule.getEndTime();
        if ( endTime == null ) {
            return null;
        }
        return endTime;
    }

    private String entityScheduleRoomName(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        RoomEntity room = schedule.getRoom();
        if ( room == null ) {
            return null;
        }
        String name = room.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String entityScheduleClassesCode(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        ClassEntity classes = schedule.getClasses();
        if ( classes == null ) {
            return null;
        }
        String code = classes.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private SemesterEnum entityScheduleSemesterSemester(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
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

    private Integer entityScheduleSemesterAcademyYear(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        SemesterEntity semester = schedule.getSemester();
        if ( semester == null ) {
            return null;
        }
        Integer academyYear = semester.getAcademyYear();
        if ( academyYear == null ) {
            return null;
        }
        return academyYear;
    }

    private SemesterEntity entityScheduleSemester(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = surveyResponseEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        SemesterEntity semester = schedule.getSemester();
        if ( semester == null ) {
            return null;
        }
        return semester;
    }
}
