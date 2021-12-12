export type SetTuple = [setName: string, setId: number];

export interface ManagedSets {
  Owned: SetTuple[];
  Maintained: SetTuple[];
}

export interface Set {
  shortname: string;
  name: string;
  post_ids: number[];
  is_public: boolean;
  post_count: number;
  id: number;
  created_at: string;
  updated_at: string;
  creator_id: number;
  description: string;
  transfer_on_delete: boolean;
}
