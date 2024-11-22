

export interface FileDTO {
  id: number;
  fileName: string;
  file: string;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  approval: boolean;
  publicationDate: string;
  tag: string;
  files: FileDTO[];
}

export interface CreatePostPayload {
  dto: Post;
  files: string[]; // Base64 strings or file paths
}
