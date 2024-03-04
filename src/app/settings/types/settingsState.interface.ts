import { BackendErrorsInterface } from "./../../shared/types";

export interface SettingsStateInterface{
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null;

}