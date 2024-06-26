import {CompressedUrl} from "./compressed-url";

export interface UploadImageResponse {
  compressedUrls: CompressedUrl[];
  thumbnailUrl: string;
  originalUrl: string;
}
