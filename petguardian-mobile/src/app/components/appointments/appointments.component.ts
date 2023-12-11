import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject,
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
import { DatePipe, registerLocaleData } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PetModel } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  apponintForm: FormGroup;

  pets:PetModel[] = []

  eventToEdit:CalendarEvent | undefined;

  constructor(private modal: NgbModal,private storageService:StorageService, private apiService:ApiService, 
    private appointmentService:AppointmentsService, private router:Router, private fb:FormBuilder,private datePipe: DatePipe,
    private petService:PetService,public dialog: MatDialog) {
      var uid = this.storageService.SessionGetStorage("uid");

      this.pets = this.storageService.SessionGetStorage("pets");
      
      
      this.apponintForm = this.fb.group({
        pet: ['',[Validators.required]],
        start_date: ['',Validators.required],
        end_date: ['',[Validators.required]],
        matter: ['',Validators.required],
      })

  }

  public selectedValue:string =""

  handleSelectChange(event: any): void {
    this.selectedValue = event.value; // Actualiza selectedValue con el valor seleccionado
  }

  public createFlag:boolean = false;
  public editFlag:boolean = false;

  public add_appoint(){

    
    if(this.editFlag){
      //patch
      this.events.find(result =>{
        this.petService.findPet(this.apponintForm.get('pet')!.value).then(pet => this.eventToEdit!.title = pet?.name!)
        this.eventToEdit!.start = this.apponintForm.get('start_date')!.value
        this.eventToEdit!.end = this.apponintForm.get('end_date')!.value
        this.eventToEdit!.pet_id = this.apponintForm.get('pet')!.value
        this.eventToEdit!.matter = this.apponintForm.get('matter')!.value
        result = this.eventToEdit!;
      },this.eventToEdit)
      this.displayed_events.find(result =>{
        this.petService.findPet(this.apponintForm.get('pet')!.value).then(pet => this.eventToEdit!.title = pet?.name!)
        this.eventToEdit!.start = this.apponintForm.get('start_date')!.value
        this.eventToEdit!.end = this.apponintForm.get('end_date')!.value
        this.eventToEdit!.pet_id = this.apponintForm.get('pet')!.value
        this.eventToEdit!.matter = this.apponintForm.get('matter')!.value
        result = this.eventToEdit!;
      },this.eventToEdit)
      
      this.triggerEditFlag()
    }else{
      //create
      var newEvent: CalendarEvent = {
        title:"",
        start: this.apponintForm.get('start_date')!.value,
        end: this.apponintForm.get('end_date')!.value,
        pet_id:this.apponintForm.get('pet')!.value,
        matter:this.apponintForm.get('matter')!.value
       
      };

      this.petService.findPet(this.apponintForm.get('pet')!.value).then(pet => {
        newEvent!.title = pet?.name!
        this.events.push(newEvent);
        this.displayed_events.push(newEvent);
        this.refresh.next()
      })

     
    }
    this.triggerCreateFlag()
  }


  

  triggerEditFlag(){
    if(this.editFlag){
      this.editFlag = false
    }else{
      this.editFlag = true
    }
  }

  public triggerCreateFlag(){
    if(this.createFlag){
      this.createFlag = false
      this.apponintForm.controls['pet'].setValue('');
      this.apponintForm.controls['start_date'].setValue('');
      this.apponintForm.controls['end_date'].setValue('');
      this.apponintForm.controls['matter'].setValue('');
      
    }else{
      this.createFlag = true;
    }

  }


  public edit_appoint(appoint:CalendarEvent){
    this.triggerCreateFlag()
    this.triggerEditFlag()
    this.apponintForm.controls['pet'].setValue(appoint.pet_id);
    this.apponintForm.controls['start_date'].setValue(appoint.start);
    this.apponintForm.controls['end_date'].setValue(appoint.end);
    this.apponintForm.controls['matter'].setValue(appoint.matter);
    this.eventToEdit = appoint;
  
  }

  onDateInputStart(event: MatDatepickerInputEvent<Date>): void {
    // Customize the date format as per your requirement
    this.apponintForm.value.start_date = event.value;
  }

  onDateInputEnd(event: MatDatepickerInputEvent<Date>): void {
    // Customize the date format as per your requirement
    this.apponintForm.value.end_date = event.value;
  }


  ngOnInit() {
    this.appointmentService.EventList.subscribe((events) => {
      this.events = events;
      
      var today: Date = new Date();
      this.events.forEach(element => {
        if (element.start > today && !this.displayed_events.some(displayedEvent => displayedEvent.id === element.id)) {
          this.pets.find(pet => {
            if (pet.id === element.pet_id) {
              element.title = pet.name!;
              element.vet = "Ramon"
            }
          });
          this.displayed_events.push(element);
        }
      });
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


