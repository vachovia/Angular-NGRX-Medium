import { ArticleInterface, BackendErrorsInterface } from "../../shared/types";

export interface UpdateArticleStateInterface{
    article: ArticleInterface | null;
    isLoading: boolean;
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null
}