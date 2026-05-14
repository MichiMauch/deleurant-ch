// Type definitions for the Cloudinary Media Library widget.
// Loaded via <Script src="https://media-library.cloudinary.com/global/all.js">.

declare global {
  interface CloudinaryAsset {
    secure_url: string;
    public_id: string;
    resource_type?: string;
    format?: string;
    width?: number;
    height?: number;
  }

  interface MediaLibraryInstance {
    show: (options?: Record<string, unknown>) => void;
    hide?: () => void;
  }

  interface MediaLibraryOptions {
    cloud_name: string;
    api_key: string;
    username?: string;
    timestamp?: string;
    signature?: string;
    multiple?: boolean;
    max_files?: number;
    insert_caption?: string;
    remove_header?: boolean;
    default_transformations?: unknown[];
  }

  interface MediaLibraryCallbacks {
    insertHandler?: (data: { assets: CloudinaryAsset[] }) => void;
    showHandler?: () => void;
    hideHandler?: () => void;
  }

  interface Window {
    cloudinary?: {
      createMediaLibrary: (
        options: MediaLibraryOptions,
        callbacks: MediaLibraryCallbacks,
      ) => MediaLibraryInstance;
    };
  }
}

export {};
