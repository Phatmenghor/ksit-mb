package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.DepartmentRequestDto;
import com.menghor.ksit.feature.master.dto.response.DepartmentResponseDto;
import com.menghor.ksit.feature.master.dto.update.DepartmentUpdateDto;
import com.menghor.ksit.feature.master.model.DepartmentEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class DepartmentMapperImpl implements DepartmentMapper {

    @Override
    public DepartmentEntity toEntity(DepartmentRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        DepartmentEntity departmentEntity = new DepartmentEntity();

        departmentEntity.setCode( requestDto.getCode() );
        departmentEntity.setName( requestDto.getName() );
        departmentEntity.setUrlLogo( requestDto.getUrlLogo() );
        departmentEntity.setStatus( requestDto.getStatus() );

        return departmentEntity;
    }

    @Override
    public DepartmentResponseDto toResponseDto(DepartmentEntity entity) {
        if ( entity == null ) {
            return null;
        }

        DepartmentResponseDto departmentResponseDto = new DepartmentResponseDto();

        departmentResponseDto.setId( entity.getId() );
        departmentResponseDto.setName( entity.getName() );
        departmentResponseDto.setStatus( entity.getStatus() );
        departmentResponseDto.setUrlLogo( entity.getUrlLogo() );
        departmentResponseDto.setCode( entity.getCode() );
        departmentResponseDto.setCreatedAt( entity.getCreatedAt() );

        return departmentResponseDto;
    }

    @Override
    public void updateEntityFromDto(DepartmentUpdateDto dto, DepartmentEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCode() != null ) {
            entity.setCode( dto.getCode() );
        }
        if ( dto.getName() != null ) {
            entity.setName( dto.getName() );
        }
        if ( dto.getUrlLogo() != null ) {
            entity.setUrlLogo( dto.getUrlLogo() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
    }
}
