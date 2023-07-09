export interface User {
  wiki_page_version_count: number,  // self, other
  artist_version_count: number,  // self, other
  pool_version_count: number,  // self, other
  forum_post_count: number,  // self, other
  comment_count: number,  // self, other
  flag_count: number,  // self, other
  positive_feedback_count: number,  // self, other
  neutral_feedback_count: number,  // self, other
  negative_feedback_count: number,  // self, other
  upload_limit: number,  // self, other
  id: number,  // self, other
  created_at: string, // e.g. "2022-07-12T01:36:16.904-04:00"  // self, other
  name: string,  // self, other
  level: number,  // self, other
  base_upload_limit: number,  // self, other
  post_upload_count: number,  // self, other
  post_update_count: number,  // self, other
  note_update_count: number,  // self, other
  is_banned: boolean,  // self, other
  can_approve_posts: boolean,  // self, other
  can_upload_free: boolean,  // self, other
  level_string: string,  // self, other
  avatar_id: number | null,  // self, other
}

export interface FullUser extends User {
  show_avatars: boolean,  // self
  blacklist_avatars: boolean,  // self
  blacklist_users: boolean,  // self
  description_collapsed_initially: boolean,  // self
  hide_comments: boolean,  // self
  show_hidden_comments: boolean,  // self
  show_post_statistics: boolean,  // self
  has_mail: boolean,  // self
  receive_email_notifications: boolean,  // self
  enable_keyboard_navigation: boolean,  // self
  enable_privacy_mode: boolean,  // self
  style_usernames: boolean,  // self
  enable_auto_complete: boolean,  // self
  has_saved_searches: boolean,  // self
  disable_cropped_thumbnails: boolean,  // self
  disable_mobile_gestures: boolean,  // self
  enable_safe_mode: boolean,  // self
  disable_responsive_mode: boolean,  // self
  disable_post_tooltips: boolean,  // self
  no_flagging: boolean,  // self
  no_feedback: boolean,  // self
  disable_user_dmails: boolean,  // self
  enable_compact_uploader: boolean,  // self
  replacements_beta: boolean,  // self
  // is_bd_staff: boolean,  // ??? new update on e621?  // self(e621.net)
  updated_at: string,  // e.g. "2023-07-08T14:38:30.547-04:00"  // self
  email: string,  // self
  last_logged_in_at: string | null,  // self
  last_forum_read_at: string | null,  // self
  recent_tags: string | null,  // self
  comment_threshold: number,  // self
  default_image_size: "original" | "fit" | "fitv" | "large",  // self
  favorite_tags: string,  // self
  blacklisted_tags: string,  // self
  time_zone: string,  // e.g. "Eastern Time (US \u0026 Canada)"  // self
  per_page: number,  // self
  custom_style: string,  // self
  favorite_count: number,  // self
  api_regen_multiplier: number,  // self
  api_burst_limit: number,  // self
  remaining_api_limit: number,  // self
  statement_timeout: number,  // self
  favorite_limit: number,  // self
  tag_query_limit: number,  // self
}
