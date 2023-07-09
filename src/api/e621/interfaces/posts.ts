export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  file: PostFile;
  preview: PostPreview;
  sample: PostSample;
  score: PostScore;
  tags: PostTags;
  locked_tags: string[];
  change_seq: number;
  flags: PostFlags;
  rating: 's' | 'q' | 'e';
  fav_count: number;
  sources: string[];
  pools: number;
  relationships: PostRelationships;
  approver_id: number | null;
  uploader_id: number;
  description: string;
  comment_count: number;
  is_favorited: boolean;
  has_notes: false;
  duration: number | null;
}

export interface PostFile {
  width: number;
  height: number;
  ext: 'jpg' | 'png' | 'gif' | 'webm' | 'swf';
  size: number;
  md5: string;
  url: string;
}

export interface PostPreview {
  width: number;
  height: number;
  url: string;
}

export interface PostSample {
  has: boolean;
  height: number;
  width: number;
  url: string;
  alternates: PostSampleAlternates;
}

export interface PostSampleAlternates {
  '720p'?: PostSampleAlternate;
  '480p'?: PostSampleAlternate;
  original?: PostSampleAlternate;
}

export interface PostSampleAlternate {
  type: string;
  height: number;
  width: number;
  urls: [string | null, string | null];
}

export interface PostScore {
  up: number;
  down: number;
  total: number;
}

export interface PostTags {
  general: string[];
  species: string[];
  character: string[];
  copyright: string[];
  artist: string[];
  invalid: string[];
  lore: string[];
  meta: string[];
}

export interface PostFlags {
  pending: boolean;
  flagged: boolean;
  note_locked: boolean;
  status_locked: boolean;
  rating_locked: boolean;
  deleted: boolean;
}

export interface PostRelationships {
  parent_id: number | null;
  has_children: boolean;
  has_active_children: boolean;
  children: number[];
}

