package com.example.demo.camera;

import com.example.demo.exception.CameraNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CameraService {
    private final CameraRepository cameraRepository;
    public List<Camera> findAllCameras() {
        return cameraRepository.findAll();
    }
    public Camera addCamera(Camera camera) {
        return cameraRepository.save(camera);
    }

    public Camera updateCamera(Camera camera) {
        return cameraRepository.save(camera);
    }

    public Camera findCameraById(String id) {
        return cameraRepository.findCameraById(id)
                .orElseThrow(() -> new CameraNotFoundException("Camera by id " + id + " was not found"));
    }

    public void deleteCamera(String id){
        cameraRepository.deleteCameraById(id);
    }


}
