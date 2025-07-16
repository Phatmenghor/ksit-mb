package com.menghor.ksit.feature.setting.mapper;

import com.menghor.ksit.feature.auth.models.UserEntity;
import com.menghor.ksit.feature.setting.dto.response.MenuItemDto;
import com.menghor.ksit.feature.setting.dto.response.UserMenuAccessDto;
import com.menghor.ksit.feature.setting.models.MenuItem;
import com.menghor.ksit.feature.setting.models.UserMenuAccess;
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
public class MenuMapperImpl implements MenuMapper {

    @Override
    public MenuItemDto toDto(MenuItem menuItem) {
        if ( menuItem == null ) {
            return null;
        }

        MenuItemDto.MenuItemDtoBuilder menuItemDto = MenuItemDto.builder();

        menuItemDto.key( menuItem.getMenuKey() );
        menuItemDto.name( menuItem.getMenuName() );
        menuItemDto.isParent( menuItem.isParent() );
        menuItemDto.isEnabled( menuItem.isEnabled() );
        menuItemDto.id( menuItem.getId() );
        menuItemDto.icon( menuItem.getIcon() );
        menuItemDto.route( menuItem.getRoute() );
        menuItemDto.displayOrder( menuItem.getDisplayOrder() );

        return menuItemDto.build();
    }

    @Override
    public UserMenuAccessDto toDto(UserMenuAccess userMenuAccess) {
        if ( userMenuAccess == null ) {
            return null;
        }

        UserMenuAccessDto.UserMenuAccessDtoBuilder userMenuAccessDto = UserMenuAccessDto.builder();

        userMenuAccessDto.userId( userMenuAccessUserId( userMenuAccess ) );
        userMenuAccessDto.username( userMenuAccessUserUsername( userMenuAccess ) );
        userMenuAccessDto.menuKey( userMenuAccessMenuItemMenuKey( userMenuAccess ) );
        userMenuAccessDto.hasAccess( userMenuAccess.isHasAccess() );

        return userMenuAccessDto.build();
    }

    @Override
    public List<UserMenuAccessDto> toUserMenuAccessDtoList(List<UserMenuAccess> userMenuAccesses) {
        if ( userMenuAccesses == null ) {
            return null;
        }

        List<UserMenuAccessDto> list = new ArrayList<UserMenuAccessDto>( userMenuAccesses.size() );
        for ( UserMenuAccess userMenuAccess : userMenuAccesses ) {
            list.add( toDto( userMenuAccess ) );
        }

        return list;
    }

    private Long userMenuAccessUserId(UserMenuAccess userMenuAccess) {
        if ( userMenuAccess == null ) {
            return null;
        }
        UserEntity user = userMenuAccess.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String userMenuAccessUserUsername(UserMenuAccess userMenuAccess) {
        if ( userMenuAccess == null ) {
            return null;
        }
        UserEntity user = userMenuAccess.getUser();
        if ( user == null ) {
            return null;
        }
        String username = user.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }

    private String userMenuAccessMenuItemMenuKey(UserMenuAccess userMenuAccess) {
        if ( userMenuAccess == null ) {
            return null;
        }
        MenuItem menuItem = userMenuAccess.getMenuItem();
        if ( menuItem == null ) {
            return null;
        }
        String menuKey = menuItem.getMenuKey();
        if ( menuKey == null ) {
            return null;
        }
        return menuKey;
    }
}
