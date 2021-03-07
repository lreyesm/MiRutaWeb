export interface Answer{
    success: boolean;
    url?: string,
    query?: string; 
    count?: Number;
    page?: Number;               
    data?: any;
    error?: any;
    message?: string;
}