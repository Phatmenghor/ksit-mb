package com.menghor.ksit.feature.school.mapper;

import com.menghor.ksit.enumations.DegreeEnum;
import com.menghor.ksit.enumations.RequestStatus;
import com.menghor.ksit.feature.auth.dto.resposne.UserBasicInfoDto;
import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.master.model.ClassEntity;
import com.menghor.ksit.feature.school.dto.request.RequestCreateDto;
import com.menghor.ksit.feature.school.dto.response.RequestHistoryDto;
import com.menghor.ksit.feature.school.dto.response.RequestResponseDto;
import com.menghor.ksit.feature.school.dto.update.RequestUpdateDto;
import com.menghor.ksit.feature.school.model.RequestEntity;
import com.menghor.ksit.feature.school.model.RequestHistoryEntity;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class RequestMapperImpl implements RequestMapper {

    @Override
    public RequestResponseDto toResponseDto(RequestEntity entity) {
        if ( entity == null ) {
            return null;
        }

        RequestResponseDto requestResponseDto = new RequestResponseDto();

        requestResponseDto.setId( entity.getId() );
        requestResponseDto.setTitle( entity.getTitle() );
        requestResponseDto.setStatus( entity.getStatus() );
        requestResponseDto.setRequestComment( entity.getRequestComment() );
        requestResponseDto.setStaffComment( entity.getStaffComment() );
        requestResponseDto.setUser( toUserBasicInfo( entity.getUser() ) );
        requestResponseDto.setCreatedAt( entity.getCreatedAt() );
        requestResponseDto.setUpdatedAt( entity.getUpdatedAt() );

        return requestResponseDto;
    }

    @Override
    public RequestEntity toEntity(RequestCreateDto createDto) {
        if ( createDto == null ) {
            return null;
        }

        RequestEntity requestEntity = new RequestEntity();

        requestEntity.setTitle( createDto.getTitle() );
        requestEntity.setRequestComment( createDto.getRequestComment() );

        requestEntity.setStatus( RequestStatus.PENDING );

        return requestEntity;
    }

    @Override
    public void updateEntityFromDto(RequestUpdateDto updateDto, RequestEntity entity) {
        if ( updateDto == null ) {
            return;
        }

        if ( updateDto.getTitle() != null ) {
            entity.setTitle( updateDto.getTitle() );
        }
        if ( updateDto.getStatus() != null ) {
            entity.setStatus( updateDto.getStatus() );
        }
        if ( updateDto.getRequestComment() != null ) {
            entity.setRequestComment( updateDto.getRequestComment() );
        }
        if ( updateDto.getStaffComment() != null ) {
            entity.setStaffComment( updateDto.getStaffComment() );
        }
    }

    @Override
    public UserBasicInfoDto toUserBasicInfo(UserEntity user) {
        if ( user == null ) {
            return null;
        }

        UserBasicInfoDto userBasicInfoDto = new UserBasicInfoDto();

        userBasicInfoDto.setUserClass( mapUserClass( user.getClasses() ) );
        userBasicInfoDto.setDepartmentName( extractDepartmentName( user ) );
        userBasicInfoDto.setDegree( mapDegreeToString( userClassesDegree( user ) ) );
        userBasicInfoDto.setMajorName( extractMajor( user ) );
        userBasicInfoDto.setRoles( extractUserRoles( user ) );
        userBasicInfoDto.setIsStudent( checkIfUserIsStudent( user ) );
        userBasicInfoDto.setId( user.getId() );
        userBasicInfoDto.setUsername( user.getUsername() );
        userBasicInfoDto.setKhmerFirstName( user.getKhmerFirstName() );
        userBasicInfoDto.setKhmerLastName( user.getKhmerLastName() );
        userBasicInfoDto.setEnglishFirstName( user.getEnglishFirstName() );
        userBasicInfoDto.setEnglishLastName( user.getEnglishLastName() );
        userBasicInfoDto.setEmail( user.getEmail() );
        userBasicInfoDto.setPhoneNumber( user.getPhoneNumber() );
        userBasicInfoDto.setIdentifyNumber( user.getIdentifyNumber() );
        userBasicInfoDto.setDateOfBirth( user.getDateOfBirth() );
        userBasicInfoDto.setGender( user.getGender() );
        userBasicInfoDto.setCurrentAddress( user.getCurrentAddress() );
        userBasicInfoDto.setProfileUrl( user.getProfileUrl() );
        if ( user.getCreatedAt() != null ) {
            userBasicInfoDto.setCreatedAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( user.getCreatedAt() ) );
        }

        return userBasicInfoDto;
    }

    @Override
    public RequestHistoryDto mapToBasicHistoryDto(RequestHistoryEntity entity) {
        if ( entity == null ) {
            return null;
        }

        RequestHistoryDto requestHistoryDto = new RequestHistoryDto();

        requestHistoryDto.setRequestId( entityRequestId( entity ) );
        requestHistoryDto.setRequestCreatedAt( entityRequestCreatedAt( entity ) );
        requestHistoryDto.setActionUser( toUserBasicInfo( entity.getActionUser() ) );
        requestHistoryDto.setRequestOwner( toUserBasicInfo( entityRequestUser( entity ) ) );
        requestHistoryDto.setId( entity.getId() );
        requestHistoryDto.setTitle( entity.getTitle() );
        requestHistoryDto.setFromStatus( entity.getFromStatus() );
        requestHistoryDto.setToStatus( entity.getToStatus() );
        requestHistoryDto.setRequestComment( entity.getRequestComment() );
        requestHistoryDto.setStaffComment( entity.getStaffComment() );
        requestHistoryDto.setComment( entity.getComment() );
        requestHistoryDto.setActionBy( entity.getActionBy() );
        requestHistoryDto.setCreatedAt( entity.getCreatedAt() );

        return requestHistoryDto;
    }

    @Override
    public RequestHistoryDto mapToDetailedHistoryDto(RequestHistoryEntity entity) {
        if ( entity == null ) {
            return null;
        }

        RequestHistoryDto requestHistoryDto = new RequestHistoryDto();

        requestHistoryDto.setId( entity.getId() );
        requestHistoryDto.setRequestId( entityRequestId( entity ) );
        requestHistoryDto.setRequestCreatedAt( entityRequestCreatedAt( entity ) );
        requestHistoryDto.setActionUser( toUserBasicInfo( entity.getActionUser() ) );
        requestHistoryDto.setRequestOwner( toUserBasicInfo( entityRequestUser( entity ) ) );
        requestHistoryDto.setTitle( entity.getTitle() );
        requestHistoryDto.setFromStatus( entity.getFromStatus() );
        requestHistoryDto.setToStatus( entity.getToStatus() );
        requestHistoryDto.setRequestComment( entity.getRequestComment() );
        requestHistoryDto.setStaffComment( entity.getStaffComment() );
        requestHistoryDto.setComment( entity.getComment() );
        requestHistoryDto.setActionBy( entity.getActionBy() );
        requestHistoryDto.setCreatedAt( entity.getCreatedAt() );

        return requestHistoryDto;
    }

    @Override
    public List<RequestResponseDto> toResponseDtoList(List<RequestEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<RequestResponseDto> list = new ArrayList<RequestResponseDto>( entities.size() );
        for ( RequestEntity requestEntity : entities ) {
            list.add( toResponseDto( requestEntity ) );
        }

        return list;
    }

    @Override
    public List<RequestHistoryDto> toHistoryDtoList(List<RequestHistoryEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<RequestHistoryDto> list = new ArrayList<RequestHistoryDto>( entities.size() );
        for ( RequestHistoryEntity requestHistoryEntity : entities ) {
            list.add( mapToBasicHistoryDto( requestHistoryEntity ) );
        }

        return list;
    }

    private DegreeEnum userClassesDegree(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }
        ClassEntity classes = userEntity.getClasses();
        if ( classes == null ) {
            return null;
        }
        DegreeEnum degree = classes.getDegree();
        if ( degree == null ) {
            return null;
        }
        return degree;
    }

    private Long entityRequestId(RequestHistoryEntity requestHistoryEntity) {
        if ( requestHistoryEntity == null ) {
            return null;
        }
        RequestEntity request = requestHistoryEntity.getRequest();
        if ( request == null ) {
            return null;
        }
        Long id = request.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private LocalDateTime entityRequestCreatedAt(RequestHistoryEntity requestHistoryEntity) {
        if ( requestHistoryEntity == null ) {
            return null;
        }
        RequestEntity request = requestHistoryEntity.getRequest();
        if ( request == null ) {
            return null;
        }
        LocalDateTime createdAt = request.getCreatedAt();
        if ( createdAt == null ) {
            return null;
        }
        return createdAt;
    }

    private UserEntity entityRequestUser(RequestHistoryEntity requestHistoryEntity) {
        if ( requestHistoryEntity == null ) {
            return null;
        }
        RequestEntity request = requestHistoryEntity.getRequest();
        if ( request == null ) {
            return null;
        }
        UserEntity user = request.getUser();
        if ( user == null ) {
            return null;
        }
        return user;
    }
}
