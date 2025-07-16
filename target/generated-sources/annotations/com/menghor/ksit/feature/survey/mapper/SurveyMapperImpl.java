package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.enumations.StatusSurvey;
import com.menghor.ksit.feature.survey.dto.request.SurveyResponseSubmitDto;
import com.menghor.ksit.feature.survey.dto.response.SurveyResponseDto;
import com.menghor.ksit.feature.survey.dto.update.SurveyUpdateDto;
import com.menghor.ksit.feature.survey.model.SurveyEntity;
import com.menghor.ksit.feature.survey.model.SurveyResponseEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SurveyMapperImpl implements SurveyMapper {

    @Override
    public SurveyResponseDto toResponseDto(SurveyEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SurveyResponseDto surveyResponseDto = new SurveyResponseDto();

        surveyResponseDto.setSections( mapActiveSections( entity ) );
        surveyResponseDto.setId( entity.getId() );
        surveyResponseDto.setTitle( entity.getTitle() );
        surveyResponseDto.setDescription( entity.getDescription() );
        surveyResponseDto.setStatus( entity.getStatus() );
        surveyResponseDto.setCreatedAt( entity.getCreatedAt() );

        return surveyResponseDto;
    }

    @Override
    public void updateSurveyFromDto(SurveyUpdateDto dto, SurveyEntity entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getTitle() != null ) {
            entity.setTitle( dto.getTitle() );
        }
        if ( dto.getDescription() != null ) {
            entity.setDescription( dto.getDescription() );
        }
    }

    @Override
    public SurveyResponseEntity createResponseFromDto(SurveyResponseSubmitDto dto) {
        if ( dto == null ) {
            return null;
        }

        SurveyResponseEntity surveyResponseEntity = new SurveyResponseEntity();

        surveyResponseEntity.setOverallRating( dto.getOverallRating() );
        surveyResponseEntity.setOverallComment( dto.getOverallComment() );

        surveyResponseEntity.setSubmittedAt( java.time.LocalDateTime.now() );
        surveyResponseEntity.setStatus( StatusSurvey.ACTIVE );
        surveyResponseEntity.setIsCompleted( true );

        return surveyResponseEntity;
    }
}
