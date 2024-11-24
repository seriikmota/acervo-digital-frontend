

export interface FileDTO {
  id: number;
  fileName: string;
  image: string;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  approval: boolean;
  publicationDate: string;
  tag: string;
  images: FileDTO[];
}

export interface CreatePostPayload {
  dto: Post;
  files: string[]; // Base64 strings or file paths
}
