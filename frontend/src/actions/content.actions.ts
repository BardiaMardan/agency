'use server'

import { unstable_cache } from 'next/cache'

const API_URL = process.env.API_URL

export const getFAQ = unstable_cache(
    async () => {
        const response = await fetch(`${process.env.API_URL}site/FAQ`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    },
    ['FAQ'],
    { revalidate: 3600, tags: ['FAQ'] }
)

export const getSettings = unstable_cache(
    async () => {
        const response = await fetch(`${process.env.API_URL}site/settings/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    },
    ['settings'],
    { revalidate: 3600, tags: ['settings'] }
)

export const ContactUs = async (fullName: string, email: string, title: string, message: string) => {
    const response = await fetch(`${process.env.API_URL}site/contact-us/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(
            {
                full_name: fullName,
                email,
                title,
                message
            }
        )
    })
    console.log(response);

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}