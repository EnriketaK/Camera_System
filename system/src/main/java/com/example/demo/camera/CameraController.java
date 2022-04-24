package com.example.demo.camera;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camera")
@AllArgsConstructor
public class CameraController {
    private final CameraService cameraService;

    @GetMapping("/all")
    public ResponseEntity<List<Camera>> getAllCameras () {
        List<Camera> cameras = cameraService.findAllCameras();
        return new ResponseEntity<>(cameras, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Camera> getCameraById (@PathVariable("id") String id) {
        Camera camera = cameraService.findCameraById(id);
        return new ResponseEntity<>(camera, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Camera> addCamera(@RequestBody Camera camera) {
        Camera newCamera = cameraService.addCamera(camera);
        System.out.println(newCamera);
        return new ResponseEntity<>(newCamera, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Camera> updateCamera(@RequestBody Camera camera) {
        Camera updateCamera = cameraService.updateCamera(camera);
        return new ResponseEntity<>(updateCamera, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCamera(@PathVariable("id") String id) {
        cameraService.deleteCamera(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
