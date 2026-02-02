
export const myKey: string = import.meta.env.VITE_NOTEHUB_TOKEN;
if (!myKey) {
    console.log('VITE_NOTEHUB_TOKEN is not defined in environment variables');
  }

