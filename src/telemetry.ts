import { TelemetryService } from './service-layer/implementations/TelemetryService';

// since telemetry can be used in web/service/layer then it is not wise to define in service layer.
// Ideally web layer should talk to service layer (business layer)
// service layer should talk to db layer
// since telemetry is required on each and every layer then defining at global level
export const telemetry = new TelemetryService();