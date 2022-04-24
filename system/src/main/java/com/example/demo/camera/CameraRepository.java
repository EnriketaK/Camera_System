package com.example.demo.camera;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CameraRepository
        extends MongoRepository<Camera, String> {

    void deleteCameraById(String id);

    Optional<Camera> findCameraById(String id);

}
