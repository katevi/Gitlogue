package com.vinnik.chat.back.perstistence;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "avatars", path = "avatar")
public interface AvatarRepository {
}
