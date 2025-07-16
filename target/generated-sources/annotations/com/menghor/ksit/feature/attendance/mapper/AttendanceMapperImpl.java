package com.menghor.ksit.feature.attendance.mapper;

import com.menghor.ksit.enumations.GenderEnum;
import com.menghor.ksit.feature.attendance.dto.response.AttendanceDto;
import com.menghor.ksit.feature.attendance.dto.response.AttendanceSessionDto;
import com.menghor.ksit.feature.attendance.models.AttendanceEntity;
import com.menghor.ksit.feature.attendance.models.AttendanceSessionEntity;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.RoomEntity;
import com.menghor.ksit.feature.school.model.CourseEntity;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class AttendanceMapperImpl implements AttendanceMapper {

    @Override
    public AttendanceDto toDto(AttendanceEntity entity) {
        if ( entity == null ) {
            return null;
        }

        AttendanceDto.AttendanceDtoBuilder attendanceDto = AttendanceDto.builder();

        attendanceDto.studentId( entityStudentId( entity ) );
        attendanceDto.studentName( mapStudentName( entity.getStudent() ) );
        attendanceDto.identifyNumber( entityStudentIdentifyNumber( entity ) );
        attendanceDto.gender( entityStudentGender( entity ) );
        attendanceDto.dateOfBirth( entityStudentDateOfBirth( entity ) );
        attendanceDto.attendanceSessionId( entityAttendanceSessionId( entity ) );
        attendanceDto.teacherId( entityAttendanceSessionTeacherId( entity ) );
        attendanceDto.teacherName( mapTeacherName( entityAttendanceSessionTeacher( entity ) ) );
        attendanceDto.scheduleId( entityAttendanceSessionScheduleId( entity ) );
        attendanceDto.courseName( mapCourseName( entityAttendanceSessionScheduleCourse( entity ) ) );
        attendanceDto.id( entity.getId() );
        attendanceDto.status( entity.getStatus() );
        attendanceDto.attendanceType( entity.getAttendanceType() );
        attendanceDto.comment( entity.getComment() );
        attendanceDto.recordedTime( entity.getRecordedTime() );
        attendanceDto.finalizationStatus( entity.getFinalizationStatus() );
        if ( entity.getCreatedAt() != null ) {
            attendanceDto.createdAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( entity.getCreatedAt() ) );
        }

        return attendanceDto.build();
    }

    @Override
    public AttendanceSessionDto toDto(AttendanceSessionEntity entity) {
        if ( entity == null ) {
            return null;
        }

        AttendanceSessionDto.AttendanceSessionDtoBuilder attendanceSessionDto = AttendanceSessionDto.builder();

        attendanceSessionDto.scheduleId( entityScheduleId( entity ) );
        attendanceSessionDto.roomName( entityScheduleRoomName( entity ) );
        attendanceSessionDto.classCode( entityScheduleClassesCode( entity ) );
        attendanceSessionDto.teacherId( entityTeacherId( entity ) );
        attendanceSessionDto.teacherName( mapTeacherName( entity.getTeacher() ) );
        attendanceSessionDto.finalizationStatus( entity.getFinalizationStatus() );
        attendanceSessionDto.attendances( sortAttendances( entity.getAttendances() ) );
        attendanceSessionDto.id( entity.getId() );
        attendanceSessionDto.sessionDate( entity.getSessionDate() );
        attendanceSessionDto.status( entity.getStatus() );
        if ( entity.getCreatedAt() != null ) {
            attendanceSessionDto.createdAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( entity.getCreatedAt() ) );
        }

        attendanceSessionDto.totalStudents( calculateTotalStudents(entity) );
        attendanceSessionDto.totalPresent( calculateTotalPresent(entity) );
        attendanceSessionDto.totalAbsent( calculateTotalAbsent(entity) );

        return attendanceSessionDto.build();
    }

    private Long entityStudentId(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        UserEntity student = attendanceEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        Long id = student.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityStudentIdentifyNumber(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        UserEntity student = attendanceEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        String identifyNumber = student.getIdentifyNumber();
        if ( identifyNumber == null ) {
            return null;
        }
        return identifyNumber;
    }

    private GenderEnum entityStudentGender(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        UserEntity student = attendanceEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        GenderEnum gender = student.getGender();
        if ( gender == null ) {
            return null;
        }
        return gender;
    }

    private LocalDate entityStudentDateOfBirth(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        UserEntity student = attendanceEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        LocalDate dateOfBirth = student.getDateOfBirth();
        if ( dateOfBirth == null ) {
            return null;
        }
        return dateOfBirth;
    }

    private Long entityAttendanceSessionId(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        AttendanceSessionEntity attendanceSession = attendanceEntity.getAttendanceSession();
        if ( attendanceSession == null ) {
            return null;
        }
        Long id = attendanceSession.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityAttendanceSessionTeacherId(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        AttendanceSessionEntity attendanceSession = attendanceEntity.getAttendanceSession();
        if ( attendanceSession == null ) {
            return null;
        }
        UserEntity teacher = attendanceSession.getTeacher();
        if ( teacher == null ) {
            return null;
        }
        Long id = teacher.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private UserEntity entityAttendanceSessionTeacher(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        AttendanceSessionEntity attendanceSession = attendanceEntity.getAttendanceSession();
        if ( attendanceSession == null ) {
            return null;
        }
        UserEntity teacher = attendanceSession.getTeacher();
        if ( teacher == null ) {
            return null;
        }
        return teacher;
    }

    private Long entityAttendanceSessionScheduleId(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        AttendanceSessionEntity attendanceSession = attendanceEntity.getAttendanceSession();
        if ( attendanceSession == null ) {
            return null;
        }
        ScheduleEntity schedule = attendanceSession.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        Long id = schedule.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private CourseEntity entityAttendanceSessionScheduleCourse(AttendanceEntity attendanceEntity) {
        if ( attendanceEntity == null ) {
            return null;
        }
        AttendanceSessionEntity attendanceSession = attendanceEntity.getAttendanceSession();
        if ( attendanceSession == null ) {
            return null;
        }
        ScheduleEntity schedule = attendanceSession.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        CourseEntity course = schedule.getCourse();
        if ( course == null ) {
            return null;
        }
        return course;
    }

    private Long entityScheduleId(AttendanceSessionEntity attendanceSessionEntity) {
        if ( attendanceSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = attendanceSessionEntity.getSchedule();
        if ( schedule == null ) {
            return null;
        }
        Long id = schedule.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityScheduleRoomName(AttendanceSessionEntity attendanceSessionEntity) {
        if ( attendanceSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = attendanceSessionEntity.getSchedule();
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

    private String entityScheduleClassesCode(AttendanceSessionEntity attendanceSessionEntity) {
        if ( attendanceSessionEntity == null ) {
            return null;
        }
        ScheduleEntity schedule = attendanceSessionEntity.getSchedule();
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

    private Long entityTeacherId(AttendanceSessionEntity attendanceSessionEntity) {
        if ( attendanceSessionEntity == null ) {
            return null;
        }
        UserEntity teacher = attendanceSessionEntity.getTeacher();
        if ( teacher == null ) {
            return null;
        }
        Long id = teacher.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
