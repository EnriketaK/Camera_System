import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Camera } from './camera';
import { CameraService } from './camera.service';
import { NgForm } from '@angular/forms';
import { Chart } from 'node_modules/chart.js'
import {registerables} from 'chart.js'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cameras!: Camera[];
  public camerasAllLength!: number;
  public page: number = 1;
  public cameraNull!: Camera;
  public editCamera!: Camera;
  public deleteCamera!: Camera;
  public isOrderedByName: boolean = true;
  public isOrderedByModel: boolean = true;
  public isOrderedByResolution: boolean = true;

  constructor(private cameraService: CameraService) {}

  ngOnInit(): void {
    this.getCameras();
  }

  public createChart(): void {
    //keep track of resolutions
    const labels : string[] = ['1MPs', '2MPs', '4MPS', '5MPS', '8MPs', '10MPs', '12MPs', '16MPs+'];
    const mpsValues : number[] = [1, 2, 4, 5, 8, 10, 12, 16];
    let cameraCounter  = [0, 0, 0, 0, 0, 0, 0, 0];
    let data: number[];
    this.cameras.forEach(function (camera) {
      let cameraMps = Math.round((camera.widthPx * camera.heightPx)/1000000);
      for (var i = 0, len = mpsValues.length; i < len; i++) {
        if (cameraMps <= mpsValues[i] ) {
          cameraCounter[i]++;
          console.log("HERE: " + camera.name + ', ' + camera.widthPx * camera.heightPx + ', ' + cameraMps +', ' + mpsValues[i] + ', ' + i + ', ' + cameraCounter);
          break;
        }else if (i === mpsValues.length - 1 && cameraMps > mpsValues[i]) {
          cameraCounter[i]++;
          console.log("THERE: "+ camera.name + ', ' + camera.widthPx * camera.heightPx + ', ' + + cameraMps +', ' + mpsValues[i] + ', ' + i + ', ' + cameraCounter);
        }
      }
    });
    //destroy old chart, create updated one
    var oldChartElement = document.getElementById("myChart")!;
    oldChartElement.remove();
    var myChartElement = document.createElement('canvas');
    myChartElement.setAttribute("id", "myChart");
    var grapharea = document.getElementById("divChart")!;
    grapharea.appendChild(myChartElement);

    console.log(myChartElement);
    Chart.register(...registerables);
    const myChart = new Chart(myChartElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Cameras',
          data: cameraCounter,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  public getCameras(): void {
    this.cameraService.getCameras().subscribe(
      (response: Camera[]) =>{
        this.cameras = response.sort((a, b) => a.widthPx - b.widthPx);
        this.camerasAllLength = this.cameras.length;
        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

  public onAddCamera(addForm: NgForm): void {
    document.getElementById('add-camera-form')!.click();
    this.cameraService.addCamera(addForm.value).subscribe(
      (response: Camera) => {
        console.log(response);
        this.getCameras();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCamera(camera: Camera): void {
    console.log(camera);
    this.cameraService.updateCamera(camera).subscribe(
      (response: Camera) => {
        console.log(response);
        this.getCameras();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCamera(cameraId: string): void {
    this.cameraService.deleteCamera(cameraId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCameras();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCameras(key: string): void {
    const results: Camera[] = [];
    for (const camera of this.cameras) {
      let cameraMPSValue: number = Math.round((camera.widthPx * camera.heightPx)/1000000);
      let keyNumber: number = Number(key);
      
      //search by name, model, resolution
      if (cameraMPSValue ===  keyNumber
      || camera.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.resolution.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || camera.widthPx === keyNumber || camera.heightPx === keyNumber) {
        console.log(cameraMPSValue ===  keyNumber);
        console.log(camera);
        results.push(camera);
      }
    }
    this.cameras = results;
    if (results.length === 0 || !key ||key === "") {
      this.getCameras();
    }
  }


  public sortName(): void {
    if(this.isOrderedByName) {
      this.cameras.sort(function compare( a, b ) {
        if (a.name < b.name){
          return -1;
        }
        if (a.name > b.name){
          return 1;
        }
        return 0;
      });
    }
    else if(!this.isOrderedByName) {
      this.cameras.sort(function compare( a, b ) {
        if (a.name > b.name){
          return -1;
        }
        if (a.name < b.name){
          return 1;
        }
        return 0;
      });
    }

    this.isOrderedByName = !this.isOrderedByName;
  }

  public sortModel(): void {
    if(this.isOrderedByModel) {
      this.cameras.sort(function compare( a, b ) {
        if (a.model < b.model){
          return -1;
        }
        if (a.model > b.model){
          return 1;
        }
        return 0;
      });
    }
    else if(!this.isOrderedByModel) {
      this.cameras.sort(function compare( a, b ) {
        if (a.model > b.model){
          return -1;
        }
        if (a.model < b.model){
          return 1;
        }
        return 0;
      });
    }

    this.isOrderedByModel = !this.isOrderedByModel;
  }

  public sortResolution(): void {
    if(this.isOrderedByResolution) {
      this.cameras = this.cameras.sort((a, b) => a.widthPx * a.heightPx - b.widthPx * b.heightPx);
    }
    else if(!this.isOrderedByResolution){
      this.cameras = this.cameras.sort((a, b) => b.widthPx * b.heightPx - a.widthPx * a.heightPx);      
    }

    this.isOrderedByResolution = !this.isOrderedByResolution;
  }

  public onOpenModal(camera: Camera, mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCameraModal');
    }
    else if (mode === 'edit') {
      this.editCamera = camera;
      button.setAttribute('data-target', '#updateCameraModal');
    }
    else if (mode === 'delete') {
      this.deleteCamera = camera;
      button.setAttribute('data-target', '#deleteCameraModal');
    }
    container.appendChild(button);
    button.click();
  }

}
