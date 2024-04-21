export interface DyImage {
  /**
   * The ID of the picture.
   */
  id: number;
  /**
   * The URL of the picture.
   */
  url: string;
  /**
   * The full-size URL of the picture.
   */
  fullSizeUrl: string;
  /**
   * The thumbnail URL of the picture.
   */
  thumbnail: string;
  /**
   * The description of the picture.
   */
  description: string;
  /**
   * The order of the picture.
   */
  pictureOrder: number;
}
