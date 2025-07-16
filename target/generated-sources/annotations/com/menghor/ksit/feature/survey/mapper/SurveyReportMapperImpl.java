package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.enumations.DayOfWeek;
import com.menghor.ksit.enumations.SemesterEnum;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.DepartmentEntity;
import com.menghor.ksit.feature.master.model.MajorEntity;
import com.menghor.ksit.feature.master.model.RoomEntity;
import com.menghor.ksit.feature.master.model.SemesterEntity;
import com.menghor.ksit.feature.school.model.CourseEntity;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import com.menghor.ksit.feature.survey.dto.response.SurveyReportRowDto;
import com.menghor.ksit.feature.survey.model.SurveyResponseEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SurveyReportMapperImpl implements SurveyReportMapper {

    @Override
    public SurveyReportRowDto toReportRow(SurveyResponseEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SurveyReportRowDto surveyReportRowDto = new SurveyReportRowDto();

        surveyReportRowDto.setResponseId( entity.getId() );
        surveyReportRowDto.setStudentId( entityUserId( entity ) );
        surveyReportRowDto.setIdentifyNumber( entityUserIdentifyNumber( entity ) );
        surveyReportRowDto.setStudentNameEnglish( mapEnglishName( entity.getUser() ) );
        surveyReportRowDto.setStudentNameKhmer( mapKhmerName( entity.getUser() ) );
        surveyReportRowDto.setStudentEmail( entityUserEmail( entity ) );
        surveyReportRowDto.setStudentPhone( entityUserPhoneNumber( entity ) );
        surveyReportRowDto.setClassName( entityUserClassesCode( entity ) );
        surveyReportRowDto.setMajorName( entityUserClassesMajorName( entity ) );
        surveyReportRowDto.setDepartmentName( entityUserClassesMajorDepartmentName( entity ) );
        surveyReportRowDto.setScheduleId( entityScheduleId( entity ) );
        surveyReportRowDto.setCourseCode( entityScheduleCourseCode( entity ) );
        surveyReportRowDto.setCourseName( entityScheduleCourseNameEn( entity ) );
        surveyReportRowDto.setTeacherName( mapEnglishName( entityScheduleUser( entity ) ) );
        surveyReportRowDto.setRoomName( entityScheduleRoomName( entity ) );
        DayOfWeek day = entityScheduleDay( entity );
        if ( day != null ) {
            surveyReportRowDto.setDayOfWeek( day.name() );
        }
        surveyReportRowDto.setTimeSlot( mapTimeSlot( entity.getSchedule() ) );
        SemesterEnum semester = entityScheduleSemesterSemester( entity );
        if ( semester != null ) {
            surveyReportRowDto.setSemester( semester.name() );
        }
        surveyReportRowDto.setAcademyYear( entityScheduleSemesterAcademyYear( entity ) );
        surveyReportRowDto.setSurveyTitle( entity.getSurveyTitleSnapshot() );
        surveyReportRowDto.setSubmittedAt( entity.getSubmittedAt() );
        surveyReportRowDto.setOverallComment( entity.getOverallComment() );
        surveyReportRowDto.setCreatedAt( entity.getCreatedAt() );
        surveyReportRowDto.setDynamicAnswers( mapAnswersToMap( entity ) );

        return surveyReportRowDto;
    }

    @Override
    public List<SurveyReportRowDto> toReportRowList(List<SurveyResponseEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SurveyReportRowDto> list = new ArrayList<SurveyReportRowDto>( entities.size() );
        for ( SurveyResponseEntity surveyResponseEntity : entities ) {
            list.add( toReportRow( surveyResponseEntity ) );
        }

        return list;
    }

    private Long entityUserId(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityUserIdentifyNumber(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        String identifyNumber = user.getIdentifyNumber();
        if ( identifyNumber == null ) {
            return null;
        }
        return identifyNumber;
    }

    private String entityUserEmail(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        String email = user.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }

    private String entityUserPhoneNumber(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        String phoneNumber = user.getPhoneNumber();
        if ( phoneNumber == null ) {
            return null;
        }
        return phoneNumber;
    }

    private String entityUserClassesCode(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        ClassEntity classes = user.getClasses();
        if ( classes == null ) {
            return null;
        }
        String code = classes.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private String entityUserClassesMajorName(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        ClassEntity classes = user.getClasses();
        if ( classes == null ) {
            return null;
        }
        MajorEntity major = classes.getMajor();
        if ( major == null ) {
            return null;
        }
        String name = major.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String entityUserClassesMajorDepartmentName(SurveyResponseEntity surveyResponseEntity) {
        if ( surveyResponseEntity == null ) {
            return null;
        }
        UserEntity user = surveyResponseEntity.getUser();
        if ( user == null ) {
            return null;
        }
        ClassEntity classes = user.getClasses();
        if ( classes == null ) {
            return null;
        }
        MajorEntity major = classes.getMajor();
        if ( major == null ) {
            return null;
        }
        DepartmentEntity department = major.getDepartment();
        if ( department == null ) {
            return null;
        }
        String name = department.getName();
        if ( name == null ) {
            return null;
        }
        return name;
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
}
