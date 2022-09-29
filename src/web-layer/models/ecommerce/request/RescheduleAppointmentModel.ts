import { AppointmentStatusEnum } from "../../../../service-layer/models/ecommerce/AppointmentStatusEnum";

export interface RescheduleAppointmentModel {
    employeeId: string;
    employeeName: string;
    orderId: string;
    apptDate: string;
    apptTime: string;
    apptRemarksByUser: string;
    apptRemarksByBusiness: string;
    apptSuggestedDate: string;
    apptSuggestedTime: string;
    apptStatus: AppointmentStatusEnum;
}
