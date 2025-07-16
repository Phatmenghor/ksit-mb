package com.menghor.ksit.feature.school.mapper;

import com.menghor.ksit.feature.auth.mapper.StaffMapper;
import com.menghor.ksit.feature.master.mapper.DepartmentMapper;
import com.menghor.ksit.feature.master.mapper.SubjectMapper;
import com.menghor.ksit.feature.school.dto.request.CourseRequestDto;
import com.menghor.ksit.feature.school.dto.response.CourseResponseDto;
import com.menghor.ksit.feature.school.dto.response.CourseResponseMapWithScheduleDto;
import com.menghor.ksit.feature.school.dto.update.CourseUpdateDto;
import com.menghor.ksit.feature.school.model.CourseEntity;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Autowired
    private DepartmentMapper departmentMapper;
    @Autowired
    private SubjectMapper subjectMapper;
    @Autowired
    private StaffMapper staffMapper;

    @Override
    public CourseEntity toEntity(CourseRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        CourseEntity courseEntity = new CourseEntity();

        courseEntity.setCode( requestDto.getCode() );
        courseEntity.setNameKH( requestDto.getNameKH() );
        courseEntity.setNameEn( requestDto.getNameEn() );
        courseEntity.setCredit( requestDto.getCredit() );
        courseEntity.setTheory( requestDto.getTheory() );
        courseEntity.setExecute( requestDto.getExecute() );
        courseEntity.setApply( requestDto.getApply() );
        courseEntity.setTotalHour( requestDto.getTotalHour() );
        courseEntity.setDescription( requestDto.getDescription() );
        courseEntity.setPurpose( requestDto.getPurpose() );
        courseEntity.setExpectedOutcome( requestDto.getExpectedOutcome() );
        courseEntity.setStatus( requestDto.getStatus() );

        return courseEntity;
    }

    @Override
    public CourseResponseDto toResponseDto(CourseEntity courseEntity) {
        if ( courseEntity == null ) {
            return null;
        }

        CourseResponseDto courseResponseDto = new CourseResponseDto();

        courseResponseDto.setDepartment( departmentMapper.toResponseDto( courseEntity.getDepartment() ) );
        courseResponseDto.setSubject( subjectMapper.toResponseDto( courseEntity.getSubject() ) );
        courseResponseDto.setUser( staffMapper.toStaffUserMapDto( courseEntity.getUser() ) );
        courseResponseDto.setId( courseEntity.getId() );
        courseResponseDto.setCode( courseEntity.getCode() );
        courseResponseDto.setNameKH( courseEntity.getNameKH() );
        courseResponseDto.setNameEn( courseEntity.getNameEn() );
        courseResponseDto.setCredit( courseEntity.getCredit() );
        courseResponseDto.setTheory( courseEntity.getTheory() );
        courseResponseDto.setExecute( courseEntity.getExecute() );
        courseResponseDto.setApply( courseEntity.getApply() );
        courseResponseDto.setTotalHour( courseEntity.getTotalHour() );
        courseResponseDto.setDescription( courseEntity.getDescription() );
        courseResponseDto.setPurpose( courseEntity.getPurpose() );
        courseResponseDto.setExpectedOutcome( courseEntity.getExpectedOutcome() );
        courseResponseDto.setStatus( courseEntity.getStatus() );
        courseResponseDto.setCreatedAt( courseEntity.getCreatedAt() );

        return courseResponseDto;
    }

    @Override
    public CourseResponseMapWithScheduleDto toResponseWithScheduleDto(CourseEntity courseEntity) {
        if ( courseEntity == null ) {
            return null;
        }

        CourseResponseMapWithScheduleDto courseResponseMapWithScheduleDto = new CourseResponseMapWithScheduleDto();

        courseResponseMapWithScheduleDto.setDepartment( departmentMapper.toResponseDto( courseEntity.getDepartment() ) );
        courseResponseMapWithScheduleDto.setSubject( subjectMapper.toResponseDto( courseEntity.getSubject() ) );
        courseResponseMapWithScheduleDto.setId( courseEntity.getId() );
        courseResponseMapWithScheduleDto.setCode( courseEntity.getCode() );
        courseResponseMapWithScheduleDto.setNameKH( courseEntity.getNameKH() );
        courseResponseMapWithScheduleDto.setNameEn( courseEntity.getNameEn() );
        courseResponseMapWithScheduleDto.setCredit( courseEntity.getCredit() );
        courseResponseMapWithScheduleDto.setTheory( courseEntity.getTheory() );
        courseResponseMapWithScheduleDto.setExecute( courseEntity.getExecute() );
        courseResponseMapWithScheduleDto.setApply( courseEntity.getApply() );
        courseResponseMapWithScheduleDto.setTotalHour( courseEntity.getTotalHour() );
        courseResponseMapWithScheduleDto.setDescription( courseEntity.getDescription() );
        courseResponseMapWithScheduleDto.setPurpose( courseEntity.getPurpose() );
        courseResponseMapWithScheduleDto.setExpectedOutcome( courseEntity.getExpectedOutcome() );
        courseResponseMapWithScheduleDto.setStatus( courseEntity.getStatus() );
        courseResponseMapWithScheduleDto.setCreatedAt( courseEntity.getCreatedAt() );

        return courseResponseMapWithScheduleDto;
    }

    @Override
    public void updateEntityFromDto(CourseUpdateDto dto, CourseEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCode() != null ) {
            entity.setCode( dto.getCode() );
        }
        if ( dto.getNameKH() != null ) {
            entity.setNameKH( dto.getNameKH() );
        }
        if ( dto.getNameEn() != null ) {
            entity.setNameEn( dto.getNameEn() );
        }
        if ( dto.getCredit() != null ) {
            entity.setCredit( dto.getCredit() );
        }
        if ( dto.getTheory() != null ) {
            entity.setTheory( dto.getTheory() );
        }
        if ( dto.getExecute() != null ) {
            entity.setExecute( dto.getExecute() );
        }
        if ( dto.getApply() != null ) {
            entity.setApply( dto.getApply() );
        }
        if ( dto.getTotalHour() != null ) {
            entity.setTotalHour( dto.getTotalHour() );
        }
        if ( dto.getDescription() != null ) {
            entity.setDescription( dto.getDescription() );
        }
        if ( dto.getPurpose() != null ) {
            entity.setPurpose( dto.getPurpose() );
        }
        if ( dto.getExpectedOutcome() != null ) {
            entity.setExpectedOutcome( dto.getExpectedOutcome() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
    }
}
