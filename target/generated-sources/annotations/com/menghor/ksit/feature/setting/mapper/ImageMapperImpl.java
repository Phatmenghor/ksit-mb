package com.menghor.ksit.feature.setting.mapper;

import com.menghor.ksit.feature.setting.dto.request.ImageUploadRequest;
import com.menghor.ksit.feature.setting.models.ImageEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-10T13:53:42+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class ImageMapperImpl implements ImageMapper {

    @Override
    public ImageEntity toEntity(ImageUploadRequest request) {
        if ( request == null ) {
            return null;
        }

        ImageEntity imageEntity = new ImageEntity();

        imageEntity.setData( request.getBase64() );
        imageEntity.setType( request.getType() );

        return imageEntity;
    }
}
