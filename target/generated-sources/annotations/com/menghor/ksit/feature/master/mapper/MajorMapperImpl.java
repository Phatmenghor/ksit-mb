package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.MajorRequestDto;
import com.menghor.ksit.feature.master.dto.response.MajorResponseDto;
import com.menghor.ksit.feature.master.dto.update.MajorUpdateDto;
import com.menghor.ksit.feature.master.model.MajorEntity;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class MajorMapperImpl implements MajorMapper {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public MajorEntity toEntity(MajorRequestDto majorRequestDto) {
        if ( majorRequestDto == null ) {
            return null;
        }

        MajorEntity majorEntity = new MajorEntity();

        majorEntity.setCode( majorRequestDto.getCode() );
        majorEntity.setName( majorRequestDto.getName() );
        majorEntity.setStatus( majorRequestDto.getStatus() );

        return majorEntity;
    }

    @Override
    public MajorResponseDto toResponseDto(MajorEntity majorEntity) {
        if ( majorEntity == null ) {
            return null;
        }

        MajorResponseDto majorResponseDto = new MajorResponseDto();

        majorResponseDto.setId( majorEntity.getId() );
        majorResponseDto.setCode( majorEntity.getCode() );
        majorResponseDto.setName( majorEntity.getName() );
        majorResponseDto.setDepartment( departmentMapper.toResponseDto( majorEntity.getDepartment() ) );
        majorResponseDto.setStatus( majorEntity.getStatus() );
        majorResponseDto.setCreatedAt( majorEntity.getCreatedAt() );

        return majorResponseDto;
    }

    @Override
    public void updateEntityFromDto(MajorUpdateDto dto, MajorEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getCode() != null ) {
            entity.setCode( dto.getCode() );
        }
        if ( dto.getName() != null ) {
            entity.setName( dto.getName() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
    }
}
