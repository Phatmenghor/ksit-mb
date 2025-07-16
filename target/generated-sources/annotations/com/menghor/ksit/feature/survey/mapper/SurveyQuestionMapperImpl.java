package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.enumations.StatusSurvey;
import com.menghor.ksit.feature.survey.dto.response.SurveyQuestionResponseDto;
import com.menghor.ksit.feature.survey.dto.update.SurveyQuestionUpdateDto;
import com.menghor.ksit.feature.survey.model.SurveyQuestionEntity;
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
public class SurveyQuestionMapperImpl implements SurveyQuestionMapper {

    @Override
    public SurveyQuestionResponseDto toResponseDto(SurveyQuestionEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SurveyQuestionResponseDto surveyQuestionResponseDto = new SurveyQuestionResponseDto();

        surveyQuestionResponseDto.setRatingOptions( generateRatingOptions( entity ) );
        surveyQuestionResponseDto.setId( entity.getId() );
        surveyQuestionResponseDto.setQuestionText( entity.getQuestionText() );
        surveyQuestionResponseDto.setQuestionType( entity.getQuestionType() );
        surveyQuestionResponseDto.setRequired( entity.getRequired() );
        surveyQuestionResponseDto.setDisplayOrder( entity.getDisplayOrder() );
        surveyQuestionResponseDto.setMinRating( entity.getMinRating() );
        surveyQuestionResponseDto.setMaxRating( entity.getMaxRating() );
        surveyQuestionResponseDto.setLeftLabel( entity.getLeftLabel() );
        surveyQuestionResponseDto.setRightLabel( entity.getRightLabel() );

        return surveyQuestionResponseDto;
    }

    @Override
    public List<SurveyQuestionResponseDto> toResponseDtoList(List<SurveyQuestionEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SurveyQuestionResponseDto> list = new ArrayList<SurveyQuestionResponseDto>( entities.size() );
        for ( SurveyQuestionEntity surveyQuestionEntity : entities ) {
            list.add( toResponseDto( surveyQuestionEntity ) );
        }

        return list;
    }

    @Override
    public void updateQuestionFromDto(SurveyQuestionUpdateDto dto, SurveyQuestionEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getQuestionText() != null ) {
            entity.setQuestionText( dto.getQuestionText() );
        }
        if ( dto.getQuestionType() != null ) {
            entity.setQuestionType( dto.getQuestionType() );
        }
        if ( dto.getRequired() != null ) {
            entity.setRequired( dto.getRequired() );
        }
        if ( dto.getDisplayOrder() != null ) {
            entity.setDisplayOrder( dto.getDisplayOrder() );
        }
        if ( dto.getMinRating() != null ) {
            entity.setMinRating( dto.getMinRating() );
        }
        if ( dto.getMaxRating() != null ) {
            entity.setMaxRating( dto.getMaxRating() );
        }
        if ( dto.getLeftLabel() != null ) {
            entity.setLeftLabel( dto.getLeftLabel() );
        }
        if ( dto.getRightLabel() != null ) {
            entity.setRightLabel( dto.getRightLabel() );
        }
    }

    @Override
    public SurveyQuestionEntity createQuestionFromDto(SurveyQuestionUpdateDto dto) {
        if ( dto == null ) {
            return null;
        }

        SurveyQuestionEntity surveyQuestionEntity = new SurveyQuestionEntity();

        surveyQuestionEntity.setQuestionText( dto.getQuestionText() );
        surveyQuestionEntity.setQuestionType( dto.getQuestionType() );
        surveyQuestionEntity.setDisplayOrder( dto.getDisplayOrder() );
        surveyQuestionEntity.setLeftLabel( dto.getLeftLabel() );
        surveyQuestionEntity.setRightLabel( dto.getRightLabel() );

        surveyQuestionEntity.setStatus( StatusSurvey.ACTIVE );
        surveyQuestionEntity.setRequired( dto.getRequired() != null ? dto.getRequired() : false );
        surveyQuestionEntity.setMinRating( dto.getMinRating() != null ? dto.getMinRating() : 1 );
        surveyQuestionEntity.setMaxRating( dto.getMaxRating() != null ? dto.getMaxRating() : 5 );

        return surveyQuestionEntity;
    }
}
