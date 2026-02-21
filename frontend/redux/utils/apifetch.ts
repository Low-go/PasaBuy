import { store } from "../store";
import { useEffect } from "react";


// things I will need, getCookie (grabs csrf from browserr0)
// apifetch
// the url for now but change that to a .env later


/**
 * Helper function to return a cookies value given a name
 * @param name 
 * @returns a string containing the current cookie of said name
 */
export const getCookie = (name: string): string | undefined => {
    const value = `;${document.cookie}`;
    const parts = value.split(`;${name}=`);
    if (parts.length == 2){
        return parts.pop()?.split(";").shift();
    }
}


/**
 * An api wrapper that centralizes API calls
 * and authenticates them with the csrf token needed for authed requests
 * 
 * use like a normal fetch() function
 * @param url
 * @param options
 * @returns {Promis<Response>}
 */
export async function apiFetch(
    url: string,
    options: RequestInit = {},
): Promise<Response>{
    const headers = {
        // the ... means spread or copy. So copy option headers into this object, then add csrf token
        ...options.headers,
        "X-CSRFToken": getCookie("csrftoken") || "",
    };

    // TODO Switch this to a vite call to a backend url call, store in .env
    const response = await fetch(
        "http://localhost:8000" + "/api" + url,
        { ...options, headers, credentials: "include"}
    );

    return response;
}
