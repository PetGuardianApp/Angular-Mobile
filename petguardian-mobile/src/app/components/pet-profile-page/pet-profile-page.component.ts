import { Component, ViewChild } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { StorageService } from 'src/app/services/storage.service';
import { DatePipe } from '@angular/common';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-pet-profile-page',
  templateUrl: './pet-profile-page.component.html',
  styleUrls: ['./pet-profile-page.component.css']
})
export class PetProfilePageComponent {
  @ViewChild("chart_div") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions = {
    series: [
      {
        name: "Cardiac Frequency",
        data: [90, 80, 70]
      },
      {
        name: "Steps",
        data: [180, 120, 100]
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };

  public chartOptions2: ChartOptions = {
    series: [
      {
        name: "Weight",
        data: [90, 91, 90, 93, 94, 90, 95, 98, 100, 98, 97]
      }
    ],
    chart: {
      type: "line",
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };
  public petInfo: PetModel;
  public petImage: String;
  updatePersonalPetInfoForm: FormGroup;
  updateMandatoryVaccinesForm: FormGroup;
  updatePetResumeForm: FormGroup;
  updatePetStatisticsForm: FormGroup;
  updateImageForm: FormGroup;
  isPersonalInfoFormVisible: boolean = false;
  isMandatoryVaccinesVisible: boolean = false;
  isPetResumeVisible: boolean = false;
  isPetStatisticsVisible: boolean = false;
  isUpdateImageFormVisible: boolean = false;
  currentDate: Date = new Date();
  formattedDate: any;
  base64Output: string = '';
  selectedFileName: string = '...';
  showPopup = false;

  constructor(private petService: PetService, private fb: FormBuilder, private storageService: StorageService, private datePipe: DatePipe, private router: Router) {
    const urlParams = new URLSearchParams(window.location.search);
    this.petInfo = new PetModel;
    this.showPetData(urlParams.get('petId'));
    this.petImage = new String;
    this.updatePersonalPetInfoForm = this.fb.group({
      name: [''],
      type: [''],
      breed: [''],
      weight: [''],
      birth: [''],
      height: [''],
    })
    this.updateMandatoryVaccinesForm = this.fb.group({
      vaccines: ['']
    })
    this.updatePetResumeForm = this.fb.group({
      observations: ['']
    })
    this.updatePetStatisticsForm = this.fb.group({
      cardiac_freq: [''],
      steps: ['']
    })
    this.updateImageForm = this.fb.group({
      selectedFileName: ['']
    })
    const day = this.currentDate.getDate().toString().padStart(2, '0');
    const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = this.currentDate.getFullYear().toString();
    const hours = this.currentDate.getHours().toString().padStart(2, '0');
    const minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
    this.formattedDate = `${day}/${month}/${year}_${hours}:${minutes}`;
  }

  updatePetPersonalInfo(): void {
    if (this.updatePersonalPetInfoForm.value.name != null && this.updatePersonalPetInfoForm.value.name != '') {
      this.petInfo.name = this.updatePersonalPetInfoForm.value.name
    }
    if (this.updatePersonalPetInfoForm.value.type != null && this.updatePersonalPetInfoForm.value.type != '') {
      this.petInfo.type = this.updatePersonalPetInfoForm.value.type
    }
    if (this.updatePersonalPetInfoForm.value.breed != null && this.updatePersonalPetInfoForm.value.breed != '') {
      this.petInfo.breed = this.updatePersonalPetInfoForm.value.breed
    }
    if (this.updatePersonalPetInfoForm.value.birth != null && this.updatePersonalPetInfoForm.value.birth != '') {
      this.petInfo.birth = this.updatePersonalPetInfoForm.value.birth
    }
    if (this.updatePersonalPetInfoForm.value.height != null) {
      this.petInfo.height = this.updatePersonalPetInfoForm.value.height
    }
    this.petService.updatePet(this.petInfo);
    this.closePersonalPetInfoForm();
  }

  openPersonalPetInfoForm(): void {
    this.isPersonalInfoFormVisible = true;
  }

  closePersonalPetInfoForm(): void {
    this.isPersonalInfoFormVisible = false;
  }

  updatePetResume(): void {
    var pet: any = {
      health_info: {
        observations: this.updatePetResumeForm.value.observations
      }
    };
    this.petService.updatePetHealthInfo(pet, this.petInfo.id || '');
    this.closePetResumeForm();
  }
  openPetResumeForm(): void {
    this.isPetResumeVisible = true;
  }

  closePetResumeForm(): void {
    this.isPetResumeVisible = false;

  }

  updatePetMandatoryVaccines(): void {
    var pet: any = {
      health_info: {
        vaccines: [this.updateMandatoryVaccinesForm.value.vaccines]
      }
    };
    this.petService.updatePetHealthInfo(pet, this.petInfo.id || '');
    this.closeMandatoryVaccinesForm();
  }

  openMandatoryVaccinesForm(): void {
    this.isMandatoryVaccinesVisible = true;
  }

  closeMandatoryVaccinesForm(): void {
    this.isMandatoryVaccinesVisible = false;

  }

  updatePetStatistics(): void {
    var pet: any = {
      health_info: {
        steps: {
          [this.formattedDate]: this.updatePetStatisticsForm.value.steps
        },
        cardiac_freq: {
          [this.formattedDate]: this.updatePetStatisticsForm.value.cardiac_freq
        }
      }
    };
    this.petService.updatePetHealthInfo(pet, this.petInfo.id || '')
    this.closePetStatisticsForm();
  }
  openPetStatisticsForm(): void {
    this.isPetStatisticsVisible = true;
  }

  closePetStatisticsForm(): void {
    this.isPetStatisticsVisible = false;

  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  updatePetImage(): void {
    if (this.base64Output != '') {
      this.petInfo.profile_image = this.base64Output;
      this.petService.updatePet(this.petInfo);
    }
  }

  openUpdateImageForm(): void {
    this.isUpdateImageFormVisible = true;
  }

  closeUpdateImageForm(): void {
    this.isUpdateImageFormVisible = false;

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64Output = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = '...';
    }
  }

  onDateInput(event: MatDatepickerInputEvent<Date>): void {
    this.updatePersonalPetInfoForm.value.birth = this.datePipe.transform(event.value, 'ddMMyyyy') + '_00:00';
  }

  showPetData(petId: string | null) {
    if (petId != null) {
      this.petService.getPet(petId).then((petData) => {
        this.petInfo = petData;

        // Initialize arrays for cardiac frequency and steps data
        const stepsArray: number[] = [];
        const c_freqArray: number[] = [];

        // Process steps data
        for (const value of Object.values(petData.health_info?.steps || {})) {
          const parsedValue = parseInt(value);
          if (!isNaN(parsedValue)) {
            stepsArray.push(parsedValue);
          }
        }

        // Process cardiac frequency data
        for (const value of Object.values(petData.health_info?.cardiac_freq || {})) {
          const parsedValue = parseInt(value);
          if (!isNaN(parsedValue)) {
            c_freqArray.push(parsedValue);
          }
        }

        // Update chart data
        //this.updateChartData(c_freqArray, stepsArray);

        // Set default profile image if empty
        if (this.petInfo.profile_image == '') {
          this.petInfo.profile_image = '/assets/img/logo_default.svg';
        }
      });
    }
  }

  updateChartData(cardiacFreqData: number[], stepsData: number[]): void {
    const chartInstance = this.chart;
    if (chartInstance && chartInstance.updateSeries) {
      chartInstance.updateSeries([
        { data: cardiacFreqData },
        { data: stepsData }
      ]);
    }
  }

  getLatestWeight() {
    if (this.petInfo.weight != undefined) {
      const keys = Object.keys(this.petInfo.weight);
      const latestKey = keys[keys.length - 1];
      return this.petInfo.weight[latestKey];
    }
    return null;
  }

  deletePet(pet_id: string) {
    this.petService.deletePet(pet_id);
    this.router.navigate(['home'])
  }
  opendeletePopup(){
    this.showPopup = true;
  }
  closedeletePetPopup() {
    this.showPopup = false;
  }

  getBirth(birth: string | undefined) {
    if (birth != undefined) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const parts = birth.split('_');
      const datePart = parts[0];

      const day = parseInt(datePart.substring(0, 2), 10);
      const monthIndex = parseInt(datePart.substring(2, 4), 10) - 1;
      const year = parseInt(datePart.substring(4, 8), 10);

      const formattedDate = `${day} of ${months[monthIndex]}, ${year}`;

      return formattedDate;
    }
    return null;
  }



}
