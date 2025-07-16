package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.SubjectRequestDto;
import com.menghor.ksit.feature.master.dto.response.SubjectResponseDto;
import com.menghor.ksit.feature.master.model.SubjectEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SubjectMapperImpl implements SubjectMapper {

    @Override
    public SubjectEntity toEntity(SubjectRequestDto subjectRequestDto) {
        if ( subjectRequestDto == null ) {
            return null;
        }

        SubjectEntity subjectEntity = new SubjectEntity();

        subjectEntity.setName( subjectRequestDto.getName() );
        subjectEntity.setStatus( subjectRequestDto.getStatus() );

        return subjectEntity;
    }

    @Override
    public SubjectResponseDto toResponseDto(SubjectEntity subjectEntity) {
        if ( subjectEntity == null ) {
            return null;
        }

        SubjectResponseDto subjectResponseDto = new SubjectResponseDto();

        subjectResponseDto.setId( subjectEntity.getId() );
        subjectResponseDto.setName( subjectEntity.getName() );
        subjectResponseDto.setStatus( subjectEntity.getStatus() );
        subjectResponseDto.setCreatedAt( subjectEntity.getCreatedAt() );

        return subjectResponseDto;
    }

    @Override
    public void updateEntityFromDto(SubjectRequestDto dto, SubjectEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getName() != null ) {
            entity.setName( dto.getName() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
    }
}
