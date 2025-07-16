package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.SemesterRequestDto;
import com.menghor.ksit.feature.master.dto.response.SemesterResponseDto;
import com.menghor.ksit.feature.master.dto.update.SemesterUpdateDto;
import com.menghor.ksit.feature.master.model.SemesterEntity;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SemesterMapperImpl implements SemesterMapper {

    @Override
    public SemesterEntity toEntity(SemesterRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        SemesterEntity semesterEntity = new SemesterEntity();

        semesterEntity.setStartDate( requestDto.getStartDate() );
        semesterEntity.setEndDate( requestDto.getEndDate() );
        semesterEntity.setAcademyYear( requestDto.getAcademyYear() );
        semesterEntity.setStatus( requestDto.getStatus() );
        semesterEntity.setSemester( requestDto.getSemester() );

        return semesterEntity;
    }

    @Override
    public SemesterResponseDto toResponseDto(SemesterEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SemesterResponseDto semesterResponseDto = new SemesterResponseDto();

        semesterResponseDto.setId( entity.getId() );
        semesterResponseDto.setStartDate( entity.getStartDate() );
        semesterResponseDto.setEndDate( entity.getEndDate() );
        semesterResponseDto.setAcademyYear( entity.getAcademyYear() );
        semesterResponseDto.setStatus( entity.getStatus() );
        if ( entity.getSemester() != null ) {
            semesterResponseDto.setSemester( entity.getSemester().name() );
        }
        semesterResponseDto.setSemesterType( calculateSemesterType( entity ) );
        if ( entity.getCreatedAt() != null ) {
            semesterResponseDto.setCreatedAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( entity.getCreatedAt() ) );
        }

        return semesterResponseDto;
    }

    @Override
    public void updateEntityFromDto(SemesterUpdateDto dto, SemesterEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getStartDate() != null ) {
            entity.setStartDate( dto.getStartDate() );
        }
        if ( dto.getEndDate() != null ) {
            entity.setEndDate( dto.getEndDate() );
        }
        if ( dto.getAcademyYear() != null ) {
            entity.setAcademyYear( dto.getAcademyYear() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
        if ( dto.getSemester() != null ) {
            entity.setSemester( dto.getSemester() );
        }
    }
}
