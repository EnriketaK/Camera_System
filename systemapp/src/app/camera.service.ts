import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Camera } from "./camera";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class CameraService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCameras(): Observable<Camera[]> {
        return this.http.get<Camera[]>(`${this.apiServerUrl}/camera/all`)
    }

    public addCamera(camera: Camera): Observable<Camera> {
        return this.http.post<Camera>(`${this.apiServerUrl}/camera/add`, camera)
    }

    public updateCamera(camera: Camera): Observable<Camera> {
        return this.http.put<Camera>(`${this.apiServerUrl}/camera/update`, camera)
    }

    public deleteCamera(cameraId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/camera/delete/${cameraId}`)
    }
}