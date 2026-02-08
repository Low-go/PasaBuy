/**
 * Represents a user provided by the server
 */

export interface User{
    id: string;
    name: string;
    phone: string;
    avatar?: string;
    location?: string;
    // possibly add a light dark preference here later,
    // sabe what was the last one the users wanted   
}