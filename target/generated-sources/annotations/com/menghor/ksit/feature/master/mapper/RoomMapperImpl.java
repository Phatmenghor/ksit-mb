package com.menghor.ksit.feature.master.mapper;

import com.menghor.ksit.feature.master.dto.request.RoomRequestDto;
import com.menghor.ksit.feature.master.dto.response.RoomResponseDto;
import com.menghor.ksit.feature.master.dto.update.RoomUpdateDto;
import com.menghor.ksit.feature.master.model.RoomEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class RoomMapperImpl implements RoomMapper {

    @Override
    public RoomEntity toEntity(RoomRequestDto requestDto) {
        if ( requestDto == null ) {
            return null;
        }

        RoomEntity roomEntity = new RoomEntity();

        roomEntity.setName( requestDto.getName() );
        roomEntity.setStatus( requestDto.getStatus() );

        return roomEntity;
    }

    @Override
    public RoomResponseDto toResponseDto(RoomEntity roomEntity) {
        if ( roomEntity == null ) {
            return null;
        }

        RoomResponseDto roomResponseDto = new RoomResponseDto();

        roomResponseDto.setId( roomEntity.getId() );
        roomResponseDto.setName( roomEntity.getName() );
        roomResponseDto.setStatus( roomEntity.getStatus() );
        roomResponseDto.setCreatedAt( roomEntity.getCreatedAt() );

        return roomResponseDto;
    }

    @Override
    public void updateEntityFromDto(RoomUpdateDto dto, RoomEntity entity) {
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
