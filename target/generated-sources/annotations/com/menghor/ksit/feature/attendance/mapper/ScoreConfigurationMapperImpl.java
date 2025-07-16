package com.menghor.ksit.feature.attendance.mapper;

import com.menghor.ksit.feature.attendance.dto.request.ScoreConfigurationRequestDto;
import com.menghor.ksit.feature.attendance.dto.response.ScoreConfigurationResponseDto;
import com.menghor.ksit.feature.attendance.models.ScoreConfigurationEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class ScoreConfigurationMapperImpl implements ScoreConfigurationMapper {

    @Override
    public ScoreConfigurationEntity toEntity(ScoreConfigurationRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        ScoreConfigurationEntity scoreConfigurationEntity = createDefaultConfiguration();

        scoreConfigurationEntity.setAttendancePercentage( requestDto.getAttendancePercentage() );
        scoreConfigurationEntity.setAssignmentPercentage( requestDto.getAssignmentPercentage() );
        scoreConfigurationEntity.setMidtermPercentage( requestDto.getMidtermPercentage() );
        scoreConfigurationEntity.setFinalPercentage( requestDto.getFinalPercentage() );
        scoreConfigurationEntity.setTotalPercentage( requestDto.getTotalPercentage() );

        scoreConfigurationEntity.setStatus( com.menghor.ksit.enumations.Status.ACTIVE );

        return scoreConfigurationEntity;
    }

    @Override
    public ScoreConfigurationResponseDto toResponseDto(ScoreConfigurationEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ScoreConfigurationResponseDto scoreConfigurationResponseDto = new ScoreConfigurationResponseDto();

        scoreConfigurationResponseDto.setCreatedAt( formatDateTime( entity.getCreatedAt() ) );
        scoreConfigurationResponseDto.setId( entity.getId() );
        scoreConfigurationResponseDto.setAttendancePercentage( entity.getAttendancePercentage() );
        scoreConfigurationResponseDto.setAssignmentPercentage( entity.getAssignmentPercentage() );
        scoreConfigurationResponseDto.setMidtermPercentage( entity.getMidtermPercentage() );
        scoreConfigurationResponseDto.setFinalPercentage( entity.getFinalPercentage() );
        scoreConfigurationResponseDto.setStatus( entity.getStatus() );

        scoreConfigurationResponseDto.setTotalPercentage( entity.getTotalPercentage() );

        return scoreConfigurationResponseDto;
    }

    @Override
    public void updateEntityFromDto(ScoreConfigurationRequestDto requestDto, ScoreConfigurationEntity entity) {
        if ( requestDto == null ) {
            return;
        }

        if ( requestDto.getAttendancePercentage() != null ) {
            entity.setAttendancePercentage( requestDto.getAttendancePercentage() );
        }
        if ( requestDto.getAssignmentPercentage() != null ) {
            entity.setAssignmentPercentage( requestDto.getAssignmentPercentage() );
        }
        if ( requestDto.getMidtermPercentage() != null ) {
            entity.setMidtermPercentage( requestDto.getMidtermPercentage() );
        }
        if ( requestDto.getFinalPercentage() != null ) {
            entity.setFinalPercentage( requestDto.getFinalPercentage() );
        }
        if ( requestDto.getTotalPercentage() != null ) {
            entity.setTotalPercentage( requestDto.getTotalPercentage() );
        }
    }

    @Override
    public ScoreConfigurationEntity copyEntity(ScoreConfigurationEntity source) {
        if ( source == null ) {
            return null;
        }

        ScoreConfigurationEntity scoreConfigurationEntity = createDefaultConfiguration();

        scoreConfigurationEntity.setAttendancePercentage( source.getAttendancePercentage() );
        scoreConfigurationEntity.setAssignmentPercentage( source.getAssignmentPercentage() );
        scoreConfigurationEntity.setMidtermPercentage( source.getMidtermPercentage() );
        scoreConfigurationEntity.setFinalPercentage( source.getFinalPercentage() );
        scoreConfigurationEntity.setTotalPercentage( source.getTotalPercentage() );
        scoreConfigurationEntity.setStatus( source.getStatus() );

        return scoreConfigurationEntity;
    }
}
