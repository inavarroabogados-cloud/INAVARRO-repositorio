/** Next handles Link routing; public files and external sharing need the mount prefix explicitly. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const publicPath = (path: string) => basePath + path;
