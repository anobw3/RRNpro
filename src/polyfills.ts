/**
 * Polyfills for the application.
 * This file should be imported at the very top of the entry point.
 */

import { Buffer } from 'buffer';
import process from 'process';

if (typeof window !== 'undefined') {
  // Ensure Buffer is available globally
  if (typeof (window as any).Buffer === 'undefined') {
    (window as any).Buffer = Buffer;
  }

  // Ensure process is available globally
  if (typeof (window as any).process === 'undefined') {
    (window as any).process = process;
  }
  
  // Fix for "Cannot set property fetch of #<Window> which has only a getter"
  // This error occurs when a library tries to overwrite window.fetch but the environment
  // has it defined as a read-only getter.
  try {
    // Check if fetch is already defined and if it is a getter-only property
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch') || 
                 Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');

    if (desc && !desc.writable && !desc.set && desc.configurable !== false) {
      // If it's a getter-only and configurable, try to make it writable
      const nativeFetch = window.fetch;
      try {
        Object.defineProperty(window, 'fetch', {
          value: nativeFetch,
          writable: true,
          configurable: true,
          enumerable: true
        });
      } catch (err) {
        // Fallback: try to add a setter that just ignores the value to prevent the TypeError
        try {
          Object.defineProperty(window, 'fetch', {
            get: () => nativeFetch,
            set: (v) => { 
              console.warn('Polyfill: A library tried to overwrite window.fetch. Request ignored to prevent crash. Requested value:', v); 
            },
            configurable: true,
            enumerable: true
          });
        } catch (innerErr) {
          console.error('Polyfill: Critical failure protecting window.fetch', innerErr);
        }
      }
    } else if (desc && !desc.writable && !desc.set && desc.configurable === false) {
      // If it's not even configurable, we can't use defineProperty.
      // In this case, if a library tries `window.fetch = ...`, it will still throw.
      // This is a platform limitation.
      console.log('window.fetch is non-configurable and read-only. We will hope no library tries to overwrite it.');
    }
  } catch (e) {
    // ignore
  }

  // Also ensure 'global' is defined for libraries that expect it
  if (typeof (window as any).global === 'undefined') {
    (window as any).global = window;
  }
}

export {};
