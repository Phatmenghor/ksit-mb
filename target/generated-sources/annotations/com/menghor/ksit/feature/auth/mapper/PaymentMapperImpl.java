package com.menghor.ksit.feature.auth.mapper;

import com.menghor.ksit.feature.auth.dto.request.PaymentCreateDTO;
import com.menghor.ksit.feature.auth.dto.resposne.PaymentResponseDTO;
import com.menghor.ksit.feature.auth.dto.update.PaymentUpdateDto;
import com.menghor.ksit.feature.auth.models.PaymentEntity;
import com.menghor.ksit.feature.auth.models.UserEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:41+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public PaymentEntity toEntity(PaymentCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PaymentEntity paymentEntity = new PaymentEntity();

        paymentEntity.setUser( mapUserIdToUser( dto.getUserId() ) );
        paymentEntity.setItem( dto.getItem() );
        paymentEntity.setType( dto.getType() );
        paymentEntity.setAmount( dto.getAmount() );
        paymentEntity.setPercentage( dto.getPercentage() );
        paymentEntity.setDate( dto.getDate() );
        paymentEntity.setStatus( dto.getStatus() );
        paymentEntity.setCommend( dto.getCommend() );

        return paymentEntity;
    }

    @Override
    public void updateEntityFromDto(PaymentUpdateDto dto, PaymentEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getUserId() != null ) {
            entity.setUser( mapUserIdToUser( dto.getUserId() ) );
        }
        if ( dto.getItem() != null ) {
            entity.setItem( dto.getItem() );
        }
        if ( dto.getType() != null ) {
            entity.setType( dto.getType() );
        }
        if ( dto.getAmount() != null ) {
            entity.setAmount( dto.getAmount() );
        }
        if ( dto.getPercentage() != null ) {
            entity.setPercentage( dto.getPercentage() );
        }
        if ( dto.getDate() != null ) {
            entity.setDate( dto.getDate() );
        }
        if ( dto.getStatus() != null ) {
            entity.setStatus( dto.getStatus() );
        }
        if ( dto.getCommend() != null ) {
            entity.setCommend( dto.getCommend() );
        }
    }

    @Override
    public PaymentResponseDTO toResponseDto(PaymentEntity entity) {
        if ( entity == null ) {
            return null;
        }

        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();

        paymentResponseDTO.setUserId( entityUserId( entity ) );
        paymentResponseDTO.setId( entity.getId() );
        paymentResponseDTO.setItem( entity.getItem() );
        paymentResponseDTO.setType( entity.getType() );
        paymentResponseDTO.setAmount( entity.getAmount() );
        paymentResponseDTO.setPercentage( entity.getPercentage() );
        paymentResponseDTO.setDate( entity.getDate() );
        paymentResponseDTO.setStatus( entity.getStatus() );
        paymentResponseDTO.setCommend( entity.getCommend() );
        paymentResponseDTO.setCreatedAt( entity.getCreatedAt() );

        return paymentResponseDTO;
    }

    @Override
    public List<PaymentResponseDTO> toResponseDtoList(List<PaymentEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<PaymentResponseDTO> list = new ArrayList<PaymentResponseDTO>( entities.size() );
        for ( PaymentEntity paymentEntity : entities ) {
            list.add( toResponseDto( paymentEntity ) );
        }

        return list;
    }

    private Long entityUserId(PaymentEntity paymentEntity) {
        if ( paymentEntity == null ) {
            return null;
        }
        UserEntity user = paymentEntity.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
