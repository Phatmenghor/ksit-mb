package com.menghor.ksit.feature.school.mapper;

import com.menghor.ksit.enumations.Status;
import com.menghor.ksit.feature.auth.mapper.StaffMapper;
import com.menghor.ksit.feature.master.mapper.ClassMapper;
import com.menghor.ksit.feature.master.mapper.RoomMapper;
import com.menghor.ksit.feature.master.mapper.SemesterMapper;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.SemesterEntity;
import com.menghor.ksit.feature.school.dto.request.ScheduleRequestDto;
import com.menghor.ksit.feature.school.dto.response.ScheduleBulkDuplicateResponseDto;
import com.menghor.ksit.feature.school.dto.response.ScheduleResponseDto;
import com.menghor.ksit.feature.school.dto.update.ScheduleUpdateDto;
import com.menghor.ksit.feature.school.model.ScheduleEntity;
import com.menghor.ksit.feature.survey.model.SurveyEntity;
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
public class ScheduleMapperImpl implements ScheduleMapper {

    @Autowired
    private ClassMapper classMapper;
    @Autowired
    private StaffMapper staffMapper;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private RoomMapper roomMapper;
    @Autowired
    private SemesterMapper semesterMapper;

    @Override
    public ScheduleEntity toEntity(ScheduleRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        ScheduleEntity scheduleEntity = new ScheduleEntity();

        scheduleEntity.setStartTime( requestDto.getStartTime() );
        scheduleEntity.setEndTime( requestDto.getEndTime() );
        scheduleEntity.setStatus( requestDto.getStatus() );
        scheduleEntity.setDay( requestDto.getDay() );
        scheduleEntity.setYearLevel( requestDto.getYearLevel() );

        return scheduleEntity;
    }

    @Override
    public ScheduleResponseDto toResponseDto(ScheduleEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto();

        scheduleResponseDto.setClasses( classMapper.toResponseDto( entity.getClasses() ) );
        scheduleResponseDto.setTeacher( staffMapper.toStaffUserMapDto( entity.getUser() ) );
        scheduleResponseDto.setCourse( courseMapper.toResponseWithScheduleDto( entity.getCourse() ) );
        scheduleResponseDto.setRoom( roomMapper.toResponseDto( entity.getRoom() ) );
        scheduleResponseDto.setYearLevel( entity.getYearLevel() );
        scheduleResponseDto.setSemester( semesterMapper.toResponseDto( entity.getSemester() ) );
        scheduleResponseDto.setId( entity.getId() );
        scheduleResponseDto.setStartTime( entity.getStartTime() );
        scheduleResponseDto.setEndTime( entity.getEndTime() );
        scheduleResponseDto.setDay( entity.getDay() );
        scheduleResponseDto.setStatus( entity.getStatus() );
        scheduleResponseDto.setCreatedAt( entity.getCreatedAt() );

        return scheduleResponseDto;
    }

    @Override
    public void updateEntityFromDto(ScheduleUpdateDto dto, ScheduleEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getStartTime() != null ) {
            entity.setStartTime( dto.getStartTime() );
        }
        if ( dto.getEndTime() != null ) {
            entity.setEndTime( dto.getEndTime() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
        if ( dto.getDay() != null ) {
            entity.setDay( dto.getDay() );
        }
        if ( dto.getYearLevel() != null ) {
            entity.setYearLevel( dto.getYearLevel() );
        }
    }

    @Override
    public ScheduleEntity duplicateSchedule(ScheduleEntity sourceSchedule) {
        if ( sourceSchedule == null ) {
            return null;
        }

        ScheduleEntity scheduleEntity = new ScheduleEntity();

        scheduleEntity.setUser( sourceSchedule.getUser() );
        scheduleEntity.setCourse( sourceSchedule.getCourse() );
        scheduleEntity.setRoom( sourceSchedule.getRoom() );
        scheduleEntity.setStartTime( sourceSchedule.getStartTime() );
        scheduleEntity.setEndTime( sourceSchedule.getEndTime() );
        scheduleEntity.setDay( sourceSchedule.getDay() );
        scheduleEntity.setYearLevel( sourceSchedule.getYearLevel() );
        List<SurveyEntity> list = sourceSchedule.getSurveys();
        if ( list != null ) {
            scheduleEntity.setSurveys( new ArrayList<SurveyEntity>( list ) );
        }

        scheduleEntity.setStatus( Status.ACTIVE );

        return scheduleEntity;
    }

    @Override
    public ScheduleBulkDuplicateResponseDto toBulkDuplicateResponse(Long sourceClassId, ClassEntity sourceClass, Long sourceSemesterId, SemesterEntity sourceSemester, Long targetClassId, ClassEntity targetClass, Long targetSemesterId, SemesterEntity targetSemester) {
        if ( sourceClassId == null && sourceClass == null && sourceSemesterId == null && sourceSemester == null && targetClassId == null && targetClass == null && targetSemesterId == null && targetSemester == null ) {
            return null;
        }

        ScheduleBulkDuplicateResponseDto scheduleBulkDuplicateResponseDto = new ScheduleBulkDuplicateResponseDto();

        if ( sourceClass != null ) {
            scheduleBulkDuplicateResponseDto.setSourceClassName( sourceClass.getCode() );
        }
        if ( sourceSemester != null ) {
            if ( sourceSemester.getSemester() != null ) {
                scheduleBulkDuplicateResponseDto.setSourceSemesterName( sourceSemester.getSemester().name() );
            }
            scheduleBulkDuplicateResponseDto.setSourceSemesterYear( sourceSemester.getAcademyYear() );
        }
        if ( targetClass != null ) {
            scheduleBulkDuplicateResponseDto.setTargetClassName( targetClass.getCode() );
        }
        if ( targetSemester != null ) {
            if ( targetSemester.getSemester() != null ) {
                scheduleBulkDuplicateResponseDto.setTargetSemesterName( targetSemester.getSemester().name() );
            }
            scheduleBulkDuplicateResponseDto.setTargetSemesterYear( targetSemester.getAcademyYear() );
        }
        scheduleBulkDuplicateResponseDto.setSourceClassId( sourceClassId );
        scheduleBulkDuplicateResponseDto.setSourceSemesterId( sourceSemesterId );
        scheduleBulkDuplicateResponseDto.setTargetClassId( targetClassId );
        scheduleBulkDuplicateResponseDto.setTargetSemesterId( targetSemesterId );

        return scheduleBulkDuplicateResponseDto;
    }
}
