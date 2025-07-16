package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.enumations.StatusSurvey;
import com.menghor.ksit.feature.survey.dto.response.SurveySectionResponseDto;
import com.menghor.ksit.feature.survey.dto.update.SurveySectionUpdateDto;
import com.menghor.ksit.feature.survey.model.SurveySectionEntity;
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
public class SurveySectionMapperImpl implements SurveySectionMapper {

    @Autowired
    private SurveyQuestionMapper surveyQuestionMapper;

    @Override
    public SurveySectionResponseDto toResponseDto(SurveySectionEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SurveySectionResponseDto surveySectionResponseDto = new SurveySectionResponseDto();

        surveySectionResponseDto.setQuestions( surveyQuestionMapper.toResponseDtoList( entity.getQuestions() ) );
        surveySectionResponseDto.setId( entity.getId() );
        surveySectionResponseDto.setTitle( entity.getTitle() );
        surveySectionResponseDto.setDescription( entity.getDescription() );
        surveySectionResponseDto.setDisplayOrder( entity.getDisplayOrder() );

        return surveySectionResponseDto;
    }

    @Override
    public List<SurveySectionResponseDto> toResponseDtoList(List<SurveySectionEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SurveySectionResponseDto> list = new ArrayList<SurveySectionResponseDto>( entities.size() );
        for ( SurveySectionEntity surveySectionEntity : entities ) {
            list.add( toResponseDto( surveySectionEntity ) );
        }

        return list;
    }

    @Override
    public void updateSectionFromDto(SurveySectionUpdateDto dto, SurveySectionEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getTitle() != null ) {
            entity.setTitle( dto.getTitle() );
        }
        if ( dto.getDescription() != null ) {
            entity.setDescription( dto.getDescription() );
        }
        if ( dto.getDisplayOrder() != null ) {
            entity.setDisplayOrder( dto.getDisplayOrder() );
        }
    }

    @Override
    public SurveySectionEntity createSectionFromDto(SurveySectionUpdateDto dto) {
        if ( dto == null ) {
            return null;
        }

        SurveySectionEntity surveySectionEntity = new SurveySectionEntity();

        surveySectionEntity.setTitle( dto.getTitle() );
        surveySectionEntity.setDescription( dto.getDescription() );
        surveySectionEntity.setDisplayOrder( dto.getDisplayOrder() );

        surveySectionEntity.setStatus( StatusSurvey.ACTIVE );

        return surveySectionEntity;
    }
}
