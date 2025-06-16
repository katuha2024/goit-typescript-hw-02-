export interface ImgData {
    id: string;
    alt_description: string;
    description: string;
    likes: number;
    slug: string;
    urls: {
      small: string;
      regular: string;
    };
    user: {
      name: string;
    };
    links: {
      download: string;
    };
  }
  