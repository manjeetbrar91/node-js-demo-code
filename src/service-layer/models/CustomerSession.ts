import { UserSession } from './UserSession';

export class CustomerSession extends UserSession {
     private orderId: string;
     private code: string;

     public getCode(): string {
          return this.code;
     }

     public setCode(code: string): void {
          this.code = code;
     }

     public getOrderId(): string {
          return this.orderId;
     }

     public setOrderId(orderId: string): void {
          this.orderId = orderId;
     }
}

