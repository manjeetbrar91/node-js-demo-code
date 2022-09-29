export class AuditLogMetadata {
    private browser: string;
    private device: string;
    private ip: string;
    private os: string;

    public getBrowser(): string {
        return this.browser;
    }

    public setBrowser(browser: string): void {
        this.browser = browser;
    }

    public getDevice(): string {
        return this.device;
    }

    public setDevice(device: string): void {
        this.device = device;
    }

    public getIp(): string {
        return this.ip;
    }

    public setIp(ip: string): void {
        this.ip = ip;
    }

    public getOs(): string {
        return this.os;
    }

    public setOs(os: string): void {
        this.os = os;
    }
}

export class EmployeeAuditLog {
    private metadata: AuditLogMetadata;
    private accountId: string;
    private employeeId: string;
    private eventType: string;
    private createdAt: string;

    public getMetadata(): AuditLogMetadata {
        return this.metadata;
    }

    public setMetadata(metadata: AuditLogMetadata): void {
        this.metadata = metadata;
    }

    public getAccounId(): string {
        return this.accountId;
    }

    public setAccountId(accountId: string): void {
        this.accountId = accountId;
    }

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getEventType(): string {
        return this.eventType;
    }

    public seteventtype(eventType: string): void {
        this.eventType = eventType;
    }

    public getCreatedAt(): string {
        return  this.createdAt;
    }

    public setCreatedAt(date: string) {
        this.createdAt = date;
    }
}