import { Component, ViewChild } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';
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
        data: [70, 75, 80, 74, 84, 90, 75, 70, 80, 91, 92, 93, 64, 75, 86, 77, 98, 109, 60]
      },
      {
        name: "Steps",
        data: [300, 200, 100, 290, 500, 400, 211, 314, 194, 211, 112, 323, 414, 125, 376, 517, 238, 419, 310]
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
      },
      {
        name: "Height",
        data: [100, 100, 100, 105, 105, 105, 105, 105, 110, 110, 110]
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
  isPersonalInfoFormVisible: boolean = false;
  isMandatoryVaccinesVisible: boolean = false;
  isPetResumeVisible: boolean = false;
  isPetStatisticsVisible: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder, private storageService: StorageService, private datePipe: DatePipe) {
    const urlParams = new URLSearchParams(window.location.search);
    this.showPetData(urlParams.get('petId'));
    this.petInfo = new PetModel;
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
  }

  updatePetPersonalInfo(): void {
    const urlParams = new URLSearchParams(window.location.search);

    var pet: PetModel = {
      id: urlParams.get('petId') || '',
      name: this.updatePersonalPetInfoForm.value.name,
      type: this.updatePersonalPetInfoForm.value.type,
      breed: this.updatePersonalPetInfoForm.value.breed,
      birth: this.updatePersonalPetInfoForm.value.birth,
      weight: this.updatePersonalPetInfoForm.value.weight,
      height: this.updatePersonalPetInfoForm.value.height,
    };
    this.apiService.updatePetPersonalInfo(pet);
    this.closePersonalPetInfoForm();
  }

  openPersonalPetInfoForm(): void {
    this.isPersonalInfoFormVisible = true;
  }

  closePersonalPetInfoForm(): void {
    this.isPersonalInfoFormVisible = false;

  }

  updatePetResume(): void {
    var pet: PetModel['health_info'] = {
      observations: this.updatePetResumeForm.value.observations
    };
    //this.apiService.updatePet(pet);
    this.closePetResumeForm();
  }
  openPetResumeForm(): void {
    this.isPetResumeVisible = true;
  }

  closePetResumeForm(): void {
    this.isPetResumeVisible = false;

  }

  updatePetMandatoryVaccines(): void {
    var pet: PetModel['health_info'] = {
      observations: this.updateMandatoryVaccinesForm.value.observations
    };
    //this.apiService.updatePet(pet);
    this.closePetResumeForm();
  }

  openMandatoryVaccinesForm(): void {
    this.isMandatoryVaccinesVisible = true;
  }

  closeMandatoryVaccinesForm(): void {
    this.isMandatoryVaccinesVisible = false;

  }

  updatePetStatistics(): void {
    var pet: PetModel['health_info'] = {
      steps: this.updatePetStatisticsForm.value.steps,
      cardiac_freq: this.updatePetStatisticsForm.value.cardiac_freq
    };
    //this.apiService.updatePet(pet);
    this.closePetResumeForm();
  }
  openPetStatisticsForm(): void {
    this.isPetStatisticsVisible = true;
  }

  closePetStatisticsForm(): void {
    this.isPetStatisticsVisible = false;

  }
  stopPropagation(event: Event) {
    event.stopPropagation(); // Prevent closing the popup when clicking inside the form
  }

  onDateInput(event: MatDatepickerInputEvent<Date>): void {
    // Customize the date format as per your requirement
    this.updatePersonalPetInfoForm.value.birth = this.datePipe.transform(event.value, 'ddMMyyyy') + '_00:00';
  }

  showPetData(petId: string | null) {
    if (petId != null) {
      this.apiService.getPet(petId).then((petData) => {
        this.petInfo = petData;
        if (petData.name == "Toby") {
          petData.profile_image = "/assets/img/dogImage1.jpg";
        } else if (petData.name == "Dobby") {
          petData.profile_image = "/assets/img/dogImage2.jpg";
        } else if (petData.name == "Darwin") {
          petData.profile_image = "/assets/img/catImage.avif";
        } else {
          petData.profile_image = '/assets/img/logo_default.svg';
        }
      });
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

  getBirth(birth: string | undefined) {
    // Return birth in format 1 of July, 2023
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
