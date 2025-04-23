import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export type UploadedFile = {
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  url: string;
};

export type SaveFileOptions = {
  directory?: string;
  filename?: string;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
  createDirectory?: boolean;
};

const defaultOptions: SaveFileOptions = {
  directory: 'public/uploads',
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  maxSize: 5 * 1024 * 1024, // 5MB
  createDirectory: true,
};

/**
 * Saves a file to the local file system
 * @param file The file to save
 * @param options Options for saving the file
 * @returns Promise with the saved file information
 */
export async function saveFileToLocal(
  file: File | Blob,
  options: SaveFileOptions = {}
): Promise<UploadedFile> {
  // Merge default options with provided options
  const config = { ...defaultOptions, ...options };
  
  // Ensure file is valid
  if (!file) {
    throw new Error('No file provided');
  }
  
  // Get file buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Check file size
  if (config.maxSize && buffer.length > config.maxSize) {
    throw new Error(`File size exceeds the maximum allowed size of ${config.maxSize / (1024 * 1024)}MB`);
  }
  
  // Check file type
  const mimetype = file.type;
  if (
    config.allowedTypes && 
    config.allowedTypes.length > 0 && 
    !config.allowedTypes.includes(mimetype)
  ) {
    throw new Error(`File type ${mimetype} is not allowed. Allowed types: ${config.allowedTypes.join(', ')}`);
  }
  
  // Generate a unique filename if not provided
  const originalFilename = 'name' in file ? file.name : 'blob';
  const fileExtension = originalFilename.includes('.') 
    ? originalFilename.split('.').pop() 
    : mimetype.split('/').pop();
    
  const filename = config.filename || `${randomUUID()}.${fileExtension}`;
  
  // Ensure directory exists
  const uploadDir = path.resolve(process.cwd(), config.directory || 'public/uploads');
  
  if (config.createDirectory) {
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw new Error(`Failed to create upload directory: ${uploadDir}`);
    }
  }
  
  // Save the file
  const filePath = path.join(uploadDir, filename);
  
  try {
    await writeFile(filePath, buffer);
  } catch (error) {
    console.error('Error writing file:', error);
    throw new Error('Failed to save file to disk');
  }
  
  // Create URL path by removing 'public' from the path and normalizing separators
  const urlPath = filePath
    .replace(path.join(process.cwd(), 'public'), '')
    .split(path.sep)
    .join('/');
  
  return {
    filename,
    path: filePath,
    size: buffer.length,
    mimetype,
    url: urlPath // Returns a clean path like /uploads/filename.ext
  };
}