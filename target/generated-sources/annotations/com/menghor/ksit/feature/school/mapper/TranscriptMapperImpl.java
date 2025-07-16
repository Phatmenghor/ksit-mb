package com.menghor.ksit.feature.school.mapper;

import com.menghor.ksit.enumations.CourseStatusEnum;
import com.menghor.ksit.enumations.DegreeEnum;
import com.menghor.ksit.feature.attendance.models.StudentScoreEntity;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.RoomEntity;
import com.menghor.ksit.feature.school.dto.response.TranscriptCourseDto;
import com.menghor.ksit.feature.school.dto.response.TranscriptResponseDto;
import com.menghor.ksit.feature.school.model.CourseEntity;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class TranscriptMapperImpl implements TranscriptMapper {

    @Override
    public TranscriptResponseDto toTranscriptResponse(UserEntity student) {
        if ( student == null ) {
            return null;
        }

        TranscriptResponseDto transcriptResponseDto = new TranscriptResponseDto();

        transcriptResponseDto.setStudentId( student.getId() );
        transcriptResponseDto.setStudentName( mapStudentName( student ) );
        transcriptResponseDto.setStudentCode( student.getIdentifyNumber() );
        transcriptResponseDto.setClassName( studentClassesCode( student ) );
        transcriptResponseDto.setMajorName( mapMajorName( student ) );
        transcriptResponseDto.setDepartmentName( mapDepartmentName( student ) );
        transcriptResponseDto.setDateOfBirth( student.getDateOfBirth() );
        transcriptResponseDto.setDegree( studentClassesDegree( student ) );

        return transcriptResponseDto;
    }

    @Override
    public TranscriptCourseDto toCourseDto(ScheduleEntity schedule) {
        if ( schedule == null ) {
            return null;
        }

        TranscriptCourseDto transcriptCourseDto = new TranscriptCourseDto();

        transcriptCourseDto.setCourseId( scheduleCourseId( schedule ) );
        transcriptCourseDto.setCourseCode( scheduleCourseCode( schedule ) );
        transcriptCourseDto.setCourseName( scheduleCourseNameEn( schedule ) );
        transcriptCourseDto.setCourseNameKH( scheduleCourseNameKH( schedule ) );
        transcriptCourseDto.setCredit( scheduleCourseCredit( schedule ) );
        transcriptCourseDto.setTheory( scheduleCourseTheory( schedule ) );
        transcriptCourseDto.setExecute( scheduleCourseExecute( schedule ) );
        transcriptCourseDto.setApply( scheduleCourseApply( schedule ) );
        transcriptCourseDto.setTotalHour( scheduleCourseTotalHour( schedule ) );
        transcriptCourseDto.setScheduleId( schedule.getId() );
        if ( schedule.getDay() != null ) {
            transcriptCourseDto.setDayOfWeek( schedule.getDay().name() );
        }
        transcriptCourseDto.setTimeSlot( mapTimeSlot( schedule ) );
        transcriptCourseDto.setRoomName( scheduleRoomName( schedule ) );
        transcriptCourseDto.setTeacherName( mapTeacherName( schedule.getUser() ) );

        return transcriptCourseDto;
    }

    @Override
    public void mapScoreToTranscript(StudentScoreEntity score, TranscriptCourseDto courseDto) {
        if ( score == null ) {
            return;
        }

        courseDto.setTotalScore( score.getTotalScore() );
        courseDto.setLetterGrade( mapLetterGrade( score ) );
        courseDto.setAttendanceScore( score.getAttendanceScore() );
        courseDto.setAssignmentScore( score.getAssignmentScore() );
        courseDto.setMidtermScore( score.getMidtermScore() );
        courseDto.setFinalScore( score.getFinalScore() );

        courseDto.setStatus( CourseStatusEnum.COMPLETED );
    }

    private String studentClassesCode(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }
        ClassEntity classes = userEntity.getClasses();
        if ( classes == null ) {
            return null;
        }
        String code = classes.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private DegreeEnum studentClassesDegree(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }
        ClassEntity classes = userEntity.getClasses();
        if ( classes == null ) {
            return null;
        }
        DegreeEnum degree = classes.getDegree();
        if ( degree == null ) {
            return null;
        }
        return degree;
    }

    private Long scheduleCourseId(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Long id = course.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String scheduleCourseCode(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        String code = course.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private String scheduleCourseNameEn(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        String nameEn = course.getNameEn();
        if ( nameEn == null ) {
            return null;
        }
        return nameEn;
    }

    private String scheduleCourseNameKH(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        String nameKH = course.getNameKH();
        if ( nameKH == null ) {
            return null;
        }
        return nameKH;
    }

    private Integer scheduleCourseCredit(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer credit = course.getCredit();
        if ( credit == null ) {
            return null;
        }
        return credit;
    }

    private Integer scheduleCourseTheory(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer theory = course.getTheory();
        if ( theory == null ) {
            return null;
        }
        return theory;
    }

    private Integer scheduleCourseExecute(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer execute = course.getExecute();
        if ( execute == null ) {
            return null;
        }
        return execute;
    }

    private Integer scheduleCourseApply(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer apply = course.getApply();
        if ( apply == null ) {
            return null;
        }
        return apply;
    }

    private Integer scheduleCourseTotalHour(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        CourseEntity course = scheduleEntity.getCourse();
        if ( course == null ) {
            return null;
        }
        Integer totalHour = course.getTotalHour();
        if ( totalHour == null ) {
            return null;
        }
        return totalHour;
    }

    private String scheduleRoomName(ScheduleEntity scheduleEntity) {
        if ( scheduleEntity == null ) {
            return null;
        }
        RoomEntity room = scheduleEntity.getRoom();
        if ( room == null ) {
            return null;
        }
        String name = room.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
