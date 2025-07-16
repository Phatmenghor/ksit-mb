package com.menghor.ksit.feature.attendance.mapper;

import com.menghor.ksit.enumations.GenderEnum;
import com.menghor.ksit.feature.attendance.dto.response.StudentScoreResponseDto;
import com.menghor.ksit.feature.attendance.models.StudentScoreEntity;
import com.menghor.ksit.feature.auth.models.UserEntity;
import java.time.LocalDate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class StudentScoreMapperImpl implements StudentScoreMapper {

    @Override
    public StudentScoreResponseDto toDto(StudentScoreEntity entity) {
        if ( entity == null ) {
            return null;
        }

        StudentScoreResponseDto studentScoreResponseDto = new StudentScoreResponseDto();

        studentScoreResponseDto.setStudentId( entityStudentId( entity ) );
        studentScoreResponseDto.setStudentNameKhmer( mapStudentKhmerName( entity.getStudent() ) );
        studentScoreResponseDto.setStudentNameEnglish( mapStudentEnglishName( entity.getStudent() ) );
        studentScoreResponseDto.setStudentIdentityNumber( entityStudentIdentifyNumber( entity ) );
        studentScoreResponseDto.setGender( entityStudentGender( entity ) );
        studentScoreResponseDto.setDateOfBirth( entityStudentDateOfBirth( entity ) );
        studentScoreResponseDto.setId( entity.getId() );
        studentScoreResponseDto.setAttendanceScore( entity.getAttendanceScore() );
        studentScoreResponseDto.setAssignmentScore( entity.getAssignmentScore() );
        studentScoreResponseDto.setMidtermScore( entity.getMidtermScore() );
        studentScoreResponseDto.setFinalScore( entity.getFinalScore() );
        studentScoreResponseDto.setTotalScore( entity.getTotalScore() );
        studentScoreResponseDto.setGrade( entity.getGrade() );
        studentScoreResponseDto.setComments( entity.getComments() );
        studentScoreResponseDto.setCreatedAt( entity.getCreatedAt() );

        return studentScoreResponseDto;
    }

    private Long entityStudentId(StudentScoreEntity studentScoreEntity) {
        if ( studentScoreEntity == null ) {
            return null;
        }
        UserEntity student = studentScoreEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        Long id = student.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityStudentIdentifyNumber(StudentScoreEntity studentScoreEntity) {
        if ( studentScoreEntity == null ) {
            return null;
        }
        UserEntity student = studentScoreEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        String identifyNumber = student.getIdentifyNumber();
        if ( identifyNumber == null ) {
            return null;
        }
        return identifyNumber;
    }

    private GenderEnum entityStudentGender(StudentScoreEntity studentScoreEntity) {
        if ( studentScoreEntity == null ) {
            return null;
        }
        UserEntity student = studentScoreEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        GenderEnum gender = student.getGender();
        if ( gender == null ) {
            return null;
        }
        return gender;
    }

    private LocalDate entityStudentDateOfBirth(StudentScoreEntity studentScoreEntity) {
        if ( studentScoreEntity == null ) {
            return null;
        }
        UserEntity student = studentScoreEntity.getStudent();
        if ( student == null ) {
            return null;
        }
        LocalDate dateOfBirth = student.getDateOfBirth();
        if ( dateOfBirth == null ) {
            return null;
        }
        return dateOfBirth;
    }
}
