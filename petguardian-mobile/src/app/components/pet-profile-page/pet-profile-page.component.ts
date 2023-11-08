import { Component, ViewChild } from '@angular/core';
import { PetModel } from 'src/app/models/pet.model';
import { ApiService } from 'src/app/services/api.service';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

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
  constructor(private apiService: ApiService) {
    const urlParams = new URLSearchParams(window.location.search);
    this.showPetData(urlParams.get('petId'));
    this.petInfo = new PetModel;
    this.petImage = new String;
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
