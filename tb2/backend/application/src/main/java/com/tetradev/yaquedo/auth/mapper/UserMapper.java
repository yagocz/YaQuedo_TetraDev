package com.tetradev.yaquedo.auth.mapper;

import com.tetradev.yaquedo.auth.dto.UserResponse;
import com.tetradev.yaquedo.auth.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
}
