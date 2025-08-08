'use client'

export function salvarLocal(key: string, value: []) {
    return window.localStorage.setItem(key, JSON.stringify(value));
}

export function buscarLocal(key: string) {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : '';
}

export function removerLocal(key: string) {
    return window.localStorage.removeItem(key);
}