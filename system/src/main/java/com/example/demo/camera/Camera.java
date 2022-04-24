package com.example.demo.camera;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.UUID;

@Data
@Document
public class Camera implements Serializable {
    @Id
    private String id;
    private String name;
    private String model;
    private String ip;
    private String resolution;
    private Integer widthPx;
    private Integer heightPx;
//    private Model model;

    public Camera() {
    }

    public Camera(String name, String model, String ip, String resolution, Integer widthPx, Integer heightPx) {
        this.name = name;
        this.model = model;
        this.ip = ip;
        this.resolution = resolution;
        this.widthPx = widthPx;
        this.heightPx = heightPx;
    }


    public Camera(String id, String name, String model, String ip, String resolution, Integer widthPx, Integer heightPx) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.ip = ip;
        this.resolution = resolution;
        this.widthPx = widthPx;
        this.heightPx = heightPx;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public Integer getWidthPx() {
        return widthPx;
    }

    public void setWidthPx(Integer widthPx) {
        this.widthPx = widthPx;
    }

    public Integer getHeightPx() {
        return heightPx;
    }

    public void setHeightPx(Integer heightPx) {
        this.heightPx = heightPx;
    }

    @Override
    public String toString() {
        return "Camera{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", model='" + model + '\'' +
                ", ip='" + ip + '\'' +
                ", resolution='" + resolution + '\'' +
                ", widthPx=" + widthPx +
                ", heightPx=" + heightPx +
                '}';
    }
}
