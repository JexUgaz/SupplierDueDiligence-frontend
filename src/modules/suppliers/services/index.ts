import { CountryService } from "./CountryService";
import { ScreeningService } from "./ScreeningService";
import { SupplierService } from "./SupplierService";

const supplierService = new SupplierService();
const countryService = new CountryService();
const screeningService = new ScreeningService();

export { supplierService, countryService, screeningService };
