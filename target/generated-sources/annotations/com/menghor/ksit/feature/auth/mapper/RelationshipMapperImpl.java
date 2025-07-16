package com.menghor.ksit.feature.auth.mapper;

import com.menghor.ksit.feature.auth.dto.relationship.StudentParentDto;
import com.menghor.ksit.feature.auth.dto.relationship.StudentSiblingDto;
import com.menghor.ksit.feature.auth.dto.relationship.StudentStudiesHistoryDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherEducationDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherExperienceDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherFamilyDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherLanguageDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherPraiseOrCriticismDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherShortCourseDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeacherVocationalDto;
import com.menghor.ksit.feature.auth.dto.relationship.TeachersProfessionalRankDto;
import com.menghor.ksit.feature.auth.models.StudentParentEntity;
import com.menghor.ksit.feature.auth.models.StudentSiblingEntity;
import com.menghor.ksit.feature.auth.models.StudentStudiesHistoryEntity;
import com.menghor.ksit.feature.auth.models.TeacherEducationEntity;
import com.menghor.ksit.feature.auth.models.TeacherExperienceEntity;
import com.menghor.ksit.feature.auth.models.TeacherFamilyEntity;
import com.menghor.ksit.feature.auth.models.TeacherLanguageEntity;
import com.menghor.ksit.feature.auth.models.TeacherPraiseOrCriticismEntity;
import com.menghor.ksit.feature.auth.models.TeacherShortCourseEntity;
import com.menghor.ksit.feature.auth.models.TeacherVocationalEntity;
import com.menghor.ksit.feature.auth.models.TeachersProfessionalRankEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class RelationshipMapperImpl implements RelationshipMapper {

    @Override
    public TeachersProfessionalRankDto toTeacherRankDto(TeachersProfessionalRankEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeachersProfessionalRankDto.TeachersProfessionalRankDtoBuilder teachersProfessionalRankDto = TeachersProfessionalRankDto.builder();

        teachersProfessionalRankDto.id( entity.getId() );
        teachersProfessionalRankDto.typeOfProfessionalRank( entity.getTypeOfProfessionalRank() );
        teachersProfessionalRankDto.description( entity.getDescription() );
        teachersProfessionalRankDto.announcementNumber( entity.getAnnouncementNumber() );
        teachersProfessionalRankDto.dateAccepted( entity.getDateAccepted() );

        return teachersProfessionalRankDto.build();
    }

    @Override
    public TeacherExperienceDto toTeacherExperienceDto(TeacherExperienceEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherExperienceDto.TeacherExperienceDtoBuilder teacherExperienceDto = TeacherExperienceDto.builder();

        teacherExperienceDto.id( entity.getId() );
        teacherExperienceDto.continuousEmployment( entity.getContinuousEmployment() );
        teacherExperienceDto.workPlace( entity.getWorkPlace() );
        teacherExperienceDto.startDate( entity.getStartDate() );
        teacherExperienceDto.endDate( entity.getEndDate() );

        return teacherExperienceDto.build();
    }

    @Override
    public TeacherPraiseOrCriticismDto toTeacherPraiseDto(TeacherPraiseOrCriticismEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherPraiseOrCriticismDto.TeacherPraiseOrCriticismDtoBuilder teacherPraiseOrCriticismDto = TeacherPraiseOrCriticismDto.builder();

        teacherPraiseOrCriticismDto.id( entity.getId() );
        teacherPraiseOrCriticismDto.typePraiseOrCriticism( entity.getTypePraiseOrCriticism() );
        teacherPraiseOrCriticismDto.giveBy( entity.getGiveBy() );
        teacherPraiseOrCriticismDto.dateAccepted( entity.getDateAccepted() );

        return teacherPraiseOrCriticismDto.build();
    }

    @Override
    public TeacherEducationDto toTeacherEducationDto(TeacherEducationEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherEducationDto.TeacherEducationDtoBuilder teacherEducationDto = TeacherEducationDto.builder();

        teacherEducationDto.id( entity.getId() );
        teacherEducationDto.culturalLevel( entity.getCulturalLevel() );
        teacherEducationDto.skillName( entity.getSkillName() );
        teacherEducationDto.dateAccepted( entity.getDateAccepted() );
        teacherEducationDto.country( entity.getCountry() );

        return teacherEducationDto.build();
    }

    @Override
    public TeacherVocationalDto toTeacherVocationalDto(TeacherVocationalEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherVocationalDto.TeacherVocationalDtoBuilder teacherVocationalDto = TeacherVocationalDto.builder();

        teacherVocationalDto.id( entity.getId() );
        teacherVocationalDto.culturalLevel( entity.getCulturalLevel() );
        teacherVocationalDto.skillOne( entity.getSkillOne() );
        teacherVocationalDto.skillTwo( entity.getSkillTwo() );
        teacherVocationalDto.trainingSystem( entity.getTrainingSystem() );
        teacherVocationalDto.dateAccepted( entity.getDateAccepted() );

        return teacherVocationalDto.build();
    }

    @Override
    public TeacherShortCourseDto toTeacherShortCourseDto(TeacherShortCourseEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherShortCourseDto.TeacherShortCourseDtoBuilder teacherShortCourseDto = TeacherShortCourseDto.builder();

        teacherShortCourseDto.id( entity.getId() );
        teacherShortCourseDto.skill( entity.getSkill() );
        teacherShortCourseDto.skillName( entity.getSkillName() );
        teacherShortCourseDto.startDate( entity.getStartDate() );
        teacherShortCourseDto.endDate( entity.getEndDate() );
        teacherShortCourseDto.duration( entity.getDuration() );
        teacherShortCourseDto.preparedBy( entity.getPreparedBy() );
        teacherShortCourseDto.supportBy( entity.getSupportBy() );

        return teacherShortCourseDto.build();
    }

    @Override
    public TeacherLanguageDto toTeacherLanguageDto(TeacherLanguageEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherLanguageDto.TeacherLanguageDtoBuilder teacherLanguageDto = TeacherLanguageDto.builder();

        teacherLanguageDto.id( entity.getId() );
        teacherLanguageDto.language( entity.getLanguage() );
        teacherLanguageDto.reading( entity.getReading() );
        teacherLanguageDto.writing( entity.getWriting() );
        teacherLanguageDto.speaking( entity.getSpeaking() );

        return teacherLanguageDto.build();
    }

    @Override
    public TeacherFamilyDto toTeacherFamilyDto(TeacherFamilyEntity entity) {
        if ( entity == null ) {
            return null;
        }

        TeacherFamilyDto.TeacherFamilyDtoBuilder teacherFamilyDto = TeacherFamilyDto.builder();

        teacherFamilyDto.id( entity.getId() );
        teacherFamilyDto.nameChild( entity.getNameChild() );
        teacherFamilyDto.gender( entity.getGender() );
        teacherFamilyDto.dateOfBirth( entity.getDateOfBirth() );
        teacherFamilyDto.working( entity.getWorking() );

        return teacherFamilyDto.build();
    }

    @Override
    public StudentStudiesHistoryDto toStudentStudiesHistoryDto(StudentStudiesHistoryEntity entity) {
        if ( entity == null ) {
            return null;
        }

        StudentStudiesHistoryDto.StudentStudiesHistoryDtoBuilder studentStudiesHistoryDto = StudentStudiesHistoryDto.builder();

        studentStudiesHistoryDto.id( entity.getId() );
        studentStudiesHistoryDto.typeStudies( entity.getTypeStudies() );
        studentStudiesHistoryDto.schoolName( entity.getSchoolName() );
        studentStudiesHistoryDto.location( entity.getLocation() );
        studentStudiesHistoryDto.fromYear( entity.getFromYear() );
        studentStudiesHistoryDto.endYear( entity.getEndYear() );
        studentStudiesHistoryDto.obtainedCertificate( entity.getObtainedCertificate() );
        studentStudiesHistoryDto.overallGrade( entity.getOverallGrade() );

        return studentStudiesHistoryDto.build();
    }

    @Override
    public StudentParentDto toStudentParentDto(StudentParentEntity entity) {
        if ( entity == null ) {
            return null;
        }

        StudentParentDto.StudentParentDtoBuilder studentParentDto = StudentParentDto.builder();

        studentParentDto.id( entity.getId() );
        studentParentDto.name( entity.getName() );
        studentParentDto.phone( entity.getPhone() );
        studentParentDto.job( entity.getJob() );
        studentParentDto.address( entity.getAddress() );
        studentParentDto.age( entity.getAge() );
        studentParentDto.parentType( entity.getParentType() );

        return studentParentDto.build();
    }

    @Override
    public StudentSiblingDto toStudentSiblingDto(StudentSiblingEntity entity) {
        if ( entity == null ) {
            return null;
        }

        StudentSiblingDto.StudentSiblingDtoBuilder studentSiblingDto = StudentSiblingDto.builder();

        studentSiblingDto.id( entity.getId() );
        studentSiblingDto.name( entity.getName() );
        studentSiblingDto.gender( entity.getGender() );
        studentSiblingDto.dateOfBirth( entity.getDateOfBirth() );
        studentSiblingDto.occupation( entity.getOccupation() );
        studentSiblingDto.phoneNumber( entity.getPhoneNumber() );
        studentSiblingDto.address( entity.getAddress() );

        return studentSiblingDto.build();
    }
}
