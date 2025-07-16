package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.ClassRequestDto;
import com.menghor.ksit.feature.master.dto.response.ClassResponseDto;
import com.menghor.ksit.feature.master.dto.response.MajorResponseDto;
import com.menghor.ksit.feature.master.dto.update.ClassUpdateDto;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.master.model.MajorEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class ClassMapperImpl implements ClassMapper {

    @Override
    public ClassEntity toEntity(ClassRequestDto classRequestDto) {
        if ( classRequestDto == null ) {
            return null;
        }

        ClassEntity classEntity = new ClassEntity();

        classEntity.setCode( classRequestDto.getCode() );
        classEntity.setDegree( classRequestDto.getDegree() );
        classEntity.setYearLevel( classRequestDto.getYearLevel() );
        classEntity.setStatus( classRequestDto.getStatus() );
        classEntity.setAcademyYear( classRequestDto.getAcademyYear() );

        return classEntity;
    }

    @Override
    public ClassResponseDto toResponseDto(ClassEntity classEntity) {
        if ( classEntity == null ) {
            return null;
        }

        ClassResponseDto classResponseDto = new ClassResponseDto();

        classResponseDto.setMajor( majorEntityToMajorResponseDto( classEntity.getMajor() ) );
        classResponseDto.setId( classEntity.getId() );
        classResponseDto.setCode( classEntity.getCode() );
        classResponseDto.setAcademyYear( classEntity.getAcademyYear() );
        classResponseDto.setDegree( classEntity.getDegree() );
        classResponseDto.setYearLevel( classEntity.getYearLevel() );
        classResponseDto.setStatus( classEntity.getStatus() );
        classResponseDto.setCreatedAt( classEntity.getCreatedAt() );

        return classResponseDto;
    }

    @Override
    public void updateEntityFromDto(ClassUpdateDto dto, ClassEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCode() != null ) {
            entity.setCode( dto.getCode() );
        }
        if ( dto.getDegree() != null ) {
            entity.setDegree( dto.getDegree() );
        }
        if ( dto.getYearLevel() != null ) {
            entity.setYearLevel( dto.getYearLevel() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
        if ( dto.getAcademyYear() != null ) {
            entity.setAcademyYear( dto.getAcademyYear() );
        }
    }

    protected MajorResponseDto majorEntityToMajorResponseDto(MajorEntity majorEntity) {
        if ( majorEntity == null ) {
            return null;
        }

        MajorResponseDto majorResponseDto = new MajorResponseDto();

        majorResponseDto.setId( majorEntity.getId() );
        majorResponseDto.setCode( majorEntity.getCode() );
        majorResponseDto.setName( majorEntity.getName() );
        majorResponseDto.setStatus( majorEntity.getStatus() );
        majorResponseDto.setCreatedAt( majorEntity.getCreatedAt() );

        return majorResponseDto;
    }
}
