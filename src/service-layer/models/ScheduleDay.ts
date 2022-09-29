import { TimeSlot } from "./DeliverySettingsMode";

export class ScheduleDay {
    private day: String;
    private timeSlot: Array<TimeSlot>;

    
    public getDay(): String{
        return this.day;
      }
  
      public setDay(day: String): void{
        this.day = day;
      }
      
      public getTimeSlot(): Array<TimeSlot> {
          return this.timeSlot;
      }
   
      public setTimeSlot(value: Array<TimeSlot>) {
          this.timeSlot = value;
      }
}