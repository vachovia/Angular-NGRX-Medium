import { BackendErrorsInterface } from "../../shared/types";

export interface CreateArticleStateInterface{
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null
}