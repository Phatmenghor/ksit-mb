package com.menghor.ksit.feature.survey.mapper;

import com.menghor.ksit.feature.survey.dto.request.SurveyAnswerSubmitDto;
import com.menghor.ksit.feature.survey.model.SurveyAnswerEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class SurveyAnswerMapperImpl implements SurveyAnswerMapper {

    @Override
    public SurveyAnswerEntity createAnswerFromDto(SurveyAnswerSubmitDto dto) {
        if ( dto == null ) {
            return null;
        }

        SurveyAnswerEntity surveyAnswerEntity = new SurveyAnswerEntity();

        surveyAnswerEntity.setTextAnswer( dto.getTextAnswer() );
        surveyAnswerEntity.setRatingAnswer( dto.getRatingAnswer() );

        return surveyAnswerEntity;
    }
}
