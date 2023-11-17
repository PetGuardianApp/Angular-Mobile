import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, buffer } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';

registerLocaleData(localeEn);

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  black: {
    primary: '#000000',
    secondary: '#000000',
  },
  green: {
    primary: '#2D6F28',
    secondary: '#2D6F28',
  },
};


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  locale: string = "en"

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

 
  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    
  ];

  displayed_events: CalendarEvent[] = [
    
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private storageService:StorageService, private apiService:ApiService, 
    private appointmentService:AppointmentsService, private router:Router) {
      var uid = this.storageService.SessionGetStorage("uid");
      

  }

  ngOnInit() {
   

    
    // Suscríbete al Observable después de inicializar eventList
    this.appointmentService.EventList.subscribe((events) => {
      this.events = events; // Actualiza la propiedad local con la lista de eventos
      
      var today:Date = new Date();
      this.events.forEach(element => {
        if(element.start>today){
          this.displayed_events.push(element);
        }
      })
    });
  }

  
  

  

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.router.navigate(['clients/pet'], {
      queryParams: { petId:event.pet_id }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      
      
      if (day.isPast) {
        day.cssClass = 'bg-pink';
      }
    });
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          /*if (
            segment.date.getHours() >= 0 &&
            segment.date.getHours() <= 8 ||
            segment.date.getHours() >= 20 &&
            segment.date.getHours() <= 23
            
            //segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }*/
          
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          /*if (
            segment.date.getHours() >= 0 &&
            segment.date.getHours() <= 8 ||
            segment.date.getHours() >= 20 &&
            segment.date.getHours() <= 23
            
            //segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }*/
        });
      });
    });
  }


  public delete_event(event : CalendarEvent){
    this.displayed_events.splice(this.displayed_events.indexOf(event),1);
    this.events.splice(this.events.indexOf(event),1);
    this.appointmentService.deleteEvent(event);

  }



  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
